


export const reducer = (state = {cartItems: []}, action) => {

    switch(action.type){
        case 'initialAction': return {...state, cartItems: action.payload} ;
        break;

        case 'addProduct': return {...state, cartItems: [...state.cartItems, action.payload] };
        break;

        case 'updateQuantity': return {...state, cartItems: state.cartItems.map((item)=>{ return item.id == action.payload.productId ? {...item, quantity: action.payload.quantity} : item })}

    

        default: return state;
    }


}





