import React, { useState } from "react"
import Input from "../components/common/Input"
import { Toaster } from "react-hot-toast"
import { auth } from "../firebase/clientApp"
import { useRouter } from "next/router"
import { NextPage } from "next"
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth"

import {
  notifyEmail,
  notifyError,
  notifyFields,
  notifyPasswordSent,
  notifySuccess,
} from "../components/common/NotifyToaster"

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const SubmitHandle = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!email || !password) {
      notifyFields()
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          notifySuccess()
          setEmail("")
          setPassword("")
          router.push("/")
        })
        .catch((err) => {
          notifyError()
        })
    }
  }
  return (
    <div className="mx-auto mt-32 flex max-w-7xl flex-col items-center space-x-10 space-y-20 px-4">
      <div className="w-full">
        <Toaster />

        <h2 className="text-center text-4xl font-bold">
          Bentornato! Compila i campi per effettuare il login
        </h2>

        <br />

        <p className="text-center font-medium text-gray-500">
          Scopri nuove esperienze ogni singolo giorno, non ti stancherai mai di
          esplorare le bellezze del nostro paese!
        </p>

        <br />
        <br />

        <div className="mx-auto max-w-lg space-y-4">
          <div className="flex flex-col space-y-8">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="La tua email..."
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="La tua password..."
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <button
            onClick={SubmitHandle}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-secondary-500 p-4 px-6 py-3 font-medium text-secondary-600 shadow-md outline-none ring-secondary-500 ring-offset-4 transition duration-300 ease-out focus:ring-2"
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

          <br />
          <br />

          <p className="!mb-10">
            Non ti ricordi la password?
            <button
              onClick={() => {
                if (email) {
                  sendPasswordResetEmail(auth, email)
                    .then(() => {
                      notifyPasswordSent()
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                } else {
                  notifyEmail()
                }
              }}
              className="cursor-pointer rounded-lg bg-red-100 py-1 px-2 font-medium text-red-500"
            >
              Richiedi un reset
            </button>
          </p>
          
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

export default SignIn
