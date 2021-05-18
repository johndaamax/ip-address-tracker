const IPIFY_API_KEY = process.env.REACT_APP_IPIFY_API_KEY;

export const fetchIPDetails = async (input) => {
    try {
        const data = await (await fetch(`https://geo.ipify.org/api/v1?apiKey=${IPIFY_API_KEY}&ipAddress=${input}&domain=${input}`)).json();
        if (data.code >= 400) {
            //Error - submitted wrong IP
            return {
                error: data.messages,
                isPaneOpen: false
            }
        } else {
            return {
                ipAddrData: data,
                isPaneOpen: true,
                error: ''
            }
        }
    } catch (err) {
        console.error(err);
        return {
            error: `${err.message}. Please check your connection or disable your adblocker.`
        }
    }
}
