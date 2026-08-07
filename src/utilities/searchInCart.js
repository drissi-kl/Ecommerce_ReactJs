const searchInCart = (productId) => {
    const cartItems = localStorage.getItem('cartItems');
    const cartItemsObj = JSON.parse(cartItems);
    const product = cartItemsObj?.find((item)=>{return item.id == productId});

    return product?product:null;

}


export default searchInCart;