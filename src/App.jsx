import {useDispatch} from "react-redux"
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Outlet} from 'react-router-dom'

import Footer from "./components/Footer";
import { Header } from "./components";


function App() {
const [loading,setLoading] = useState(true)  
const dispatch=useDispatch();

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      // dispatch(login(userData))
                dispatch(login(JSON.parse(JSON.stringify(userData))));

    }else{
      dispatch(logout())
    }
  })
  .finally(() => setLoading(false))
},[])
  

return  (
    <div className='min-h-screen flex flex-wrap content-between bg-[#FAFAF8]  '>
      <div className="w-full"> 
         <Header></Header>
         
        <main>
          <Outlet/>
        </main>
        <Footer></Footer> 
       
      </div>
    </div>
  ) 
}
export default App
