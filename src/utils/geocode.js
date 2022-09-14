const request = require("request");

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?limit=1&access_key=54204a469630b4a43c425cd03b0a3ddc&query=${encodeURIComponent(address)}`;
    request({ url: url, json: true },(error, response)=>{
        if(error){
            callback("Unable to connect to Geolocation services!",undefined);
        }else if(response.body.data && response.body.data.length === 0){
            callback("Unable to find the Location for provided Input",undefined);
        }
        else if(response.body.data){
            const {name,label,latitude,longitude} =response.body.data[0];
            callback(undefined,{
                location: label,
                latitude:latitude,
                longitude:longitude,
            })
        }
        else{
            callback("Unable to connect to Geolocation services!",undefined);
        }
    })

}

module.exports = geocode;