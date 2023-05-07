import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const Navigate = useNavigate()
  const user = "Denny"
  return (
    <div className="h-2/3 relative flex justify-center">
      <div className="bg-[url('image/background1.jpg')] bg-center bg-cover bg-no-repeat h-100 w-100 absolute z-0"></div>
      <div className="rounded bg-transparent self-center z-20 flex flex-col justify-center items-center text-white gap-2">
        <h2 className="font-bold text-8xl">Weather</h2>
        <h2 className="font-bold text-8xl">Forecast</h2>
        <h2 className="text-3xl">What you should know</h2>
      </div>
      <div className="flex flex-auto justify-between items-center px-14 py-3 z-10 w-100 absolute font-bold text-gray-700">
        <div className="flex gap-5 items-center w-100">
          <h2 className="text-4xl">What Weather</h2>
          <h2 className="text-xl">Account: {user}</h2>
        </div>
        <div className="flex gap-5 justify-end items-center w-100">
          <h2 className="text-xl uppercase">Mail notification</h2>
          <h2 className="text-xl uppercase">Log out</h2>
        </div>
      </div>
    </div>
  )
}

export default Header;
