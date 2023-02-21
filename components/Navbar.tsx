import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState, useRef } from "react"

import {
  FaBars,
  FaTimes,
  FaHeart,
  FaUser,
  FaDoorOpen,
  FaDownload,
} from "react-icons/fa"
import SearchBar from "./common/SearchBar"
import WishModal from "./WishModal"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, logout } from "../firebase/clientApp"
import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react"
import dynamic from "next/dynamic"
import styled from "@emotion/styled"

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
}) as any

const theme = {
  icon: { borderColor: "#ef4444", width: "24px" },
  unseenBadge: { backgroundColor: "#ef4444" },
  header: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  footer: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  notification: {
    default: {
      textColor: "#27272a",
      borderRadius: "8px",
      backgroundColor: "#10b981",
      fontFamily: "inherit",
    },
    unseen: {
      backgroundColor: "#10b981",
      textColor: "#27272a",
      borderRadius: "8px",
      fontFamily: "inherit",
    },
    unread: {
      backgroundColor: "#10b981",
      textColor: "#27272a",
      borderRadius: "8px",
      fontFamily: "inherit",
    },
  },
}

const useOutsideUser = (
  ref: React.RefObject<any>,
  setUserOpen: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      setUserOpen(false)
    }
    document.addEventListener("mouseup", handleClickOutside)
    return () => {
      document.removeEventListener("mouseup", handleClickOutside)
    }
  }, [ref])
}

const useOutsidebar = (
  ref: React.RefObject<any>,
  setIsOpen: Function
) => {
  useEffect(() => {
    const handleClickOutsidebar = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener("mouseup", handleClickOutsidebar)
    return () => {
      document.removeEventListener("mouseup", handleClickOutsidebar)
    }
  }, [ref])
}

const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Function }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [userOpen, setUserOpen] = useState(false)

  const userRef = useRef(null)
  useOutsideUser(userRef, setUserOpen)
  const sidebarRef = useRef(null)
  useOutsidebar(sidebarRef, setIsOpen)

  return (
    <>
      <div className={`${isOpen && "sidebar-back"}`}></div>
      <div
        id="sidebar"
        className={`header flex w-[300px] h-full fixed transform flex-col items-center space-y-4 p-4 transition-all duration-200 ease-in-out ${
          isOpen ? "translate-x-0 mobile-menu" : "-mb-100 -translate-x-full"
        }`}
      >
        <SearchBar />
        <div className="relative items-center flex flex-col align-center">
          <button
            type="button"
            aria-hidden="true"
            onClick={() => setModalOpen(true)}
            className="flex h-10 mb-4 w-10 items-center justify-center rounded-lg border-2 border-secondary-500 outline-none ring-secondary-200 transition duration-200 hover:bg-secondary-100 focus:ring-2"
          >
            <FaHeart className="text-secondary-500" size={20} />
          </button>

          {user && user?.email && (
            <MagicBell
              apiKey="97576655a4d3dd3e0a7ee53354b21e333fe580ed" 
              userEmail={user.email}
              theme={theme}
              locale="en"
            >
              {(props) => (
                <FloatingNotificationInbox width={400} height={500} {...props} />
              )}
            </MagicBell>
          )}

          <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <Link href="/servizi.pdf" target="_blank" download>
            <a className="wrapperUsername wrapperUsername3 mt-4 mb-4">
              <FaDownload />
              Servizi
            </a>
          </Link>
          {user && (
            <>
              <div
                onClick={() => setUserOpen(!userOpen)}
                className="flex mt-3 cursor-pointer items-center space-x-2 whitespace-nowrap rounded-full bg-primary-100 hover:bg-primary-200 active:bg-primary-300 py-3 px-4 font-medium text-primary-700"
              >
                <FaUser />
                <span>{user?.displayName}</span>
              </div>

              {userOpen && (
                <div ref={userRef} className="userLogout right-0 !z-50 rounded-xl p-5 shadow-xl">
                  <p className="text-lg font-medium">{user?.email}</p>
                  <br />
                  <div
                    onClick={() => {
                      logout()
                    }}
                    className="flex cursor-pointer items-center justify-center space-x-4 rounded-full bg-secondary-100 px-4 py-3 text-lg font-medium text-secondary-500"
                  >
                    <FaDoorOpen />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [userOpen, setUserOpen] = useState(false)

  const inputRef = useRef(null)

  useOutsideUser(inputRef, setUserOpen)

  useEffect(() => {
    function onResize() {
      var x = window.innerWidth

      if (x > 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", onResize)
  }, [])

  return (
    <>
      <header className="header relative z-50 flex h-20 flex-col items-center">
        <nav className="flex h-full w-full max-w-[90rem] items-center justify-between px-6 md:space-x-10">
          <button
            className="absolute rounded-sm outline-none ring-primary-200 ring-offset-4 transition duration-200 focus:ring-2 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaTimes className="text-gray-500" size={24} />
            ) : (
              <FaBars className="text-gray-500" size={24} />
            )}
          </button>

          <div className="flex w-full items-center justify-center space-x-8 lg:justify-between xl:w-fit xl:justify-start">
            <Link href="/" passHref>
              <a className="rounded-xl bg-white p-2 outline-none ring-primary-200 transition duration-200 focus:ring-2">
                <div className="flex items-center">
                  <Image
                    src="/images/fullLogo.png"
                    objectFit="contain"
                    layout="intrinsic"
                    width={250}
                    height={45}
                    alt="hand"
                    className="logo_navbar"
                  />
                </div>
              </a>
            </Link>

            {/* <div className="min-w-lg hidden w-full space-x-6 md:flex">
              <NavLink text="Contatti" to="/contatti" />
              <NavLink text="Lavora con noi" to="/lavora-con-noi" />
              <NavLink text="Categorie" to="/categorie" />
            </div> */}
          </div>

          <div
            className={`relative hidden ${
              user ? "w-[40%]" : "w-[50%]"
            } items-center space-x-6 lg:inline-flex`}
          >
            <SearchBar />
            {user && user?.email && (
              <MagicBell
                apiKey="97576655a4d3dd3e0a7ee53354b21e333fe580ed"
                userEmail={user.email}
                theme={theme}
                locale="en"
              >
                {(props) => (
                  <FloatingNotificationInbox
                    width={400}
                    height={500}
                    {...props}
                  />
                )}
              </MagicBell>
            )}
            <Link href="/servizi.pdf" target="_blank" download>
              <a className="wrapperUsername wrapperUsername3">
                <FaDownload />
                Servizi
              </a>
            </Link>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center rounded-lg border-2 border-secondary-500 p-2 outline-none ring-secondary-200 ring-offset-4 transition duration-200 hover:bg-secondary-100 focus:ring-2"
            >
              <FaHeart className="text-secondary-500" size={20} />
            </button>
          </div>

          <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <div ref={inputRef} className="hidden lg:inline-flex">
            {user && (
              <>
                <div
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex cursor-pointer items-center space-x-2 whitespace-nowrap rounded-full bg-primary-100 hover:bg-primary-200 active:bg-primary-300 py-3 px-4 font-medium text-primary-700"
                >
                  <FaUser />
                  <span>{user?.displayName}</span>
                </div>

                {userOpen && (
                  <div className="userLogout absolute right-0 top-20 !z-50 rounded-xl p-8 shadow-xl">
                    <p className="text-lg font-medium">{user?.email}</p>
                    <br />
                    <div
                      onClick={() => {
                        logout()
                      }}
                      className="flex cursor-pointer items-center justify-center space-x-4 rounded-full bg-secondary-100 px-4 py-3 text-lg font-medium text-secondary-500"
                    >
                      <FaDoorOpen />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div> 
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )
}

export default Navbar
