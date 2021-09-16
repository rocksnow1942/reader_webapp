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
  export const switchWifiMode = (mode) => (dispatch,getState) => {
    const ssid = getState().data.wifiStatus.ssid

    dispatch({type:SET_WIFI_STATUS,payload:{mode}})
    if (mode==='ap' && ssid){
      // if user swithces to ap mode and there is a ssid, then set reader to ap mode.
      ws.get({ action: "peripheral.setWifiMode", mode: "ap" })
      .then(data=>{
        dispatch({type:SET_WIFI_STATUS,payload:{mode:'ap',ssid:''}})
        ws.close()
      })
      .catch(err=>{
        dispatch({type:SET_WIFI_STATUS,payload:{mode:'client',error:'Error setting Wi-Fi mode. Please power cycle the reader and try again.'}})
      })
    }  
  }
  
  /**
   * Connect to a new Wifi Network
   * @param {string} ssid a new ssids to connect to
   * @param {string} pwd password for the new ssid
   * @returns 
   */
  export const connectWifi = (ssid,pwd) => (dispatch,getState) => {    
    ws.get({action:'peripheral.setWifiPassword',ssid,pwd})
    .then(data=>{
      // send a snapbar to the user

      ws.close()
    })
    .catch(err=>{
      console.log(err)
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:"Error connecting to Wi-Fi"}})
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
      dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:'Error configuring Wi-Fi Settings'}})
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


  /**
   * set the password for an wifi, without connection to it.
   * @param {string} ssid Wi-Fi SSID
   * @param {string} psk Wi-Fi password
   * @returns 
   */
export const setWifiPassword = (ssid,psk)=>dispatch=>{
  ws.get({action:'peripheral.updateWifiPassword',ssid,pwd:psk})
  .then(data=>{
      dispatch({type:SET_WIFI_NETWORKS,payload:{ssid,psk}})
  })
  .catch(err=>{
    console.log(err)
    dispatch({type:SET_WIFI_STATUS,payload:{loading:false,error:true}})
  })
}