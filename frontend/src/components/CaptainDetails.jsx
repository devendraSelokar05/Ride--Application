import React, { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext';
const CaptainDetails = (props) => {
  const { captain } = useContext(CaptainDataContext);
  // console.log(captain);


 
  // console.log(captain?.fullname?.firstname);
  return (
    <div>
       <div className='flex items-center justify-between'>
        <div className=' flex items-center justify-between gap-4'>
          <img className='h-14 w-14 rounded-full object-cover' src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg" alt="" />
          <h4 className='text-lg font-semibold'>{captain.fullname.firstname+" " +captain.fullname.lastname}</h4>
        </div>

        <div>
          <h4 className='text-lg font-semibold'>₹500</h4>
          <p className='text-sm text-gray-400'>Earned</p>
        </div>
      

      </div>
        <div className='flex justify-evenly items-start gap-4 p-5 bg-gray-100 mt-6 '>
            <div className='text-center'>
              <i className="text-3xl font-thin  ri-timer-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>

            <div className='text-center'>
            <i className="text-3xl font-thin  ri-speed-up-line"></i>
              <h5 className='text-lg font-medium'>10</h5>
              <p className='text-sm text-gray-600'>Trips</p>
            </div>
             
            <div className='text-center'>
              <i className="text-3xl font-thin  ri-booklet-line"></i>
              <h5 className='text-lg font-medium'>10</h5>
               <p className='text-sm text-gray-600'>Hours Online</p>            
            </div>
            
        </div>
    </div>
  )
}

export default CaptainDetails