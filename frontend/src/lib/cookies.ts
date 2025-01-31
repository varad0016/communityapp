// utils/cookies.js
import Cookies from 'js-cookie';

// Set cookie
export const setAuthCookie = (token : string) => {
  Cookies.set('authToken', token, { expires: 7, path: '' });  // Expiry time: 7 days
};

// Get cookie
export const getAuthCookie = () => {
  return Cookies.get('authToken');
};

// Remove cookie
export const removeAuthCookie = () => {
  Cookies.remove('authToken');
};
