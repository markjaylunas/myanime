/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  // "/new-verification",
  // "/forgot-password",
  // "/reset-password",
];

/**
 * The prefix for the API authentication routes
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */

export const apiAuthPrefix = "/auth";

/**
 * An array of protected routes that require authentication
 * @type {string[]}
 */

export const authRoutes = ["/sign-in"];

/**
 * The default login redirect path
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/my-list";

/**
 * The default sign in path
 * @type {string}
 */
export const DEFAULT_SIGNIN_PATH = "/sign-in";

/**
 * The default sign up path
 * @type {string}
 */

export const DEFAULT_HOME_PATH = "/";

/**
 * The default user account path
 * @type {string}
 */

export const DEFAULT_USER_ACCOUNT_PATH = "/user";
