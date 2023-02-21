import React, { useState } from "react"
import { FaArrowCircleRight, FaEnvelope } from "react-icons/fa"
import { subscribeToConvertKit } from "../../services/subscribe"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Newsletter = () => {
  const [email, setEmail] = useState("")

  const subscribeNow = async () => {
    const status = await subscribeToConvertKit({ email })
    if (status) {
      setEmail("")
    }

    const showToastMessage = () => {
      toast.success('Iscritto con successo!', {
          position: toast.POSITION.TOP_RIGHT
      });
  };
  }

  return (
    <div
      id="wish-list-section"
      className="col-span-12 !ml-0 px-3 lg:px-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          top: 50,
          width: "100%",
          padding: 5,
          borderRadius: 40,
          backgroundImage: 'url("/images/gradient.png")',
          backgroundSize: "cover",
        }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: 30,
            paddingTop: 50,
            paddingBottom: 10,
            fontWeight: "600",
            color: "white",
          }}
        >
          Vuoi ricevere piu’ informazioni?
        </h1>
        <div
          className="text-center text-white"
          style={{
            fontSize: 16,
            fontWeight: "400",
          }}
        >
          Iscriviti alla newsletter di italia meravigliosa
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            paddingBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              borderRadius: 50,
              height: 50,
              paddingLeft: 15,
              border: "1px solid white",
              width: "20rem",
            }}
            className="input-newsletter"
          >
            <FaEnvelope color="gray" />{" "}
            <input
              placeholder="La tua email"
              style={{ border: "none", width: "80%", marginLeft: 5 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="text-gray-800 outline-none"
            ></input>
          </div>
          <ToastContainer />
          <button
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 20,
              background: "#231A36",
            }}
            className="buttonNewsletter rounded-full bg-red-500 py-4 px-14 font-bold text-white hover:bg-red-700"
            onClick={subscribeNow}
          >
            <span style={{ marginRight: 5 }}>Iscriviti</span>{" "}
            <FaArrowCircleRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
