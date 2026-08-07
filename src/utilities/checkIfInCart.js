
const  checkIfInCart = (productId) => {
    const cartItems = localStorage.getItem('cartItems');
    const cartItemsObj = JSON.parse(cartItems);

    return cartItemsObj?.find((item)=>{return item.id == productId})?true:false;

}

export default checkIfInCart;





