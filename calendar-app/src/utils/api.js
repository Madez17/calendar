import { URL, APIKEY } from '../config/config'
const wheather = async () => {
    try {
      const result = await fetch(`${URL}`);
      return result.data;
    } catch(error) {
      console.log(`Error: ${error}`)
    }
};


export default wheather;