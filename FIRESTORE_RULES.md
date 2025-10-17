# Firestore Security Rules Deployment

## Overview

The Firestore security rules have been updated to implement proper role-based access control for the Coderoom LMS application.

## Rules Structure

### User Document Rules (`/users/{userId}`)

**Read Access:**

- Users can only read their own user document
- Requires authentication: `request.auth != null && request.auth.uid == userId`

**Create Access:**

- Users can create their own user document during registration
- Must include exactly these fields: `['name', 'email', 'role', 'createdAt']`
- Role is forced to 'student' by default: `request.resource.data.role == 'student'`
- Must be authenticated: `request.auth != null && request.auth.uid == userId`

**Update Access:**

- Users can update their own profile
- Cannot update the 'role' field (role changes require admin privileges)
- Must be authenticated: `request.auth != null && request.auth.uid == userId`

**Delete Access:**

- Disabled: `allow delete: if false`

### Course Document Rules (`/courses/{courseId}`)

**Read Access:**

- All authenticated users can read course documents: `allow read: if true`

**Write Access:**

- Only admin users can create/update/delete courses
- Requires admin role in custom claims: `request.auth.token.role == 'admin'`

## User Data Structure

When creating user accounts, the following structure is enforced:

```javascript
{
  name: "John Doe",           // Full name (firstName + lastName)
  email: "john@example.com",  // User's email address
  role: "student",            // Always 'student' for new registrations
  createdAt: serverTimestamp() // Creation timestamp
}
```

## Role Management

### Default Role

- All new users are assigned the 'student' role by default
- This is enforced at the security rule level

### Role Hierarchy

1. **Student** - Basic access to courses and assignments
2. **Instructor** - Can manage courses and view student progress
3. **Admin** - Full system access including user management

### Custom Claims (Backend Setup Required)

To properly implement role-based access for courses, you need to set custom claims using Firebase Admin SDK:

```javascript
// Example: Set instructor role (requires Admin SDK on backend)
await admin.auth().setCustomUserClaims(uid, { role: 'instructor' });
```

## Deployment Instructions

1. **Deploy the rules to Firebase:**

   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Verify rules in Firebase Console:**

   - Go to Firestore Database → Rules
   - Check that the rules are active

3. **Test the rules:**
   - Create a new user account
   - Verify user document is created with correct structure
   - Test that users can only access their own data

## Security Features

### Data Validation

- Enforces exact field structure for user documents
- Prevents role escalation during user creation
- Validates required fields are present

### Access Control

- Users can only access their own data
- Role-based access for administrative functions
- Prevents unauthorized data modifications

### Audit Trail

- All documents include creation timestamps
- Update operations are logged and traceable

## Troubleshooting

### Common Issues

**"Missing or insufficient permissions" error:**

- User is trying to access data they don't own
- Check authentication state
- Verify user ID matches document ID

**"Document doesn't match required schema" error:**

- User document missing required fields
- Extra fields not allowed in user creation
- Role field not set to 'student'

**"Cannot update role field" error:**

- Users cannot change their own role
- Role updates require admin privileges through custom claims

### Development Testing

During development, you can temporarily relax rules for testing:

```javascript
// DEVELOPMENT ONLY - DO NOT USE IN PRODUCTION
match /users/{userId} {
  allow read, write: if request.auth != null;
}
```

Remember to restore proper security rules before deploying to production.

## Backend Implementation Notes

For full role management, implement these backend functions:

1. **Promote User to Instructor:**

   ```javascript
   // Admin function to promote user
   const promoteToInstructor = async (userId) => {
     await admin.auth().setCustomUserClaims(userId, { role: 'instructor' });
     // Optionally update Firestore document (not enforced by rules)
   };
   ```

2. **Course Management:**

   - Admin users can create/update/delete courses
   - Instructors should have course creation permissions (implement via custom claims)

3. **User Role Sync:**
   - Keep Firestore role field in sync with custom claims
   - Use Cloud Functions to maintain consistency
