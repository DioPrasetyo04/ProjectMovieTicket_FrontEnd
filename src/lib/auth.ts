function decodeJwtPayload(token: string): any | null {
  try {
    const base64Url = token.split(".")[1];
    const payload = atob(base64Url);
    return JSON.parse(payload);
  } catch (error) {
    return null;
  }
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const payload = decodeJwtPayload(token);

  if (!payload || !payload.exp) return true;

  const expiredTime = payload.exp * 1000;

  const now = Date.now();
  return now > expiredTime;
};
