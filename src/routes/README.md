# Routes Structure Documentation

## Overview

This directory contains all routing configuration and logic for the Coderoom LMS application. The routing system is organized to support scalability and maintainability as the application grows.

## File Structure

```
src/routes/
├── index.js           # Main exports and utility functions
├── AppRoutes.jsx      # Main routing component with route definitions
└── constants.js       # Route constants, permissions, and metadata
```

## Files Description

### `AppRoutes.jsx`

The main routing component that renders all application routes. It includes:

- **Route Configuration**: Organized into public, protected, and redirect routes
- **Route Protection**: Integration with ProtectedRoute and PublicRoute components
- **Role-Based Access**: Support for role-based route protection
- **Navigation Config**: Configuration for dynamic navigation menus

### `constants.js`

Centralized constants and configuration:

- **ROUTES**: All route paths as constants to avoid typos
- **USER_ROLES**: User role definitions
- **routePermissions**: Role-based access control matrix
- **routeMetadata**: SEO and UI metadata for each route
- **generateRoute**: Helper functions for dynamic routes

### `index.js`

Main export file with utility functions:

- **Route Exports**: Clean imports for other parts of the application
- **Utility Functions**: Helper functions for route operations
- **Route Metadata Helpers**: Functions to get titles, breadcrumbs, etc.

## Usage Examples

### Basic Import

```jsx
import AppRoutes from './routes/AppRoutes';
// or
import { AppRoutes } from './routes';
```

### Using Route Constants

```jsx
import { ROUTES } from './routes';

// Navigate programmatically
navigate(ROUTES.DASHBOARD);

// Generate dynamic routes
import { generateRoute } from './routes';
const courseUrl = generateRoute.courseDetail('course-123');
```

### Route Protection

```jsx
import { checkRoutePermission, USER_ROLES } from './routes';

const canAccess = checkRoutePermission('/admin/users', USER_ROLES.ADMIN);
```

### Navigation Configuration

```jsx
import { navigationConfig } from './routes';

const userNavItems = navigationConfig[userRole];
```

## Adding New Routes

### Step 1: Add Route Constant

```javascript
// In constants.js
export const ROUTES = {
  // ... existing routes
  NEW_FEATURE: '/new-feature',
};
```

### Step 2: Add Route Permissions (if needed)

```javascript
// In constants.js
export const routePermissions = {
  // ... existing permissions
  [ROUTES.NEW_FEATURE]: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
};
```

### Step 3: Add Route Metadata

```javascript
// In constants.js
export const routeMetadata = {
  // ... existing metadata
  [ROUTES.NEW_FEATURE]: {
    title: 'New Feature | Coderoom LMS',
    breadcrumb: 'New Feature',
    description: 'Description of the new feature',
  },
};
```

### Step 4: Add Route to Configuration

```javascript
// In AppRoutes.jsx
import NewFeature from '../pages/NewFeature';

// Add to routeConfig.protected or routeConfig.public
{
  path: ROUTES.NEW_FEATURE,
  element: NewFeature,
  title: 'New Feature',
  description: 'Description of the new feature',
  roles: [USER_ROLES.ADMIN, USER_ROLES.INSTRUCTOR],
}
```

### Step 5: Update Navigation (if needed)

```javascript
// In AppRoutes.jsx - navigationConfig
instructor: [
  // ... existing items
  {
    label: 'New Feature',
    path: ROUTES.NEW_FEATURE,
    icon: 'icon-name',
  },
],
```

## Route Protection

### ProtectedRoute Component

- Checks user authentication
- Validates user roles against route requirements
- Shows loading states during authentication checks
- Redirects unauthorized users appropriately

### PublicRoute Component

- Prevents authenticated users from accessing public routes
- Redirects logged-in users to dashboard
- Shows loading states during authentication checks

### Role-Based Access Control

The system supports three user roles:

- **Student**: Basic access to courses and assignments
- **Instructor**: Can manage courses, assignments, and students
- **Admin**: Full system access including user management

## Navigation System

The `navigationConfig` object provides role-specific navigation menus:

- Dynamic menu generation based on user role
- Icon support for visual navigation
- Organized by user permissions

## Future Enhancements

### Planned Features

- Breadcrumb navigation system
- Dynamic route loading
- Route-based code splitting
- Advanced permissions system
- Route analytics tracking

### Extensibility

The current structure supports:

- Nested routes for complex features
- Dynamic route parameters
- Conditional route rendering
- Multi-role access control
- SEO optimization per route

## Best Practices

1. **Always use route constants** instead of hardcoded strings
2. **Define permissions** for new protected routes
3. **Add metadata** for SEO and navigation
4. **Test route protection** with different user roles
5. **Keep route organization** consistent with feature grouping

## Troubleshooting

### Common Issues

- **Route not found**: Check if route constant is properly exported
- **Access denied**: Verify user role has permission for the route
- **Redirect loops**: Check ProtectedRoute and PublicRoute logic
- **Navigation issues**: Ensure React Router Link components are used

### Debugging

Use the browser's Network tab and React DevTools to debug route issues. The route configuration is designed to be transparent and debuggable.
