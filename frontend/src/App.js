import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [userId,setUserData]=useState()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{ 
    const userId = JSON.parse(localStorage.getItem('user'));
    setUserData(userId)
    const dataResponse = await fetch(`${SummaryApi.current_user.url}/${userId}`,{
      method : SummaryApi.current_user.method,    
    })
    const dataApi = await dataResponse.json()    
    if(dataApi.success){ 
      dispatch(setUserDetails(dataApi?.data))
    }
}

const fetchUserAddToCart = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (!userId) {
      console.error("User ID is missing in localStorage.");
      return;
    }

    const payload = { userId };
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!dataResponse.ok) {
      console.error("Failed to fetch cart product count:", dataResponse.statusText);
      return;
    }

    const dataApi = await dataResponse.json();
    console.log("Cart product count response:", dataApi);

    if (dataApi?.data?.count !== undefined) {
      setCartProductCount(dataApi.data.count);
    } else {
      console.error("Cart product count is missing in response.");
    }
  } catch (error) {
    console.error("Error in fetchUserAddToCart:", error);
  }
};


   useEffect(()=>{
      /** User Details */
     fetchUserDetails()
     fetchUserAddToCart()
   },[])

  return (
    <>
    <Context.Provider value={{ userId,
          fetchUserDetails,
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart }}>
      <Header/>
          <main className='min-h-[calc(100vh-100px)]'>
             <Outlet/>
        </main>   
      <Footer/>
      </Context.Provider>
    </>

  );
}

export default App;
