
import createClient from '@singlebase/singlebase-js';

const sbcUrl = process.env.NEXT_PUBLIC_SBC_URL;
const sbcToken = process.env.NEXT_PUBLIC_SBC_TOKEN;
 

export const singlebaseClient = async (token) => {
  const SBC_CONFIG  = {
    api_url: sbcUrl,
    api_key: sbcToken,
    options: {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }
    
  }
  const singlebase = createClient(SBC_CONFIG);

  return singlebase
}
// Configuration

export const singlebase = async () => {
  const SBC_CONFIG  = {
    api_url: sbcUrl,
    api_key: sbcToken,
    
  }
  
  const sbc = createClient(SBC_CONFIG);

  return sbc;
  
}





