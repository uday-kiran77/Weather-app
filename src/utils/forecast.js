const request=require('request')

const forecast=(lat,long,callback)=>{
    const api_key="Weatherstack_API_KEY"
    const url="http://api.weatherstack.com/current?access_key="+api_key+"&query="+lat+','+long+'&units=m'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to forecast services!',undefined)
        }
        else if(body.error){
            callback('unable to find the location',undefined)
        }
        else{
            const data={
                current:body.current,
                location:body.location

            }
            callback(undefined,data)
           // callback(undefined,body.current.weather_descriptions[0]+". The current temperature is "+body.current.temperature+" It feels like "+ body.current.feelslike+".")
            //callback(undefined,response.body.current)
        }

    })
}



module.exports=forecast
