import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, USER_ROLES } from './constants';

// Import page components
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

// Import route protection components
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

// Import future pages (uncomment when created)
// import Profile from '../pages/Profile';
// import Settings from '../pages/Settings';
// import Students from '../pages/Students';
// import Courses from '../pages/Courses';
// import CourseDetail from '../pages/CourseDetail';
// import CreateCourse from '../pages/CreateCourse';
// import Assignments from '../pages/Assignments';
// import AssignmentDetail from '../pages/AssignmentDetail';
// import Grades from '../pages/Grades';
// import Reports from '../pages/Reports';
// import Users from '../pages/Users';
// import NotFound from '../pages/NotFound';

// Route configuration object
export const routeConfig = {
  // Public routes (accessible without authentication)
  public: [
    {
      path: ROUTES.SIGNIN,
      element: Login,
      title: 'Sign In',
      description: 'User login page',
    },
    {
      path: ROUTES.SIGNUP,
      element: Register,
      title: 'Sign Up',
      description: 'User registration page',
    },
  ],

  // Protected routes (require authentication)
  protected: [
    {
      path: ROUTES.DASHBOARD,
      element: Dashboard,
      title: 'Dashboard',
      description: 'Main dashboard page',
      roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN], // All authenticated users
    },
    // User Management Routes
    // {
    //   path: ROUTES.PROFILE,
    //   element: Profile,
    //   title: 'Profile',
    //   description: 'User profile page',
    //   roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },
    // {
    //   path: ROUTES.SETTINGS,
    //   element: Settings,
    //   title: 'Settings',
    //   description: 'User settings page',
    //   roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },

    // Student Management Routes (Instructor/Admin only)
    // {
    //   path: ROUTES.STUDENTS,
    //   element: Students,
    //   title: 'Students',
    //   description: 'Student management page',
    //   roles: [USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },

    // Course Management Routes
    // {
    //   path: ROUTES.COURSES,
    //   element: Courses,
    //   title: 'Courses',
    //   description: 'Courses overview page',
    //   roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },
    // {
    //   path: ROUTES.CREATE_COURSE,
    //   element: CreateCourse,
    //   title: 'Create Course',
    //   description: 'Create new course page',
    //   roles: [USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },
    // {
    //   path: ROUTES.COURSE_DETAIL,
    //   element: CourseDetail,
    //   title: 'Course Details',
    //   description: 'Individual course page',
    //   roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },

    // Assignment Management Routes
    // {
    //   path: ROUTES.ASSIGNMENTS,
    //   element: Assignments,
    //   title: 'Assignments',
    //   description: 'Assignments overview page',
    //   roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },
    // {
    //   path: ROUTES.ASSIGNMENT_DETAIL,
    //   element: AssignmentDetail,
    //   title: 'Assignment Details',
    //   description: 'Individual assignment page',
    //   roles: [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },

    // Grading Routes (Instructor/Admin only)
    // {
    //   path: ROUTES.GRADES,
    //   element: Grades,
    //   title: 'Grades',
    //   description: 'Grades management page',
    //   roles: [USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN],
    // },

    // Reporting Routes (Admin only)
    // {
    //   path: ROUTES.REPORTS,
    //   element: Reports,
    //   title: 'Reports',
    //   description: 'Analytics and reports page',
    //   roles: [USER_ROLES.ADMIN],
    // },

    // User Management Routes (Admin only)
    // {
    //   path: ROUTES.USERS,
    //   element: Users,
    //   title: 'User Management',
    //   description: 'User administration page',
    //   roles: [USER_ROLES.ADMIN],
    // },
  ],

  // Redirect routes
  redirects: [
    {
      from: '/',
      to: ROUTES.DASHBOARD,
      replace: true,
    },
    {
      from: ROUTES.HOME,
      to: ROUTES.DASHBOARD,
      replace: true,
    },
  ],
};

// Navigation menu configuration (for sidebar/navbar)
export const navigationConfig = {
  student: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
    },
    {
      label: 'My Courses',
      path: '/courses',
      icon: 'book',
    },
    {
      label: 'Assignments',
      path: '/assignments',
      icon: 'clipboard',
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'user',
    },
  ],
  instructor: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
    },
    {
      label: 'My Courses',
      path: '/courses',
      icon: 'book',
    },
    {
      label: 'Students',
      path: '/students',
      icon: 'users',
    },
    {
      label: 'Assignments',
      path: '/assignments',
      icon: 'clipboard',
    },
    {
      label: 'Grades',
      path: '/grades',
      icon: 'star',
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'user',
    },
  ],
  admin: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
    },
    {
      label: 'Users',
      path: '/users',
      icon: 'users',
    },
    {
      label: 'Courses',
      path: '/courses',
      icon: 'book',
    },
    {
      label: 'Students',
      path: '/students',
      icon: 'graduation-cap',
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'chart-bar',
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'cog',
    },
  ],
};

// Main AppRoutes component
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {routeConfig.public.map((route) => {
        if (route.redirect) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to={route.redirect} replace />}
            />
          );
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PublicRoute>
                <route.element />
              </PublicRoute>
            }
          />
        );
      })}

      {/* Protected Routes */}
      {routeConfig.protected.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requiredRoles={route.roles}>
              <route.element />
            </ProtectedRoute>
          }
        />
      ))}

      {/* Redirect Routes */}
      {routeConfig.redirects.map((redirect) => (
        <Route
          key={redirect.from}
          path={redirect.from}
          element={<Navigate to={redirect.to} replace={redirect.replace} />}
        />
      ))}

      {/* Catch-all route for 404 */}
      <Route path='*' element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      {/* Uncomment when NotFound page is created */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;
