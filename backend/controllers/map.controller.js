import {getAddressCoordiante} from "../services/maps.service.js";
import { getDistanceTime } from "../services/maps.service.js";
import { getAutoCompleteSuggestions } from "../services/maps.service.js";
import { validationResult } from "express-validator";

//getCoordinates of the location which we enter
export const getCoordinates = async (req, res) => {
  const { address } = req.query;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const coordinates = await getAddressCoordiante(address);
    res.status(200).json(coordinates);
  } catch (error) {
    // console.error('Error fetching coordinates:', error);
    res.status(404).json({
      mesaage: "Coordinates not found",
    });
  }
};


//getDistanceTime between two locations

export const getDistanceandtime = async (req, res) => {

  try {
 
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { origin, destination } = req.query;
//     console.log('Origin:', req.query.origin);
// console.log('Destination:', req.query.destination);

    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "Internal Srver Error"
    })
  }
}


//getAutocCompleteSuggestions

export const getAutoSuggestion = async(req, res, next) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {input} = req.query; 

    if (!input || input.trim().length < 3) {
      return res.status(400).json({
        message: "Input must be at least 3 characters long"
      });
    }

    const suggestions = await getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
    
  } catch (error) {
    console.error('Auto Suggestion Error:', error);
    res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    })
  }
}
