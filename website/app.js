/* Global Variables */
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=23042c9f0ce73619cd12fb97eb9c3d2c
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&APPID=23042c9f0ce73619cd12fb97eb9c3d2c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//when the generate button is clicked
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    e.preventDefault();
    // get user input
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, key)
    .then(function (data){
        // Add data to POST request
        postData('/addData', {temperature: data.main.temp, date: newDate, content: feelings })
        //Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}

// Async GET
const getWeather = async (baseURL, zipCode, key)=>{
    const response = await fetch(baseURL + zipCode + key);
    try {
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            temperature: data.temperature,
            date: data.date,
            user_response: data.content
        })
      })

      try {
        const newData = await req.json();
        return newData;
      }
      catch (error) {
        console.log(error);
      }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        console.log('error', error);
    }
}