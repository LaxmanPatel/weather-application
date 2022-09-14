console.log("Clientside Javascript file loaded");


//Get Addresses

const form = document.querySelector("form");
const address = document.querySelector("#search").value;
const data1 = document.querySelector("#location")
const result1 = document.querySelector("#forecast-1")
const result2 = document.querySelector("#forecast-2")



form.addEventListener("submit", (e) => {
    const address = document.querySelector("#search").value;
    data1.textContent = "Loading...";
    result1.textContent = "";
    result2.textContent = "";
    console.log(address);
    e.preventDefault();
    fetch(`http://localhost:3000/weather?search=${encodeURIComponent(address)}`)
        .then((data) => data.json())
        .then(res => {
            console.log(res);
        //   data1.textContent = res;
        if(res.error){
            data1.textContent = res.error; 
        }
        else{
            data1.textContent = res.address;
            result1.textContent = res.forecast.wheather;
            result2.textContent = `Current Temp is ${res.forecast.currentTemp} and its feels like ${res.forecast.tempFeelsLike}`
        }
        })
       
})

