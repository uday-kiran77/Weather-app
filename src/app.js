const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')




const app=express()
const port = process.env.PORT || 3000
//define paths for express config
const publicdirectorypath=path.join(__dirname,'../public',)
const viewsPath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

console.log(partialspath)

//setup handlebars engine and viwes engine
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialspath)

//setup static direciory to serve
app.use(express.static(publicdirectorypath))


app.get('',(req,response)=>{
    response.render('index',{
        title:'weather app',
        name:'uday'

    })
})


app.get('/weather',(req,response)=>{
  
    if(!req.query.location){
        return response.send({
            error:'you must provide a address'
        })
    }
  
    geocode(req.query.location,(error,{latitude,longitude,location}={})=>{
        if(!error)
        {
            forecast(latitude,longitude, (error, forecastData) => {
        
            if(error){
                return response.send({
                    error:error
                })
            }
            else{
            return response.send({
                forecast:forecastData,
                location:location
            })}
                
        })
        }
        else{
            return response.send({
                error
            })
        }
    })
   
})




app.get('*',(req,response)=>{
        response.render('404',{
            title:'Oops!',
        name:'uday',
            error:'Page not found'
        })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})