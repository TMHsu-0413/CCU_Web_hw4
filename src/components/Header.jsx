import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Alert,{Alert2} from "./Alert";

const Header = () => {
  const Navigate = useNavigate()
  const cookies = new Cookies()
  const ID = cookies.get('ID')
  const name = cookies.get('Name')

  const handleMail = async () => {
    const res = await axios.post(process.env.REACT_APP_API + 'getMailNotification.php',{
      name: name,
      ID: ID
    })
    const state = res.data[0]['getMail']
    if (state === '0'){
      Alert2("You haven't open the mail notification, do you want to open the notification?",ID,name)
    }
    else{
      Alert2("You already open the mail notification now, do you want to close it?",ID,name)
    }
  }

  const handleLogout = () => {
    cookies.remove('ID',{path : "/hw4"})
    cookies.remove('Name', {path: "/hw4"})
    Navigate('/hw4/Logout')
  }

  return (
    <div className="h-2/3 relative flex justify-center" id="Header">
      <div className="bg-[url('image/background1.jpg')] bg-center bg-cover bg-no-repeat h-100 w-100 absolute z-0"></div>
      <div className="rounded bg-transparent self-center z-20 flex flex-col justify-center items-center text-white gap-2">
        <h2 className="font-bold text-8xl">Weather</h2>
        <h2 className="font-bold text-8xl">Forecast</h2>
        <h2 className="text-3xl">What you should know</h2>
      </div>
      <div className="flex flex-auto justify-between items-center px-14 py-3 z-10 w-100 absolute font-bold text-gray-700">
        <div className="flex gap-5 items-center w-100">
          <h2 className="text-4xl">What Weather</h2>
          <h2 className="text-xl">Account: {name}</h2>
        </div>
        <div className="flex gap-5 justify-end items-center w-100">
          <h2 onClick={handleMail} className="text-xl uppercase cursor-pointer">Mail notification</h2>
          <h2 onClick={handleLogout} className="text-xl uppercase cursor-pointer">Log out</h2>
        </div>
      </div>
    </div>
  )
}

export default Header;
