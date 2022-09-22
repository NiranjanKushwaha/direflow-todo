export const getLocalStorageData = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : [];
};

export const setDataInLocalStorage = (key: string, value: any) => {
  if (key && value !== null && value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
