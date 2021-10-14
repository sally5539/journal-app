/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let cityname = ',us&units=metric'
let apiKey = '&appid=03b51151c5391a8d5decaf0559ae685e';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// to retrieve the data from the api
const retrieveData = async (URL= '') =>{
    const request = await fetch(URL);
    try {
        // Transform into JSON
        const allData = await request.json();
        return allData ;
    }
    catch(error) {
        console.log(`error + ${URL}`, error);
        // appropriately handle the error
    }
};
// to get the data saved in server.js
const getData = async (url = '') =>{
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json();
        document.getElementById('date').innerHTML = `<p>Date: ${allData.date}</p>`;
        document.getElementById('temp').innerHTML = `<p>Temp: ${allData.temperature}</p>`;
        document.getElementById('content').innerHTML = `<p>Feelings: ${allData.userResponse}</p>`;
    }
    catch(error) {
        console.log(`error + ${url}`, error);
        // appropriately handle the error
    }
}
// to post retrieved data to server.js
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};



// event listener to the button
document.getElementById('generate').addEventListener('click' , function(){
    let zip = document.getElementById('zip').value;
    let userresponse = document.getElementById('feelings').value;
    retrieveData(`${baseURL}${zip}${cityname}${apiKey}`).then(function (data){
        postData('/add' , {temperature : data.main.temp , date : newDate , userResponse : userresponse})
            .then(getData('/all'));
    });
} );
