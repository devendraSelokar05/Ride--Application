import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)

  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
    
      });
    }
  }, [finishRidePanel]);

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
          <i className=" text-xl ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/*map image */}
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

        <div className="h-1/5 p-5 flex items-center justify-between relative bg-yellow-400"
        onClick={()=>{
          setFinishRidePanel(true)
        }}
        >
            <h5
            onClick={() => {

            }}
            className='p-1 text-center w-[93%] absolute top-0'>

              <i className="text-3xl  ri-arrow-up-wide-line"></i>

              </h5>     
            <h4 className="text-2xl font-semibold">4 KM Away</h4>
            <button className=" bg-green-600 text-white font-semibold p-3 px-8  rounded-lg">Complete Ride</button>
        </div>

        <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translet-y-full  bg-white px-3 py-6 pt-14"
      >
        <FinishRide
        setFinishRidePanel={setFinishRidePanel}
       
        />
      </div>

    </div>
  );
};

export default CaptainRiding;
