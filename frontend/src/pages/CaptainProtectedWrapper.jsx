import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from "axios"

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const[isloading, setIsLoading] = useState(true)
   
    // console.log(token)
    
    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          if (response.status === 200) {
              setCaptain(response.data)
              setIsLoading(false)
          }
      })
          .catch(err => {
            
              localStorage.removeItem('token')
              navigate('/captain-login')
          })
        
    }, [token])

 

    // It is use for validating user
    if(isloading){
      return <h1>Loading...</h1>
    }
  return (
    <div>{children}</div>
    
  )
}

export default CaptainProtectWrapper