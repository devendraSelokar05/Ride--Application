import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUpPanel = (props) => {
    
    // console.log(props);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params:{
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
     
        })
        console.log(response.data)

        if(response.status === 200){
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding  { state: { ride: props.ride }')
        }

    }
  return (
    <div>
        
         <h5
        onClick={() => {
            props.setRidePopupPanel(false)
          
        }}
        className='p-3 text-center w-[93%] absolute top-0'>
          <i className="text-2xl  ri-arrow-down-wide-line"></i>
          </h5>     
          <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>

            <div className='flex items-center justify-between rounded-lg border-2 border-yellow-400 p-4 mt-'>
                <div className='flex items-center gap-3'>
                    <img className='w-14 rounded-full h-14 object-cover ' src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.ride?.distance.toFixed(1)} KM</h5>
            </div>

        <div className='flex gap-2 items-center flex-col justify-center'>

    
            <div className='w-full mt-4'>
                    <div className='flex items-cente gap-3 p-3 border-b-2'>
                    <i className=" text-lg ri-map-pin-user-fill"></i>

                        <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1 font-semibold'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div
                     className='flex items-cente gap-3 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>

                        <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1 font-semibold'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-cente gap-3 p-3'>
                    <i className=" text-lg ri-money-rupee-circle-fill"></i>

                        <div>
                        <h3 className='text-lg font-semibold'> ₹{props.ride?.fare}</h3>
                        <p className='text-sm text-gray-600 -mt-1 font-semibold'>Cash Cash</p>
                        </div>
                    </div>
                    <div className="mt-6 w-full">
                        <form onSubmit={submitHandler}>

                            <input 
                            className="bg-[#eee] px-6 py-4 text-base font-mono rounded-lg w-full mt-5" 
                            type="number" 
                            value={otp}
                            onChange={(e)=>{
                                setOtp(e.target.value)
                            }}
                            placeholder="Enter OTP"
                            />
                        <button className='w-full flex justify-center mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>

                        <button onClick={()=>{
                            {/*agr confirm pannel band hoga tho ride pannel bhi usi ke saath close ho jayega */}
                                 props.setConfirmRidePopupPanel(false)
                                 props.setRidePopupPanel(false)
                           
                            //  console.log(props)
                    }} className='w-full mt-2 bg-red-500 text-white font-semibold p-3 rounded-lg'>Cancel</button>
                        </form>
                    </div>
            </div>

            
                
        </div>
    </div>
  );
};

export default ConfirmRidePopUpPanel;
