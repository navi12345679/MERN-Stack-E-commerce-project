import React, {createContext, useEffect, useState} from "react";


export  const  ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart ={};
    for(let index = 0; index < 300+1;index++){
        cart[index]=0;
}
return cart;
} 
const ShopContextProvider = (props) => {
  const [all_products,setAll_Products] = useState([]);
    const [cartitem,setCartitem] = useState(getDefaultCart);

    useEffect(()=> {
      fetch('https://mern-stack-e-commerce-project-2wab.onrender.com/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_Products(data))

      if(localStorage.getItem('auth-token')){
        fetch('https://mern-stack-e-commerce-project-2wab.onrender.com/getcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token' : `${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json'
          },
          body:"",
        }).then((response) => response.json()) 
        .then((data) => setCartitem(data));
         
      }
    },[])
    
       const addTocart = (itemId) =>{
         setCartitem((prev)=> ({...prev,[itemId]:prev[itemId]+1}));
         if(localStorage.getItem('auth-token')){
          fetch('https://mern-stack-e-commerce-project-2wab.onrender.com/addtocart', {
            method: 'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({ "itemId": itemId }), 
          })
          .then((response) => response.json())
          .then((data)=> console.log(data));
  
        }
        }
       const removeFromcart = (itemId) =>{
        setCartitem((prev)=> ({...prev,[itemId]:prev[itemId]-1}));
          if(localStorage.getItem('auth-token')){
            fetch('https://mern-stack-e-commerce-project-2wab.onrender.com/removefromcart',{
             method:'POST',
             headers:{
               Accept:'application/form-data',
               'auth-token' : `${localStorage.getItem('auth-token')}`,
               'Content-Type': 'application/json'
             },
             body:JSON.stringify({"itemId":itemId}),
            })
          .then((response) => response.json())
          .then((data)=>console.log(data))
           }
      
      }
    

    
      function getTotalCartAmount() {
             let totalAmount = 0;
             for (const item in cartitem) {
               if (cartitem[item] > 0) {
                 let iteminfo = all_products.find((product) => product.id === Number(item));
                 if (iteminfo) {
                   totalAmount += cartitem[item] * iteminfo.new_price;
                 }
               }
             }
             console.log(totalAmount);
             return totalAmount;
           }

       const getTotalCartitems = () => {
        let totalitems = 0;
    
        for(const item in cartitem)
          {
          if(cartitem[item] > 0){
            totalitems += cartitem[item];
          }
          
        }
        console.log(totalitems);
        return totalitems;
   }
  
   

      const contextValue = {getTotalCartitems,getTotalCartAmount,all_products,cartitem,addTocart,removeFromcart};

    return(
      <ShopContext.Provider value={contextValue}>
                  {props.children}
       </ShopContext.Provider>
    )
}
export default ShopContextProvider;
