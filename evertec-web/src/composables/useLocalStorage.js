export function useLocalStorage() {
  const addLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value)
  }
  const getLocalStorage = (key) => window.localStorage.getItem(key)

  return {
    addLocalStorage,
    getLocalStorage,
  }
}
