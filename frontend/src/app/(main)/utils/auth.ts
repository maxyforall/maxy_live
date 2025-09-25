// Authentication utilities for Corex and WOC platforms

export interface AuthUser {
  _id: string;
  maxy_id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthToken {
  id: string;
  type: 'corex_user' | 'woc_user';
  iat: number;
  exp: number;
}

// Token storage keys
export const TOKEN_KEYS = {
  MAIN: 'token',
  COREX: 'corex_token',
  WOC: 'woc_token',
  USER: 'user'
} as const;

// Store token in localStorage
export const storeToken = (platform: 'corex' | 'woc', token: string, user: AuthUser): void => {
  const tokenKey = platform === 'corex' ? TOKEN_KEYS.COREX : TOKEN_KEYS.WOC;
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(`${platform}_user`, JSON.stringify(user));
};

// Get token from localStorage
export const getToken = (platform: 'corex' | 'woc'): string | null => {
  const tokenKey = platform === 'corex' ? TOKEN_KEYS.COREX : TOKEN_KEYS.WOC;
  return localStorage.getItem(tokenKey);
};

// Get user data from localStorage
export const getUserData = (platform: 'corex' | 'woc'): AuthUser | null => {
  const userKey = `${platform}_user`;
  const userData = localStorage.getItem(userKey);
  return userData ? JSON.parse(userData) : null;
};

// Remove token from localStorage
export const removeToken = (platform: 'corex' | 'woc'): void => {
  const tokenKey = platform === 'corex' ? TOKEN_KEYS.COREX : TOKEN_KEYS.WOC;
  const userKey = `${platform}_user`;
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};

/**
 * Comprehensive logout function that clears all user data from the application
 * @param {Function} setUserCallback - Optional callback to clear user state in components
 * @param {string} redirectUrl - Optional URL to redirect to after logout
 * @param {Function} refreshUserState - Optional callback to refresh user state in context
 */
export const logoutUser = (
  setUserCallback?: ((user: null) => void) | null, 
  redirectUrl?: string,
  refreshUserState?: () => void
): void => {
  // Clear all tokens and user data from localStorage
  localStorage.removeItem(TOKEN_KEYS.MAIN);
  localStorage.removeItem(TOKEN_KEYS.COREX);
  localStorage.removeItem(TOKEN_KEYS.WOC);
  localStorage.removeItem(TOKEN_KEYS.USER);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  
  // Clear any additional platform-specific user data
  localStorage.removeItem('corex_user');
  localStorage.removeItem('woc_user');
  
  // Clear any session storage items if used
  sessionStorage.clear();
  
  // Clear cookies if any are used for authentication
  document.cookie.split(";").forEach(cookie => {
    const [name] = cookie.trim().split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Update user state if callback provided
  if (setUserCallback) {
    setUserCallback(null);
  }
  
  // Refresh global user state if callback provided
  if (refreshUserState) {
    refreshUserState();
  }
  
  // Redirect if URL provided
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

// Decode JWT token
export const decodeToken = (token: string): AuthToken | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    return null;
  }
};

// Check if token is valid (not expired)
export const isTokenValid = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return false;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
};

// Check if user is authenticated for a specific platform
export const isAuthenticated = (platform: 'corex' | 'woc'): boolean => {
  const token = getToken(platform);
  return token ? isTokenValid(token) : false;
};

// Redirect to login page if not authenticated
export const requireAuth = (platform: 'corex' | 'woc'): boolean => {
  const authenticated = isAuthenticated(platform);
  if (!authenticated) {
    // Client-side redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = platform === 'corex' ? '/corex/manage-corex' : '/woc/manage-woc';
    }
  }
  return authenticated;
};

// Get authentication status for both platforms
export const getAuthStatus = (): {
  corex: { authenticated: boolean; user: AuthUser | null };
  woc: { authenticated: boolean; user: AuthUser | null };
} => {
  return {
    corex: {
      authenticated: isAuthenticated('corex'),
      user: getUserData('corex')
    },
    woc: {
      authenticated: isAuthenticated('woc'),
      user: getUserData('woc')
    }
  };
};