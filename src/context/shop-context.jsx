import React, { createContext, useState } from 'react';
import {PRODUCTS} from "../products";

//create a context for the shop
export const ShopContext = createContext(null);   // store in the application, where it keeps track of states and functions that needs to be accessed everywhere in the project.

// function to get the default cart state
const getDefaultCart = ()=> {
    let cart = {};
    for (let i = 1; i < PRODUCTS.length + 1; i++){
        cart[i]=0;
    }
    return cart;
}

//context provider component
export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1}));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCount =  prev[itemId] - 1;
            return { ...prev, [itemId]: newCount < 0 ? 0 : newCount};
        });
    };

    const updateCartItemCount = (newAmount, itemId) =>
        {
            setCartItems((prev) => ({...prev, [itemId]: newAmount }));
        };

    // context value that will be supplied to consuming components
    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount};

    console.log(cartItems);
    
    return (<ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>);
}