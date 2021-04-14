import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorModal = ({ error }) => {

  return (
    <div>
      {toast.info(error, { position: toast.POSITION.TOP_CENTER, autoClose: false})}
      <ToastContainer className="foo" style={{ width: "300px"}} />
    </div>
  );
};

export default ErrorModal;
