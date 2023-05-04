import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = (title,html,state) => {
  const Myswal = withReactContent(Swal)
  Myswal.fire({
    title: <strong>{title}</strong>,
    html: <i>{html}</i>,
    icon: state === true?'success':'error'
  })
}

export default Alert;
