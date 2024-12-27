import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from "axios"

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserDataContext)
    const[isloading, setIsLoading] = useState(true)
   
    // console.log(token)
    
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then(response =>{
          if(response.status === 200){
            setUser(response.data)
            setIsLoading(false)
          }
        }).catch(err=>{
          localStorage.removeItem('token')
          navigate('/login')
        })
        
    }, [token])

    if(isloading){
      return <h1>Loading...</h1>
    }

  return (
    <div>{children}</div>
    
  )
}

export default UserProtectWrapper