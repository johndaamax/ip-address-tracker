export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FETCH_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'UPDATE_IP':
            return {
                ...state,
                input: action.payload
            }
        default:
            return state;
    }
}