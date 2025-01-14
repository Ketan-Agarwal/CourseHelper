interface DecodedToken {
    username: string;
    exp: number;
  }
  
  const parseJwt = <T = string>(token: string | null): T | null => {
    if (!token) {
      return null;
    }
  
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        throw new Error('Invalid token format');
      }
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(window.atob(base64));
      return decodedData as T;
    } catch (error) {
      console.error('Failed to parse JWT:', error);
      return null;
    }
  };
  
  export const getDecodedToken = (token: string): DecodedToken | null => {
    try {
      return parseJwt<DecodedToken>(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  };
  