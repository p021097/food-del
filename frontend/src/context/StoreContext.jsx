import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
// Use States
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);


// Other Variables Declared
  const url = "https://food-del-backend-nspa.onrender.com"
  const [token, setToken] = useState("")


  // Add to cart function
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(url+"/api/cart/add", {itemId},{headers:{token}})
    }
  };

// Remove from cart function
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };


// Get Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount
  };

// Fetch Foods List Function

const fetchFoodList = async () => {
  const res = await axios.get(url+"/api/food/list")
  setFoodList(res.data.data)
}

// load cart data

const loadCartData = async (token) => {
  const res = await axios.post(url+"/api/cart/get",{},{headers:{token}})
  setCartItems(res.data.cartData)

}

// UseEffects
  useEffect(()=>{

    async function loadData(){
      await fetchFoodList()

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }

    loadData()

  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
