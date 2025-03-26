export const saveTolocalStorage = (
    name: string,
    data: unknown,
    expirationTime: number = Date.now() + 1000 * 60 * 10
) => {
    const existingData = JSON.parse(localStorage.getItem(name) || "{}");
    const cachedData = {
        ...existingData,
        data,
        expiration: expirationTime
    }

    localStorage.setItem(name, JSON.stringify(cachedData))
}

export const getFromLocalStorage = ( name: string ) => {
    const cachedData = JSON.parse(localStorage.getItem(name) as string);

    if (!cachedData) return null;

    const currentTime = Date.now();
    if (currentTime > cachedData.expiration) {
        localStorage.removeItem(name);
        return null;
    }

    return cachedData.data
}

export const removeFromLocalStorage = (name: string) => {
    localStorage.removeItem(name);
}