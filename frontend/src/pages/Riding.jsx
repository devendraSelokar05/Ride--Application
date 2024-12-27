import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      {/* redirecting to home page */}
      <Link to="/home" className="fixed bg-white flex items-center justify-center rounded-full right-2 top-2 h-10 w-10 ">
      <i className="ri-home-5-line"></i>
      </Link>
        
      {/*map image */}
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div>
            <h3 className="text-lg font-medium">Devendra</h3>
            <h4 className="text-xl font-semibold -mt-2 -mb-1">MH 31 AZ 5679</h4>
            <p className="text-sm text-gray-600 font-medium">
              Maruti Suzuki Ciaz
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center flex-col justify-center">
          <div className="w-full mt-4">
                  {/* <div className="flex items-cente gap-3 p-3 border-b-2">
                    <i className=" text-lg ri-map-pin-user-fill"></i>

                    <div>
                      <h3 className="text-lg font-semibold">562/11-A</h3>
                      <p className="text-sm text-gray-600 -mt-1 font-semibold">
                        kankariya Talab, Ahemdabad
                      </p>
                    </div>
                  </div> */}

                <div className="flex items-cente gap-3 p-3 border-b-2">
                  <i className=" text-xl ri-map-pin-2-fill"></i>

                  <div>
                    <h3 className="text-lg font-semibold">562/11-A</h3>
                    <p className="text-sm text-gray-600 -mt-1 font-semibold">
                      kankariya Talab, Ahemdabad
                    </p>
                  </div>
                </div>

                <div className="flex items-cente gap-3 p-3">
                  <i className=" text-lg ri-money-rupee-circle-fill"></i>
                      <div>
                        <h3 className="text-lg font-semibold"> ₹193.20</h3>
                        <p className="text-sm text-gray-600 -mt-1 font-semibold">
                          Cash
                        </p>
                      </div>
                </div>
          </div>
        </div>
        <button className="w-full mt-4 bg-green-500 text-white font-semibold p-2 rounded-lg">Make A Payment</button>
      </div>
    </div>
  );
};

export default Riding;
