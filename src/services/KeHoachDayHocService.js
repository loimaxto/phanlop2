import axios from 'axios';
// import '../config/apiConfig';
// import { nganhData } from '../dumpData';

export const getNganhById = async id => {
  try {
    //fake request
    // let nganh = nganhData.find(item => item.id == id);
    // let response = await new Promise(resolve =>
    //   setTimeout(() => {
    //     resolve({
    //       data: {
    //         ...nganh,
    //       },
    //     });
    //   }, 1000)
    // );

    // const response = await axios.get(`${API_BASE_URL}/ke-hoach-day-hoc/1`);
    return null;
  } catch (error) {
    console.error('Error fetching Ke Hoach Day Hoc data:', error);
    throw error;
  }
};

export default {
  getNganhById,
};
