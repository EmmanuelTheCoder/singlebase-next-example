"use client"

import createClient from '@singlebase/singlebase-js';

const sbcUrl = process.env.NEXT_PUBLIC_SBC_URL;
const sbcToken = process.env.NEXT_PUBLIC_SBC_TOKEN;


 
 

//const getAuth =  localStorage.getItem("user-auth-token") 

//console.log("get auth", getAuth)
  
const auth = typeof window !== "undefined" ? localStorage.getItem("user-auth-token") : ""


const singlebaseClient = () => {
  const SBC_CONFIG  = {
    api_url: sbcUrl,
    api_key: sbcToken,
    options: {
      headers: {
        "Authorization" : `Bearer ${auth}`
      }
    }
    
  }
  const singlebase = createClient(SBC_CONFIG);

  return singlebase
}
// Configuration
const SBC_CONFIG  = {
  api_url: sbcUrl,
  api_key: sbcToken,
  options: {
    headers: {
      "Authorization" : `Bearer ${auth}`
    }
  }
  
}
export const singlebase = createClient(SBC_CONFIG);





