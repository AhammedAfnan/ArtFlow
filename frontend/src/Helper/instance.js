// to make HTTP requests 
// keep request and response hadnling logic clean and centralized

import URL from '../config/api'
import axios from 'axios';
const user = axios.create({baseURL:URL.BASE_URL})

// eente story enganen chelyeng, aaran user oo admin oo artist oo aaran oork ille access kodkan . ippo userRequest nte ullilek banneng
// register cheythappo create aakiye token user.defaul..... eel bekkum . ennit error onnu illang .. onsuccess variable k option aayt nammmo
// edthe arg ade pole response aayt variable bekkum. error engil error aa error variable l bekkum . ennit last ad ansarichitt return cheyyu 
// user request bilchedthekanne

export const userRequest = async ({ ...options }) => {
    //the Authorization header
    user.defaults.headers.common.Authorization = JSON.parse(  
      localStorage.getItem("UserToken")
    );
    const onSuccess = (response) => response;
    const onError = (error) => {
      console.log("axios interceptor", error);
      return error;
    };
    return user(options).then(onSuccess).catch(onError);
  };

  export const ArtistRequest = async ({...options }) => {
    // the Authorization header
    user.defaults.headers.common.Authorization = JSON.parse(
      localStorage.getItem("artistToken")
    );
    const onSuccess = (response) => response;
    const onError = (error) => {
      console.log('axios interceptor',error);
      return error;
    };
    return user(options).then(onSuccess).catch(onError)
  }

  export const adminRequest = async ({ ...options }) => {
    user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("adminToken")}`;
    const onSuccess = (response) => response;
    const onError = (error ) => {
      console.log("axios interceptor",error)
      return error;
    }
    try {
      const response = await user(options)
      return onSuccess(response)
    } catch (error) {
      return onError(error)
    }
  }