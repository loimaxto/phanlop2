import axios from 'axios';
import { nganhData } from '../dumpData';

import { API_URL } from '../config/apiConfig';

export const getNganhById = async id => {
  try {
    //fake request
    let nganh = nganhData.find(item => item.id == id);
    let response = await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          data: {
            ...nganh,
          },
        });
      }, 1000)
    );

    // const response = await axios.get(`${API_URL}/ke-hoach-day-hoc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Ke Hoach Day Hoc data:', error);
    throw error;
  }
};

export default {
  getNganhById,
};
