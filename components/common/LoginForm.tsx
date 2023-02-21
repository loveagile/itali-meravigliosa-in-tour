import React, { MouseEventHandler } from "react"

interface LoginProps {
  email: string
  setEmail: Function
  password: string
  setPassword: Function
  login: MouseEventHandler<HTMLButtonElement>
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  login,
}: LoginProps) => {
  return (
    <div className="mx-auto mt-8 h-full max-w-6xl">
      <main className="flex w-full flex-col items-center justify-center px-4">
        <div className="w-[24rem] rounded-lg border-2 border-gray-200/50 px-10 py-14">
          <h4 className="text-center text-4xl font-bold text-gray-800 md:text-left">
            Pannello Admin
          </h4>

          <br />
          <hr />
          <br />

          <form>
            <div className="flex w-full flex-col">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-semibold text-secondary-500"
              >
                Indirizzo Email
              </label>

              <input
                name="email"
                id="email"
                type="email"
                placeholder="email..."
                className="form-input rounded-lg border-gray-400 font-medium text-gray-800 caret-secondary-500 focus:border-secondary-500 focus:ring-0"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <br />

            <div className="flex w-full flex-col">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-semibold text-secondary-500"
              >
                Password
              </label>

              <input
                name="password"
                id="password"
                type="password"
                placeholder="password..."
                className="form-input rounded-lg border-gray-400 font-medium text-gray-800 caret-secondary-500 focus:border-secondary-500 focus:ring-0"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />

            <button
              onClick={login}
              className="group relative inline-block w-full overflow-hidden rounded-md bg-purple-50 px-5 py-2.5 font-medium text-secondary-500 outline-none ring-secondary-500 ring-offset-2 transition-all duration-200 focus:ring-2"
              type="submit"
            >
              <span className="absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary-500 opacity-90 transition-all duration-200 ease-out group-hover:h-full"></span>
              <span className="relative group-hover:text-white">Entra</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default LoginForm
