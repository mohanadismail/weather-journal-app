/* Global Variables */
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '58b0cb4e367ebfe13ee87ade465bce0e&units=imperial';
const data = [];
const first = document.getElementById("date");
const second = document.getElementById("temp");
const third = document.getElementById("content");
const gen = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

gen.addEventListener("click", function() {
    const zip = document.getElementById("zip").value;
    if (zip == "") {
        alert("You must enter a ZIP Code");
    }
    else {
        const user = {feeling: document.getElementById("feelings").value};
        //Async function to retrieve data from API and user input and change UI dynamically
        const getWeather = async () => {
        const request = await fetch (`${url}${zip},&appid=${key}`);
        try {
            const weatherData = await request.json();
            const temp = {temperature: weatherData.main.temp};
            data.push(temp);
            data.push(user);
            data.push({date: newDate});
            return data;
        }
        catch (error) {
            alert("Please enter a valid ZIP Code");
            console.log("error", error);
        }
        };
        getWeather()
        .then(data => postData('/alldata', data))
        .then(newData => retrieveData("/all"));
        }
    
})

//Async function to post data to be stored in server
const postData = async (url = '', data = []) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        try {
            const newData = await response.json();
            return newData;
        }
        catch (error) {
            console.log("error", error);
        }
}

const retrieveData = async (url = '') => {
    const request = await fetch(url);
    try {
        const newData = await request.json();
        first.innerHTML = newData.date;
        second.innerHTML = newData.temp;
        third.innerHTML = newData.feel;
    }
    catch (error) {
        console.log("error", error);
    }
}