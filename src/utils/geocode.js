const request=require('request')
const geocode=(address,callback)=>{
    const api_key=process.env.MAPBOXAPIKEY
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+api_key+'&limit=1'
    
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }
        else if(body.features.length==0){
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            const resp=body.features[0]
            callback(undefined,{
                latitude:resp.center[1],
                longitude:resp.center[0],
                location:resp.place_name
            })

        }

    })
}

module.exports=geocode
