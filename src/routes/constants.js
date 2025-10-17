// Route constants for better maintainability
export const ROUTES = {
  // Authentication routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  REGISTER: '/register',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  HOME: '/home',

  // User management routes
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Course management routes
  COURSES: '/courses',
  CREATE_COURSE: '/courses/create',
  COURSE_DETAIL: '/courses/:courseId',
  EDIT_COURSE: '/courses/:courseId/edit',

  // Assignment routes
  ASSIGNMENTS: '/assignments',
  CREATE_ASSIGNMENT: '/assignments/create',
  ASSIGNMENT_DETAIL: '/assignments/:assignmentId',
  EDIT_ASSIGNMENT: '/assignments/:assignmentId/edit',

  // Student management routes
  STUDENTS: '/students',
  STUDENT_DETAIL: '/students/:studentId',

  // Grading routes
  GRADES: '/grades',
  GRADE_ASSIGNMENT: '/grades/assignment/:assignmentId',

  // Reporting routes
  REPORTS: '/reports',
  COURSE_REPORTS: '/reports/courses',
  STUDENT_REPORTS: '/reports/students',

  // Administration routes
  USERS: '/users',
  SYSTEM_SETTINGS: '/admin/settings',
  ANALYTICS: '/admin/analytics',

  // Utility routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
};

// Helper function to generate dynamic routes
export const generateRoute = {
  courseDetail: (courseId) => `/courses/${courseId}`,
  editCourse: (courseId) => `/courses/${courseId}/edit`,
  assignmentDetail: (assignmentId) => `/assignments/${assignmentId}`,
  editAssignment: (assignmentId) => `/assignments/${assignmentId}/edit`,
  studentDetail: (studentId) => `/students/${studentId}`,
  gradeAssignment: (assignmentId) => `/grades/assignment/${assignmentId}`,
};

// Route metadata for breadcrumbs, titles, and SEO
export const routeMetadata = {
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard | Coderoom LMS',
    breadcrumb: 'Dashboard',
    description: 'Learning Management System Dashboard',
  },
  [ROUTES.LOGIN]: {
    title: 'Login | Coderoom LMS',
    breadcrumb: 'Login',
    description: 'Sign in to your Coderoom LMS account',
  },
  [ROUTES.SIGNUP]: {
    title: 'Sign Up | Coderoom LMS',
    breadcrumb: 'Sign Up',
    description: 'Create your Coderoom LMS account',
  },
  [ROUTES.COURSES]: {
    title: 'Courses | Coderoom LMS',
    breadcrumb: 'Courses',
    description: 'Manage and view your courses',
  },
  [ROUTES.ASSIGNMENTS]: {
    title: 'Assignments | Coderoom LMS',
    breadcrumb: 'Assignments',
    description: 'View and manage assignments',
  },
  [ROUTES.STUDENTS]: {
    title: 'Students | Coderoom LMS',
    breadcrumb: 'Students',
    description: 'Student management and overview',
  },
  [ROUTES.GRADES]: {
    title: 'Grades | Coderoom LMS',
    breadcrumb: 'Grades',
    description: 'Grade management and analytics',
  },
  [ROUTES.PROFILE]: {
    title: 'Profile | Coderoom LMS',
    breadcrumb: 'Profile',
    description: 'Manage your profile settings',
  },
  [ROUTES.SETTINGS]: {
    title: 'Settings | Coderoom LMS',
    breadcrumb: 'Settings',
    description: 'Application settings and preferences',
  },
};

// User role permissions for routes
export const USER_ROLES = {
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
  GUEST: 'guest',
};

// Route access control matrix
export const routePermissions = {
  [ROUTES.DASHBOARD]: [
    USER_ROLES.ADMIN,
    USER_ROLES.INSTRUCTOR,
    USER_ROLES.STUDENT,
  ],
  [ROUTES.COURSES]: [
    USER_ROLES.ADMIN,
    USER_ROLES.INSTRUCTOR,
    USER_ROLES.STUDENT,
  ],
  [ROUTES.CREATE_COURSE]: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
  [ROUTES.ASSIGNMENTS]: [
    USER_ROLES.ADMIN,
    USER_ROLES.INSTRUCTOR,
    USER_ROLES.STUDENT,
  ],
  [ROUTES.CREATE_ASSIGNMENT]: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
  [ROUTES.STUDENTS]: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
  [ROUTES.GRADES]: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
  [ROUTES.USERS]: [USER_ROLES.ADMIN],
  [ROUTES.REPORTS]: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
  [ROUTES.SYSTEM_SETTINGS]: [USER_ROLES.ADMIN],
  [ROUTES.PROFILE]: [
    USER_ROLES.ADMIN,
    USER_ROLES.INSTRUCTOR,
    USER_ROLES.STUDENT,
  ],
  [ROUTES.SETTINGS]: [
    USER_ROLES.ADMIN,
    USER_ROLES.INSTRUCTOR,
    USER_ROLES.STUDENT,
  ],
};

export default ROUTES;
