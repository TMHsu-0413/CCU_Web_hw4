import React, { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate,Navigate } from "react-router-dom";
import Alert from "../components/Alert";

const Protected = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  const ID = cookies.get("ID"), name = cookies.get("Name");

  useEffect(() => {
    const middleware = async() => {
      const isLogin = await axios.get(process.env.REACT_APP_API + 'checkLogin.php', {
        params: {
          ID: ID,
          name: name
        }
      })

      if (!isLogin || ID === undefined || name === undefined) {
        Alert('Error!',"You haven't sign in, please sign in.", false)
        setData(navigate('/hw4'))
      }
      setData(children)
    }
    middleware()
  },[navigate])

  return data
}

export default Protected;
