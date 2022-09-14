const request = require("request");

const weatherDetail = (lat,lang,callback) => {
      const url = `http://api.weatherstack.com/current?access_key=356d4e3402712226de55946b547a9299&query=${lat},${lang}`;
      request({url:url,json:true},(error,res)=>{
        if(error){
            callback("Unable to connect to wheather App services!",undefined);
        } else if(res.body.error){
            callback("Unable to find LOCATION",undefined);
        } else{
            const {temperature,feelslike,weather_descriptions} = res.body.current;
            callback(undefined,{
                "wheather" : weather_descriptions[0],
                "currentTemp" : temperature,
                "tempFeelsLike" : feelslike,
            });
      }
    })
}


module.exports = weatherDetail;