"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ToastNotification() {
  return (
    <ToastContainer
      autoClose={2000}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      closeOnClick
      draggable
      draggableDirection="x"
      draggablePercent={30}
    />
  );
}
