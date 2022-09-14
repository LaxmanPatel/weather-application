const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weatherDetail = require("./utils/weatherDetail");

const app = express();

//Define path for express config
const publicDir = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/pages");
const partialsPath = path.join(__dirname,"../templates/partials");

//Setup handlebar engine and view location
app.set('view engine','hbs');
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

//setup specific directory to serve
app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',{
        name:"Laxman Patel",
        title:"Wheather App",
    })
})

app.get('/about',(req,res)=>{   
    res.render('about',{
        name:"Laxman Patel",
        title:"Wheather"
    })
})

app.get('/help',(req,res)=>{   
    res.render('help',{
        name:"Laxman Patel",
        title:"Help"
    })
})

app.get('/weather',(req,res)=>{   
    console.log("req",req.query.search)

    geocode(req.query.search,(error,result)=>{
        if(error){
            return res.send({"error":error})
        }
        weatherDetail(result.latitude,result.longitude,(error,data)=>{
            if(error){
                return res.send({"error":error})
            }
            res.send(
                {forecast:data,
                    address: result.location,
                    location:req.query.search
                });
        })
    })
})

app.get('/help/*',(req,res)=>{   
    console.log(req.query);
    res.render('helpError',{
        name:"Laxman Patel",
        title:"Help 404",
        error:"This help is not found",
    })
 
})

app.get('*',(req,res)=>{   
    res.render('404',{
        name:"Laxman Patel",
        title:"404",
        error:"This page is not found",
    })
})


app.listen(3000,()=>{
    console.log("App started");
})