import React, { useContext, useEffect, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/socketContext'
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  /*All the usestate */
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const[panelOpen, setPanelOpen] = useState(false)
  const[vehiclePanel, setVehiclePanel] = useState(false)
  const[confirmRidePanel, setConfirmRidePanel] = useState(false)
  const[vehicleFound, setVehicleFound] = useState(false)
  const[watingForDriver, setWaitingForDriver] = useState(false)
  const[pickupSuggestions, setPickupSuggestions] = useState([])
  const[destinationSuggestions, setDestinationSuggestions] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const[fare, setFare] = useState({})
  const[vehicleType, setVehicleType] = useState(null)
  const[ride, setRide] = useState(null)

    const navigate = useNavigate()
  /*All the refs */
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const watingForDriverRef = useRef(null)
 

  //useSocket
  const { socket } = useContext(SocketContext)
  
  //userconetxt
  const { user } = useContext(UserDataContext)


  useEffect(() => {
    // console.log(user)
    socket.emit("join", { userType: "user", userId: user._id })
}, [ user ])

  socket.on("confirm-ride", (ride) => {
    setRide(ride)
    setWaitingForDriver(true)
    setVehicleFound(false)
    console.log(ride)
  })


//startride
socket.on('ride-started', (ride)=>{
  setWaitingForDriver(false)
  navigate('/riding')
})
  

  //submitHandler
  const submitHandler =(e)=>{
    e.preventDefault()
  }

  //handlePickupChange
  const handlePickupChange = async (e) => {
    const value = e.target.value
    setPickup(value)

    if(!value.trim()){
      setPickupSuggestions([])
      return
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch {
        // handle error
    }
}

    //handleDestinationChange
    const handleDestinationChange = async (e) => {
      setDestination(e.target.value)
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setDestinationSuggestions(response.data)
      } catch {
          // handle error
      }
  }

  //findTrip
  async function findTrip(){
    setPanelOpen(false)
    setVehiclePanel(true)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {pickup, destination},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log("API Response:", response.data); 
   setFare(response.data)
  }

  //createRide

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
      pickup,
      destination,
      vehicleType

  },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

)

// setRide(response.data.createRide)
}

  //locationpanel 
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.5,
        padding: '20px',
        // opacity: 1
      })

      gsap.to(panelCloseRef.current, {
        opacity: 1
    })

    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
        padding: '0px',
        // opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
    })

    }
  }, [panelOpen])

  //Gsap for vehicle panel
  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform:"translateY(0)"
      })
    
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform:"translateY(100%)"
      })
      
}}, [vehiclePanel])

//ConfirmRide Panel
useGSAP(()=>{
  if(confirmRidePanel){
    gsap.to(confirmRidePanelRef.current, {
      transform:"translateY(0)"
    })
  
  }else{
    gsap.to(confirmRidePanelRef.current, {
      transform:"translateY(100%)"
    })
    
}}, [confirmRidePanel])

//looking For Driver Vehicle Found
useGSAP(()=>{
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current, {
      transform:"translateY(0)"
    })
  
  }else{
    gsap.to(vehicleFoundRef.current, {
      transform:"translateY(100%)"
    })
    
}}, [vehicleFound])

//Waiting For Driver
useGSAP(()=>{
  if(watingForDriver){
    gsap.to(watingForDriverRef.current, {
      transform:"translateY(0)"
    })
  
  }else{
    gsap.to(watingForDriverRef.current, {
      transform:"translateY(100%)"
    })
    
}}, [watingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      {/* //Important part  */}
      <div className=' flex flex-col absolute top-0 justify-end w-full h-screen'>
       
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef}
          onClick={() => setPanelOpen(false)}
           className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
            </h5>
        <h4 className='text-3xl font-semibold'>Find Trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
     

        <div className="line absolute h-16 w-1 top-[40%]  left-10 bg-gray-700 rounded-full"></div>
          <input 
          onClick={() => {
            setPanelOpen(true)
            setActiveField('pickup')
          }}
          type="text"
          value={pickup}
          onChange={handlePickupChange}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
          placeholder='Add a pick-up Location'
           />

           <input 
            onClick={() => {
              setPanelOpen(true)
              setActiveField('destination')
            }}
           type="text"
           value={destination}
          onChange={handleDestinationChange}
           className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
           placeholder='Enter Your Destination' 
           />
        </form>
        <button
        onClick={findTrip}
         className='w-full bg-black text-white py-3 rounded-lg mt-5'>
          Find Trip
        </button>
        </div>

        {/* //Ye Hidden Div hai */}
        <div ref={panelRef} className=' bg-white p-5 '>
          {/* is Locationsearchpanel me hame sirf setVehiclepanel ko aur setPanelOpen ko hi pass karna hai aur LocastionserachPanel me hame props ke through receive karna hai */}
           <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
           />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        {/*setConfirmRidePanel tab open hoga jab user vehicle ko select karlega */}
        {/*isme select vehicle auto,car, moto */}
         <VehiclePanel
          selectVehicle={setVehicleType} 
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}   
          />
      </div>
          
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14'>
         <ConfirmRide
         createRide={createRide}
         pickup={pickup}
         destination={destination}
         fare={fare}
         setConfirmRidePanel={setConfirmRidePanel}
         vehicleType={vehicleType}
         setVehicleFound={setVehicleFound}
          />
      </div>

     { /* Vehicle Found */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14'>
         <LookingForDriver
         createRide={createRide}
         pickup={pickup}
         destination={destination}
         fare={fare}
         vehicleType={vehicleType}
        setVehicleFound={setVehicleFound}
          />
      </div>

      <div ref={watingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-14'>
         <WaitingForDriver
         ride = {ride}
         setVehicleFound={setVehicleFound}
         setWaitingForDriver={setWaitingForDriver}
          />
      </div>

    </div>
  )
}

export default Home