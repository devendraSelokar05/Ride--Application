import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  // console.log(props)

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  };

  //Sample array for location
  // const location = [
  //   "248, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
  //   "25C, Near selokar's Cafe, Sheryians Coding School, Bhopal",
  //   "19B, Near Singhnaya's Cafe, Sheryians Coding School, Bhopal",

  // ]

  return (
    <div>
      {/* sample data of locations */}
      {suggestions?.length > 0 ? (
        suggestions.map((elem, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(elem)}
            className="flex border-2 p-3 rounded-xl my-2 border-gray-300 active:border-black items-center justify-start gap-4"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-2-line"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
