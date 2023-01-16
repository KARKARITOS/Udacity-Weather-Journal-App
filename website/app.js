/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
//This URL is for retrieving the weather info from it's API (NOTE THAT: it will be by default for US)
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// My personal API key for OpenWeatherMap API
// NOTE THAT &units-metric for getting the Celsius Temperature
const apiKey =",&appid=05edff610738d288c21e0e9d2a6886d6&units=metric";

// This URL server to POST data
const server = "http://127.0.0.1:8000";

// This will show the error when it's empty or undefined value or name written
const error = document.getElementById("error"); 

// Generate all the functions
const generateData = () => {
    //getting the value after clicking on the button
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    // now the getWeatherData will return promise
    getWeatherData(zip).then((data) => {
        if(data){
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;
            const info = {
                newDate,
                city,
                temp: Math.round(temp),// we use this to get an integer value
                description,
                feelings,
            };
            postData(server + "/add",info);
            updatingUI();
            document.getElementById('entry').style.opacity = 1;
        }        
    });
};

// now we will make an event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click",generateData);

// This function will Get the web API data
const getWeatherData = async(zip) => {
    try{
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();

        if(data.cod != 200){
            //it will display an error message on the UI
            error.innerHTML = data.message;
            setTimeout(_=> error.innerHTML ='', 2000)
            throw`${data.message}`; 
        }
        return data;
    } catch(error){
        console.log(error);
    }
};

// This Function will Post the data
const postData = async (url = "", info = {}) =>{
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });
    try{
        const newData = await res.json();
        console.log(`Already Saved`,newData);
        return newData;
    }catch (error){
        console.log(error);
    }
};
// This function will Get the projectData and Update the UI by that data
const updatingUI = async () => {
    const res = await fetch(server + "/all");
    try {
        const savedData = await res.json();
        document.getElementById("date").innerHTML = savedData.newDate;
        document.getElementById("city").innerHTML = savedData.city;
        //deg refers to degree and the C refers to the celesius
        document.getElementById("temp").innerHTML = savedData.temp + '&degC';
        document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("content").innerHTML = savedData.feelings;
    } catch (error) {
        console.log(error);
    }
};