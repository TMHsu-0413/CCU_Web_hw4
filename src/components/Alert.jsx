import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";

const Alert = (title, html, state) => {
  const Myswal = withReactContent(Swal)
  Myswal.fire({
    title: <strong>{title}</strong>,
    html: <i>{html}</i>,
    icon: state === true ? 'success' : 'error'
  })
}

export const Alert2 = (title, ID, name) => {
  const Myswal = withReactContent(Swal)
  Myswal.fire({
    title: <strong>{title}</strong>,
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then( async (res) => {
    if (res.isConfirmed) {
      // 要做一個把資料庫ID name的bool反轉的api
      await axios.put(process.env.REACT_APP_API + 'changeMailNoti.php',{
          name:name,
          ID:ID
        })
      Swal.fire({
        title: 'Saved!',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: 'Change not saved',
        icon: 'info'
      })
    }
  })
}

export default Alert;
