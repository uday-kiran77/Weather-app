
const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.getElementById('messageOne')
const messageTwo=document.getElementById('messageTwo')
const errorOne=document.getElementById('error')

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    
    const address=search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    errorOne.innerHTML=""



    fetch('/weather?location='+address).then((response)=>{

        response.json().then((data)=>{

        if(data.error){
            errorOne.innerHTML=data.error
            messageOne.innerHTML=""
            messageTwo.innerHTML=""

        }
        else{
                 console.log(data.forecast)
                 const forecastData=data.forecast.current
                 const forecastinfo="Currently weather is <b>"+forecastData.weather_descriptions+"</b> And the Temperature is <b>"+forecastData.temperature+"&#176; C</b> and it feels like <b>"+forecastData.feelslike+"&#176; C</b>"
                // console.log(data.location)
                messageOne.innerHTML=forecastinfo
                messageTwo.innerHTML="Location: <b>"+data.location+"</b>"
                
                
                document.querySelector('#weather').style.opacity=1

                document.querySelector('#wind_speed').innerHTML="Wind Speed : "+forecastData.wind_speed
                document.querySelector('#wind_dir').innerHTML="Wind Direction : "+forecastData.wind_dir
                document.querySelector('#precip').innerHTML="Precip : "+forecastData.precip
                document.querySelector('#humidity').innerHTML="Humidity : "+forecastData.humidity
                document.querySelector('#wind_degree').innerHTML="Wind Degree : "+forecastData.wind_degree
                document.querySelector('#local_time').innerHTML="Local Time : "+data.forecast.location.localtime
                document.querySelector('#time_zone').innerHTML="Time Zone : "+data.forecast.location.timezone_id

            }
        })
    })   
})



function myFunction(link) {
    var alert = confirm("You will be redirected to external link.");
    if (alert) {
        window.location.replace(link);
    } else {
      txt = "You pressed Cancel!";
    }
    console.log(txt)
  }