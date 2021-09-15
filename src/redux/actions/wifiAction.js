import {    
    SET_WIFI_STATUS,
    FORGET_WIFI_NETWORK,
    SET_WIFI_NETWORKS
  } from "../types";
import ws from "../../util/connection";

  


/**
 * get the currently connected ssid, reader remembered ssids, and available ssids
 * @returns Wifi status object
 */
export const getWifiList = () => (dispatch) => {
    dispatch({type:SET_WIFI_STATUS,payload:{loading:true,error:false,availableNetworks:[]}})
    ws.get({ action: "peripheral.getWifiSSID" })
    .then(data=>{
      dispatch({type:SET_WIFI_STATUS,payload:{ssid:data, mode:data?'client':'ap'}})
      return ws.get({ action: "peripheral.listSavedWifi" })
    })
    .then(data=>{
      dispatch({type:SET_WIFI_STATUS,payload:{knownNetworks:data}})
      return ws.get({ action: "peripheral.scanWifi" },10000)    
    })
    .then(data=>{
      dispatch({type:SET_WIFI_STATUS,payload:{availableNetworks:data}})
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:false}})
    })
    .catch((err)=>{
      console.log(err)
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:true}})
    })
  }
  
  
  /**
   * Set the reader wifi mode to ap or client
   * @param {string} mode 'ap' or 'client'
   * @returns 
   */
  export const switchWifiMode = (mode) => (dispatch) => {
    
    dispatch({type:SET_WIFI_STATUS,payload:{mode}})
  
    // ws.get({action:'peripheral.setWifiMode',mode})
    // .then(data=>{    
    //   dispatch({type:SET_WIFI_STATUS,payload:{ssid:'',mode, message:"Wifi "}})
  
    //   ws.close()
    // })
    // .catch(err=>{
    //   console.log(err)
    //   dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:true}})
    // })
  
  }
  
  /**
   * Connect to a new Wifi Network
   * @param {string} ssid a new ssids to connect to
   * @param {string} pwd password for the new ssid
   * @returns 
   */
  export const connectWifi = (ssid,pwd) => (dispatch) => {
    
    ws.get({action:'peripheral.setWifiPassword',ssid,pwd})
    .then(data=>{
      
      ws.close()
    })
    .catch(err=>{
      console.log(err)
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:true}})
    })
  }
  
  /**
   * Remove an alredy knwon SSID.
   * @param {string} ssid an SSID to remove from saved list
   * @returns 
   */
  export const forgetWifi = (ssid) => (dispatch,getState) => {
    const currentSSID = getState().data.wifiStatus.ssid
    ws.get({action:'peripheral.removeWifiPassword',ssid})
    .then(data=>{
      dispatch({type:FORGET_WIFI_NETWORK,payload:ssid})
      if (currentSSID === ssid) {
        ws.close()
      }    
    })
    .catch(err=>{
      console.log(err)
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:true}})
    })
  }
  
  /**
   * set a wifi to be prioritized when connecting.
   * @param {string} ssid 
   * @returns 
   */
  export const setWifiPriority = (ssid) => (dispatch,getState) => {    
    const currentSSID = getState().data.wifiStatus.ssid    
    ws.get({action:'peripheral.setWifiPriority',ssid})
    .then(data=>{    
      if (currentSSID !== ssid) {
        ws.close()
      }    
    })
    .catch(err=>{
      console.log(err)
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:true}})
    })
  }