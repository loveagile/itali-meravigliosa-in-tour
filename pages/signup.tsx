import React, { useState } from "react"
import Input from "../components/common/Input"
import { signupUser } from "../firebase/clientApp"
import { Toaster } from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/router"
import { NextPage } from "next"
import {
  emailError,
  notifyFields,
  passwordError,
  notifySuccess,
} from "../components/common/NotifyToaster"

const SignUp: NextPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const SubmitHandle = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!username || !email || !password) {
      notifyFields()
    } else if (!isValidEmail(email)) {
      emailError()
    } else if (password.length < 6) {
      passwordError()
    } else {
      signupUser(username, email, password)
      notifySuccess("signup")
      setUsername("")
      setEmail("")
      setPassword("")
      router.push("/signin")
    }
  }

  return (
    <div className="mx-auto  flex max-w-7xl flex-col items-center space-x-10 space-y-20 px-4 xl:flex-row xl:items-start xl:space-y-0" style={{marginTop: 50}}>
      <div className="w-full">
        <Toaster />

        <h2 className="text-3xl font-bold">
          Entra nella Community di Italia Meravigliosa
        </h2>

        <br />

        <p className="font-medium">
          Scopri nuove esperienze ogni singolo giorno, non ti stancherai mai di
          esplorare le bellezze del nostro paese!
        </p>

        <br />

        <p>
          Hai già un account?{" "}
          <Link href="/signin">
            <span className="cursor-pointer rounded-lg bg-red-100 py-1 px-2 font-medium text-red-500">
              Effettua il login.
            </span>
          </Link>
        </p>

        <br />
        <br />

        <div className="space-y-4">
          <div className="flex flex-col space-y-4">
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Il tuo username..."
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />

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

          <button
            onClick={SubmitHandle}
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
          <br />
          <br />
        </div>
      </div>

      {/* <div
        className="mx-auto flex h-[74vh] w-full justify-center pr-8"
        style={{ alignItems: "center" }}
      > */}
        {/* <img
          className="h-full w-full object-cover"
          src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t1.6435-9/81275872_107549224099981_1527722306728624128_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bsMXLWixlv0AX_YTTYx&_nc_ht=scontent.fmxp6-1.fna&oh=00_AT9paom8TKiVs5rOPNT_rS91wjIIWID8T_YwmnMS1H3o-w&oe=62F20210"
          alt=""
          style={{ maxWidth: 300, maxHeight: 300, borderRadius: 50 }}
        /> */}
      {/* </div> */}
    </div>
  )
}

export default SignUp
