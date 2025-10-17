import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

// =====================================================
// AUTHENTICATION FUNCTIONS
// =====================================================

/**
 * Create a new user account with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {Object} additionalData - Additional user data
 * @returns {Promise} - Firebase user object
 */
export const createUserAccount = async (
  email,
  password,
  firstName,
  lastName,
  additionalData = {}
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    // Save additional user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...additionalData,
    });

    return user;
  } catch (error) {
    console.error('Error creating user account:', error);
    throw error;
  }
};

/**
 * Sign in user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Firebase user object
 */
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};

/**
 * Sign in user with Google
 * @returns {Promise} - Firebase user object
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user document exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      const [firstName, ...lastNameParts] = user.displayName
        ? user.displayName.split(' ')
        : ['', ''];
      const lastName = lastNameParts.join(' ');

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: firstName || '',
        lastName: lastName || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        provider: 'google',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign out current user
 * @returns {Promise}
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out user:', error);
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - User's email
 * @returns {Promise}
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise}
 */
export const updateUserProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    // Update Firebase Auth profile
    if (profileData.displayName || profileData.photoURL) {
      await updateProfile(user, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });
    }

    // Update Firestore user document
    await updateDoc(doc(db, 'users', user.uid), {
      ...profileData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Update user email
 * @param {string} newEmail - New email address
 * @returns {Promise}
 */
export const updateUserEmail = async (newEmail) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    await updateEmail(user, newEmail);

    // Update Firestore user document
    await updateDoc(doc(db, 'users', user.uid), {
      email: newEmail,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
};

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise}
 */
export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    await updatePassword(user, newPassword);
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error;
  }
};

/**
 * Reauthenticate user with password
 * @param {string} password - Current password
 * @returns {Promise}
 */
export const reauthenticateUser = async (password) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    console.error('Error reauthenticating user:', error);
    throw error;
  }
};

/**
 * Delete user account
 * @returns {Promise}
 */
export const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    // Delete user document from Firestore
    await deleteDoc(doc(db, 'users', user.uid));

    // Delete user from Firebase Auth
    await deleteUser(user);
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

// =====================================================
// FIRESTORE FUNCTIONS
// =====================================================

/**
 * Get current user data from Firestore
 * @returns {Promise} - User data object
 */
export const getCurrentUserData = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error getting current user data:', error);
    throw error;
  }
};

/**
 * Get user data by ID
 * @param {string} userId - User ID
 * @returns {Promise} - User data object
 */
export const getUserById = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

/**
 * Create a new document in a collection
 * @param {string} collectionName - Collection name
 * @param {Object} data - Document data
 * @returns {Promise} - Document reference
 */
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

/**
 * Update a document
 * @param {string} collectionName - Collection name
 * @param {string} docId - Document ID
 * @param {Object} data - Data to update
 * @returns {Promise}
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

/**
 * Delete a document
 * @param {string} collectionName - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise}
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Get a document by ID
 * @param {string} collectionName - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise} - Document data
 */
export const getDocumentById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Error getting document by ID:', error);
    throw error;
  }
};

/**
 * Get documents from a collection with optional filtering and ordering
 * @param {string} collectionName - Collection name
 * @param {Object} options - Query options
 * @param {Array} options.where - Where clauses [field, operator, value]
 * @param {Array} options.orderBy - Order by clauses [field, direction]
 * @param {number} options.limit - Limit number of results
 * @returns {Promise} - Array of documents
 */
export const getDocuments = async (collectionName, options = {}) => {
  try {
    let q = collection(db, collectionName);

    // Apply where clauses
    if (options.where) {
      options.where.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator, value));
      });
    }

    // Apply order by
    if (options.orderBy) {
      options.orderBy.forEach(([field, direction = 'asc']) => {
        q = query(q, orderBy(field, direction));
      });
    }

    // Apply limit
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

/**
 * Get current user ID
 * @returns {string|null}
 */
export const getCurrentUserId = () => {
  return auth.currentUser?.uid || null;
};

/**
 * Get current user email
 * @returns {string|null}
 */
export const getCurrentUserEmail = () => {
  return auth.currentUser?.email || null;
};

/**
 * Format Firebase error messages
 * @param {Object} error - Firebase error object
 * @returns {string} - Formatted error message
 */
export const formatFirebaseError = (error) => {
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/requires-recent-login':
      return 'Please log in again to complete this action.';
    case 'permission-denied':
      return 'You do not have permission to perform this action.';
    case 'not-found':
      return 'The requested resource was not found.';
    case 'already-exists':
      return 'The resource already exists.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Check if user has a specific role
 * @param {string} role - Role to check
 * @returns {Promise<boolean>}
 */
export const userHasRole = async (role) => {
  try {
    const userData = await getCurrentUserData();
    return userData.roles && userData.roles.includes(role);
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

/**
 * Add role to user
 * @param {string} userId - User ID
 * @param {string} role - Role to add
 * @returns {Promise}
 */
export const addUserRole = async (userId, role) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentRoles = userData.roles || [];

      if (!currentRoles.includes(role)) {
        await updateDoc(doc(db, 'users', userId), {
          roles: [...currentRoles, role],
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error('Error adding user role:', error);
    throw error;
  }
};

/**
 * Remove role from user
 * @param {string} userId - User ID
 * @param {string} role - Role to remove
 * @returns {Promise}
 */
export const removeUserRole = async (userId, role) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentRoles = userData.roles || [];

      await updateDoc(doc(db, 'users', userId), {
        roles: currentRoles.filter((r) => r !== role),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error removing user role:', error);
    throw error;
  }
};
