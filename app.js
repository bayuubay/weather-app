const express = require('express');
const http = require('http');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
 
const query =req.body.cityName;
const apiKey = '1d9ad83acf31b2ea0e2715b57d1f3c51';
const units = 'metric';
const url=`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`

http.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
        // console.log(data);
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherCond = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<p>the weather condition is ${weatherCond} and</p>`);
        res.write(`<h1>temperature in ${query} is ${temp} celcius</h1>`);
        res.write(`<img src=" ${imgUrl} ">`);
        res.send();
    })   
})
})
app.listen(port, () => console.log(`<the server run at http://localhost:${port}`));
