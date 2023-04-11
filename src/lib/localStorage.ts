export enum LocalStorageKeys {
  botWelcome = 'aai-bot-welcome',
}

export const setLocalStorage = <T>(key: LocalStorageKeys, value: T): void =>
  window?.localStorage?.setItem(key, JSON.stringify(value));

export const getLocalStorage = <T>(key: LocalStorageKeys): T | null => {
  const value = window?.localStorage?.getItem(key);
  if (value) {
    return JSON.parse(value) as T;
  }
  return null;
};
