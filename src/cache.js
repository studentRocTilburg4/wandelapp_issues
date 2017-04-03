/**
 *
 * @returns {{set: set, get: get}}
 */
const cache = () => {
    return {
        set : (key, value) => {
            if (typeof key === 'string') {
                try {
                    let x = JSON.stringify(value);
                    localStorage.setItem(key, x);
                    return true;
                }
                catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        },
        get: (key) => {
            if (typeof key === 'string') {
                let x = JSON.parse(localStorage.getItem(key));
                return x;
            }
        }
    };
};

export default cache;
