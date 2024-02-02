const getStorageObject = (key) => {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
  return null;
};

const setStorageObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.token;
  }
  return null;
};

export const getUserSession = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.user;
  }
  return null;
};

export const setUserSession = (sessionData) => {
  setStorageObject('user-session', sessionData);
};

export const removeSession = () => {
  deleteStorageObject('user-session');
};
