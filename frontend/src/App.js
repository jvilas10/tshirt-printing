import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const dataResponse = await fetch(`${SummaryApi.current_user.url}/${user}`,{
      method : SummaryApi.current_user.method,
    })

    const dataApi = await dataResponse.json()
    
    if(dataApi.success){
      dispatch(setUserDetails(dataApi?.data))
    }
}

   useEffect(()=>{
      /** User Details */
     fetchUserDetails()

   },[])

  return (
    <>
    <Context.Provider value={{ fetchUserDetails }}>
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
