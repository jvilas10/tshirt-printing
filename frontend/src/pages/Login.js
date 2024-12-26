import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { Form, Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import Context from '../context';
// import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [data,setData]=useState({
        email:'',
        password:''
    })

    const navigate=useNavigate()
    const {fetchUserDetails} = useContext(Context)

    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setData((preve)=>{
             return{
                ...preve,
                [name]:value
             }
        })
    }

    const handleSubmit=async (e)=>{
    
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.signIn.url,{
          method : SummaryApi.signIn.method,
          // credentials : 'include',
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()   
      if(dataApi.success){
       // toast.success(dataApi.message)

       localStorage.setItem('user', JSON.stringify(dataApi?.data.id));
       navigate('/');
       fetchUserDetails();
      }

      if(dataApi.error){
        // toast.success(dataApi.message)
      }
    }

    
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
             <div className='bg-white p-4 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                   <img src={loginIcons} alt="login icon"/>
                </div>
                <Form className=' pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email</label>
                         <div className='bg-slate-100 p-2'>
                          <input type='text' placeholder='Enter Email' name='email' value={data.email} onChange={handleOnChange} className='w-full h-full outline-none bg-transparent'/>
                        </div>                        
                    </div>
                    <div className='grid'>
                        <label>Password</label>
                        <div className='bg-slate-100 p-2 flex'>
                          <input type={ showPassword ? "text":"password"} name='password' value={data.password} onChange={handleOnChange} placeholder='Enter Password' className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer'>
                              <span >{!showPassword?<FaEye onClick={()=>setShowPassword(true)} />:<FaEyeSlash onClick={()=>setShowPassword(false)} />} </span>
                            
                            </div>
                        </div>  
                        <Link to={'/forgot-password'} className='block w-fit ml-auto pt-2 hover:underline hover:text-red-600'>Forgot Password?</Link>                     
                    </div>
                  
                    <div>
                        <button className='bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                     </div>
                     <p className='py-5'>Don't have account ? <Link to={'/sign-up'} className=' text-red-600 hover:text-red-600 hover:underline'>Sign up</Link></p>
                  
                </Form>                
             </div>
         </div>
    </section>
  )
}

export default Login