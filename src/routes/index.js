// Main exports from routes module
export { default as AppRoutes } from './AppRoutes';
export { routeConfig, navigationConfig } from './AppRoutes';
export {
  ROUTES,
  generateRoute,
  routeMetadata,
  USER_ROLES,
  routePermissions,
} from './constants';

// Import the constants for use in utilities
import { routeMetadata, routePermissions } from './constants';

// Re-export commonly used route utilities
export const getRouteTitle = (pathname) => {
  const metadata = routeMetadata[pathname];
  return metadata ? metadata.title : 'Coderoom LMS';
};

export const getRouteBreadcrumb = (pathname) => {
  const metadata = routeMetadata[pathname];
  return metadata ? metadata.breadcrumb : 'Page';
};

export const checkRoutePermission = (pathname, userRole) => {
  const permissions = routePermissions[pathname];
  return permissions ? permissions.includes(userRole) : false;
};
