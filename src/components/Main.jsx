import React, { useState } from "react";
import "./Main.css"

const Main = () => {
  const [hasQuery, sethasQuery] = useState(true)
  const weather = [
    {
      time: 123
    },
    {
      time: 45
    },
    {
      time: 6
    },
    {
      time: 9
    },
    {
      time: 1222
    },
  ]
  return (
    <div className="flex flex-col justify-center items-center mt-4 relative gap-5">
      <div className="flex justify-center items-center w-full gap-2">
        <input type="text" className="text-xl w-96 border-2 px-3 py-2" placeholder="Please enter the English of the city." />
        <button className="px-3 py-2 border-2 border-green-500 text-green-500 text-xl">Search</button>
      </div>

      <div className="p-5 bg-gray-100 w-3/5 flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl">天氣查詢系統</h2>

        {
          hasQuery &&
          <>
            <div className="py-4 bg-green-200 text-center w-full">
              <p>The weather in Taipei is currently 晴、少雲</p>
              <p>The temperature is 17.2</p>
            </div>
            <table className="w-full text-center">
              <tr>
                <th> </th>
                <th>時間</th>
                <th>城市</th>
                <th>溫度</th>
                <th>體感溫度</th>
                <th>濕度</th>
                <th>天氣情況</th>
                <th>風速</th>
              </tr>
              {
                weather.map((data) => {
                  return (
                    <tr>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
                      <td>{data.time}</td>
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
