const axios = require('axios');

export const getHistory = async function(params) {
    return await axios.post("/api/history",params)
};

export const getDashboard = async function() {
    try {
        return await axios.get("/api/dashboard")
      } catch (error) {
        return null
      }
    //return await axios.get("/api/dashboard")
};

export const getSettings = async function() {    
    let response = await axios.get("/api/settings");
    return response.data;    
};

export const saveSettings = async function(data) {
    let response = await axios.post("/api/settings",data);
    return response.data;

};

export const getListSerialPort = async function() {    
    let response = await axios.get("/api/serial-port");
    console.log('ØØØ>   ',response.data)
    return response.data;    
};