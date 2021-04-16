export default {
    
    getItem(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (error) {
            return undefined;
        }
    },
    increaseItem(key,payload) {
        try {
            if (sessionStorage.getItem(key) === null) {
                sessionStorage.setItem(key, JSON.stringify(payload))
            } else {
                const currentValue = JSON.parse(sessionStorage.getItem(key));
                const updateItem = currentValue.concat(payload);
                sessionStorage.setItem(key, JSON.stringify(updateItem));
            }
        } catch (error) {
             console.error(error);
        }
    },
    
    setItem(key, payload) {
        try {
             sessionStorage.setItem(key, JSON.stringify(payload))
        } catch (error) {
            console.error(error);
        }
    },

    clearStorage(key) {
        sessionStorage.removeItem(key);
    }
}

