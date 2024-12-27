import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div>
         <h5
        onClick={() => {
            props.setFinishRidePanel(false)
          
        }}
        className='p-3 text-center w-[93%] absolute top-0'>
          <i className="text-2xl  ri-arrow-down-wide-line"></i>
          </h5>     
          <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>

            <div className='flex items-center justify-between rounded-lg bg-yellow-300 p-4 mt-'>
                <div className='flex items-center gap-3'>
                    <img className='w-14 rounded-full h-14 object-cover ' src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.fullname.lastname}</h2>
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

                    <div className='flex items-cente gap-3 p-3 border-b-2'>
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
                        

                          
                        <Link to ='/captain-home' onClick={()=>{
                          
                
                        }} className='w-full flex justify-center mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</Link>

                        
                    </div>
            </div>

            
                
        </div>
    </div>
  )
}

export default FinishRide