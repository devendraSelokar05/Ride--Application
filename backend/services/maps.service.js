import axios from 'axios';
import { Captain } from '../models/Captain.model.js';

export const getAddressCoordiante = async (address) => {
  try {
    const apiKey = process.env.GOMAPS_MAPS_API_KEY;
    const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json`, {
      params: {
        address: address,
        key: apiKey
      }
    });
    console.log('Response Status:', response.status);
    // console.log('Response Data:', JSON.stringify(response.data, null, 2));
    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng
      };
    } else {
      throw new Error('No coordinates found for the given address');
    }
  } catch (error) {
    // console.error('Error fetching coordinates:', error);
    throw error;
  }
};

//getDistanceTime
export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Both origin and destination are required');
    }

    const apiKey = process.env.GOMAPS_MAPS_API_KEY;

    // console.log('Distance Time Request:', { 
    //     origin, 
    //     destination, 
    //     apiKey: apiKey ? 'Present' : 'Missing' 
    // });

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    // console.log('Full Request URL:', url);

    try {
        const response = await axios.get(url);
        // console.log('Full Response:', JSON.stringify(response.data, null, 2));

        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                // console.warn('No routes found for:', { origin, destination });
                throw new Error('No routes found');
            }

            return response.data.rows[0].elements[0];
        } else {
            console.error('API Error:', response.data);
            throw new Error(`Unable to fetch distance and time: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.response ? error.response.data : error.message);
        throw error;
    }
}

//autocompleteSuggestion
export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('query is required');
}

const apiKey = process.env.GOMAPS_MAPS_API_KEY;
const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

try {
    const response = await axios.get(url);
    // console.log(response.data);
    if (response.data.status === 'OK') {
      return response.data.predictions.map(prediction =>prediction.description);
        
    } else {
        throw new Error('Unable to fetch suggestions');
    }
} catch (err) {
    // console.error(err);
    throw err;
}

}



export const getCaptainInTheRadius = async (ltd, lng, radius) => {
  const captains = await Captain.find({
    location: {
      $geoWithin: {
          $centerSphere: [ [ ltd, lng ], radius / 6371 ]
      }
  }
  });

  return captains;
  
  }
