import React from 'react'

const WaitingForDriver = (props) => {
    console.log(props)
  return (
    <div>
        <h5
        onClick={() => {
            props.setWaitingForDriver(false)
        }}
        className='p-3 text-center w-[93%] absolute top-0'>
        <i className="text-2xl  ri-arrow-down-wide-line"></i>
        </h5>     
        <div className='flex items-center justify-between'>
            <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
            <div>
                <h3 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h3>
                <h4 className='text-xl font-semibold -mt-2 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-600 font-medium'>Maruti Suzuki Ciaz</p>
                <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>

            </div>
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
                 <i className=" text-xl ri-map-pin-2-fill"></i>

                <div>
                <h3 className='text-lg font-semibold'>562/11-A</h3>
                <p className='text-sm text-gray-600 -mt-1 font-semibold'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-cente gap-3 p-3'>
            <i className=" text-lg ri-money-rupee-circle-fill"></i>

                <div>
                <h3 className='text-lg font-semibold'> ₹{props.ride?.fare}</h3>
                <p className='text-sm text-gray-600 -mt-1 font-semibold'>Cash</p>
                </div>
            </div>
    </div>

    </div>
</div>
  )
}

export default WaitingForDriver