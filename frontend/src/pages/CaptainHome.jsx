import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";
import { SocketContext } from "../context/socketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null)
  const [distance, setDistance] = useState(null)
  // const navigate = useNavigate()
  //ref
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  //sockets
  const { socket } = useContext(SocketContext);

  //captain
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    // console.log(captain)
    socket.emit('join', {
      userId: captain._id, 
      userType: 'captain'})

      const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

            //   console.log({
            //     userId: captain._id,
            //     location: {
            //         ltd: position.coords.latitude,
            //         lng: position.coords.longitude
            //     }
            // })

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInerval = setInterval(updateLocation, 10000)
    updateLocation()

  }, [])

  socket.on('new-ride', (data)=>{
    // console.log(data)
    setRide(data)
    // setDistance(data.distance)
    setRidePopupPanel(true)
    console.log(data)
  })
  

  const confirmRide = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {

      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    
    })
    setConfirmRidePopupPanel(true)
    setRidePopupPanel(false)
    console.log(response.data)
  }
 
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
        // opacity: 1
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
        // opacity: 0
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
        // opacity: 1
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
        // opacity: 0
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* redirecting to home page */}
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />

        <Link
          to="/captain-home"
          className=" bg-white flex items-center justify-center rounded-full  h-10 w-10 "
        >
          <i  className=" text-xl ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/*map image */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-2/5 p-4">
        <CaptainDetails
      
        />
      </div>

      {/*ride popup panel*/}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translet-y-full  bg-white px-3 py-6 pt-14"
      >
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          distance={distance}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}

        />
      </div>

      {/*confirm ride popup panel*/}

      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translet-y-full  bg-white px-3 py-6 pt-14">
        <ConfirmRidePopUpPanel
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
