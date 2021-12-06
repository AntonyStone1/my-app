export const setItem = (name, value) => localStorage.setItem(name, value)

export const getItem = (name) => localStorage.getItem(name)

export const removeKey = (name) => localStorage.removeItem(name)

export const clearLocalStorage = () => localStorage.clear()
