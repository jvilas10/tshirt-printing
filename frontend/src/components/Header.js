import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import SummaryApi from '../common';
import {useNavigate } from 'react-router-dom'

import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
const Header = () => {
const user=useSelector(state=>state?.user?.user)
console.log(user);
const dispatch = useDispatch()
const [menuDisplay,setMenuDisplay] = useState(false)
const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.setItem('user', null);
  dispatch(setUserDetails(null))
  navigate('/');
          //   const fetchData= await fetch(SummaryApi.logout_user.url,{
          //     method:SummaryApi.logout_user.method,
          //     credentials:'include'   
          //   })
          // const data=await fetchData.json();  
          // if(data.success){
          //   console.log('Logout success')
          //   dispatch(setUserDetails(null))
          // }

}
  return (
    <header className="h-16 shadow-md bg-white">
        <div className='h-full container mx-auto flex items-center px-4 justify-between '>
            <div>
                <Link to={"/"}>
                   <Logo h={90} w={60}/>
                </Link>                
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='Search product here ....' className='w-full outline-none'/>
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'><GrSearch /></div>
            </div>

            <div className='flex items-center gap-7'>
                <div className='relative  flex justify-center'>
                  {
                    user?.id &&
                    ( <div className='text-3xl cursor-pointer flex text-center' onClick={()=> setMenuDisplay(preve=>!preve)}>
                    {user?.profilePic?(<img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>):(<FaRegUserCircle />)}
                   </div>)
                  }
                   

                     {menuDisplay && ( <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                        <nav>
                        
                          {
                            user?.role ===ROLE.ADMIN && (
                              <Link to={"admin-panel"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> setMenuDisplay(preve=>!preve)}>Admin panel</Link>
                            )
                          }
                            
                        </nav>
                     </div>) }
                
               </div>   
                   
                <div className='text-2xl cursor-pointer relative'>
                  <span><FaShoppingCart /></span>
                   <div className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-3 -right-3">
                    <p className='text-xs'>0</p>
                    </div>
                </div>
                <div>                  
                    {
                        user?.id?(
                            <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 items-center hover:bg-red-700'> Logout</button>
                        ):(
                            <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-600 items-center hover:bg-red-700'>Login  </Link>
                        )
                    }
                  
                 </div>
           
            </div>
        </div>

    </header>
  )
}

export default Header