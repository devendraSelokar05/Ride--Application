import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
        <h5
        onClick={() => {
            props.setConfirmRidePanel(false)
        }}
        className='p-3 text-center w-[93%] absolute top-0'>
          <i className="text-2xl  ri-arrow-down-wide-line"></i>
          </h5>     
          <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>

        <div className='flex gap-2 items-center flex-col justify-center'>
            <img className='h-24' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
      

            <div className='w-full mt-4'>
                    <div className='flex items-cente gap-3 p-3 border-b-2'>
                    <i className=" text-lg ri-map-pin-user-fill"></i>

                        <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1 font-semibold'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-cente gap-3 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-2-fill"></i>

                        <div>
                        <h3 className='text-lg font-semibold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1 font-semibold'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-cente gap-3 p-3'>
                    <i className=" text-lg ri-money-rupee-circle-fill"></i>

                        <div>
                        <h3 className='text-lg font-semibold'> ₹{props.fare[props.vehicleType]}</h3>
                        <p className='text-sm text-gray-600 -mt-1 font-semibold'>Cash Cash</p>
                        </div>
                    </div>
                    <button onClick={()=>{
                    props.setVehicleFound(true)
                    {/*here we are closing the panel */}
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='w-full mt-4 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>

            
                
        </div>
    </div>

  )
}

export default ConfirmRide