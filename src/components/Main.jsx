import React, { useRef, useState } from "react";
import Alert from "./Alert";
import axios from "axios";
import "./Main.css"

const Main = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState([])
  const [five_day_weathers, setFive_day] = useState([])
  const handleSearch = async () => {
    const sql_inj = (word) => {
      return word.includes('*') || word.includes('-') || word.includes('/');
    }

    var city = inputRef.current.value


    // blenk field judge
    if (city.length === 0) {
      Alert('Error!', 'City name field is blank', false)
      return
    }

    // English letter judge
    var p = /[a-zA-Z]/;
    for (let i = 0; i < city.length; i++) {
      if (p.test(city[i]) === false) {
        Alert('Error!', 'City name only can contains English letters.', false)
        return
      }
      // sql injection judge
      else if (sql_inj(city[i])) {
        Alert('Error!', 'City name contains sql injection', false)
        return
      }
    }

    var res = await axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + process.env.REACT_APP_APPID)
    if (res.data.length === 0) {
      Alert('Error!', "OpenWeatherMap doesn't have this city infomation", false)
      return
    }
    const lat = parseInt(res.data[0]["lat"]), lon = parseInt(res.data[0]["lon"])
    res = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.REACT_APP_APPID + "&units=metric&lang=zh_tw")

    const description = res.data.weather[0]["description"], wind = res.data.wind.speed, temp = res.data.main.temp, humidity = res.data.main.humidity

    setWeather(() => {
      return [description, temp, humidity, wind]
    })

    res = await axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.REACT_APP_APPID + "&units=metric&lang=zh_tw")
    const data = res.data.list
    let five_day_weather_data = []
    for (let i = 0; i < 40; i += 8) {
      let cur_data = {
        icon: data[i].weather[0].icon,
        time: data[i].dt_txt.slice(0, 10),
        temp: data[i].main.temp,
        bodytemp: data[i].main.feels_like,
        humid: data[i].main.humidity,
        descrip: data[i].weather[0].description,
        wind: data[i].wind.speed
      }
      five_day_weather_data.push(cur_data)
    }
    setFive_day(five_day_weather_data)
  }

  const handleKeydown = (e) => {
    if (e.key === 'Enter')
      handleSearch()
  }
  return (
    <div className="flex flex-col justify-center items-center mt-4 relative gap-5">
      <div className="flex justify-center items-center w-full gap-2">
        <input type="text" onKeyDown={handleKeydown} className="text-xl w-96 border-2 px-3 py-2" ref={inputRef} placeholder="Please enter the English of the city." />
        <button className="px-3 py-2 border-2 border-green-500 text-green-500 text-xl" onClick={handleSearch}>Search</button>
      </div>

      <div className="p-5 bg-gray-50 w-4/5 flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl">天氣查詢系統</h2>

        {
          weather.length !== 0 &&
          <>
            <div className="py-4 bg-green-200 text-center w-full text-2xl">
              <p>The weather in Taipei is currently <span className="text-rose-700">{weather[0]}</span></p>
              <p>The temperature is <span className="text-rose-700">{weather[1]}&#176;C</span></p>
              <p>Humidity is <span className="text-rose-700">{weather[2]}</span></p>
              <p>Wind speed is <span className="text-rose-700">{weather[3]}mph</span></p>
            </div>
            <table className="w-full text-center" border="1">
              <tr>
                <th></th>
                <th>時間</th>
                <th>城市</th>
                <th>溫度</th>
                <th>體感溫度</th>
                <th>濕度</th>
                <th>天氣情況</th>
                <th>風速</th>
              </tr>
              {
                five_day_weathers.map((data) => {
                  const src = "https://openweathermap.org/img/wn/" + data.icon + ".png"
                  return (
                    <tr>
                      <td align="center"><img src={src} alt="img" width="70" /></td>
                      <td>{data.time}</td>
                      <td>{inputRef.current.value}</td>
                      <td>{data.temp}&#176;C</td>
                      <td>{data.bodytemp}&#176;C</td>
                      <td>{data.humid}</td>
                      <td>{data.descrip}</td>
                      <td>{data.wind} m/s</td>
                    </tr>
                  )
                })
              }
            </table>
          </>
        }

      </div>
    </div >
  )
}

export default Main;
