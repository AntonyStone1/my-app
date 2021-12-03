export const setItem = (name, value) => {
    return localStorage.setItem(name, value)
}

export const getItem = (name) => {
    return localStorage.getItem(name)
}

export const removeKey = (name) => {
    return localStorage.removeItem(name)
}

export const clearLocalStorage = () => {
    return localStorage.clear()
}