


export const reducer = (state = {cartItems: []}, action) => {

    switch(action.type){
        case 'initialAction': return {...state, cartItems: action.payload} ;
        break;

        case 'update': return {...state, cartItems: [...state.cartItems, action.payload] };
        break;

        default: return state;
    }


}





