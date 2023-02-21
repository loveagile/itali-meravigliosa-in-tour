import React, { useRef } from "react"
import Input from "./common/Input"
import emailjs from "@emailjs/browser"

const CVForm = () => {
  const form = useRef(null)

  return (
    <form
      className="space-y-4"
      ref={form}
      onSubmit={(e: any) => {
        e.preventDefault()

        console.log(form)

        emailjs
          .sendForm(
            "service_ymj3ef9",
            "template_sayv3ff",
            e.target,
            "BpMal4ucD4kQnXfkM"
          )
          .then(
            (result) => {
              console.log(result.text)
            },
            (error) => {
              console.log(error.text)
            }
          )
      }}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input
          id="nome"
          label="Nome"
          type="text"
          placeholder="Il tuo nome..."
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="La tua email..."
        />
      </div>

      {/* <Input id="cv" label="CV" type="text" placeholder="Link al CV..." /> */}

      <br />

      <button
        type="submit"
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-secondary-500 p-4 px-6 py-3 font-medium text-secondary-600 shadow-md outline-none ring-secondary-500 ring-offset-4 transition duration-300 ease-out focus:ring-2 lg:w-fit"
      >
        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-secondary-500 text-white duration-300 group-hover:translate-x-0">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="ease absolute flex h-full w-full transform items-center justify-center text-secondary-500 transition-all duration-300 group-hover:translate-x-full">
          Invia
        </span>
        <span className="invisible relative">Invia</span>
      </button>
    </form>
  )
}

export default CVForm
