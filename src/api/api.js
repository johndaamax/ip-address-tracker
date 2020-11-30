const IPIFY_API_KEY = process.env.REACT_APP_IPIFY_API_KEY;

export const fetchIPDetails = async (ip) => {
    try {
        const data = await (await fetch(`https://geo.ipify.org/api/v1?apiKey=${IPIFY_API_KEY}&ipAddress=${ip}`)).json();
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
            error: err.message
        }
    }
}
