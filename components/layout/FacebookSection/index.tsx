import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CursorClickIcon,
  PhotographIcon,
  StarIcon,
  ThumbUpIcon,
  TicketIcon,
} from "@heroicons/react/outline"
import { FaComment, FaHeart, FaThumbsUp, FaFacebook } from "react-icons/fa"

const FacebookSection = () => {
  const alignSelf = {
    alignSelf: "center",
  }

  return (
    <>
      <div
        className="facebook-mobile col-span-12" 
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: 25,
        }}
      >
        <div className="facebook_text_grid_width mb-10" style={alignSelf}>
          <h2 className="text text-4xl font-semibold uppercase lg:text-5xl leading-10 mb-5">
            QUANTI CI SEGUONO?
          </h2>
          <h4 className="text facebook_text leading-10">
            SEGUICI SU FACEBOOK SIAMO OLTRE 300 MILA
          </h4>
          <div className="facebook-mobile-icon flex space-y-4 lg:flex-row lg:items-center md:space-y-0">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #1e90ff",
                maxHeight: 43,
                borderRadius: 6,
                padding: 14,
                margin: "16px 0",
                maxWidth: 264,
                alignSelf: "center",
              }}
              className="wrapperUsername"
            >
              <FaFacebook style={{ color: "007aff", fontSize: 24 }} />
              <Link
                href="https://www.facebook.com/istagram.paoloartista1/"
                target="_blank"
              >
                <a
                  style={{
                    margin: "0 !important",
                    paddingLeft: 10,
                    paddingTop: 20,
                    paddingBottom: 20,
                    color: "#007aff",
                  }}
                  title="Pagina Facebook"
                >
                  @istagram.paoloartista1
                </a>
              </Link>
            </div>
          </div>
          <div className="fbListWrapper">
            <ul
              style={{ paddingBottom: 40, alignItems: "flex-start" }}
              className="flex flex-row items-center justify-evenly space-y-1 font-semibold flex-col lg:items-start"
            >
              <li className="facebook-list">
                <div className="markerList"></div>Post spettacolari e unici
              </li>
              <li className="facebook-list">
                <div className="markerList"></div>Community
              </li>
              <li className="facebook-list">
                <div className="markerList"></div>Share
              </li>
            </ul>
          </div>

          <div className="heartIconWrapper flex w-fit items-center space-x-2 rounded-lg py-2 text-lg font-semibold text-blue-600">
            <FaHeart />
            <span style={{ fontSize: 12 }}>
              Milioni di utenti salvano luoghi meravigliosi
            </span>
          </div>
        </div>

        <div className="facebook_text_grid_width relative">
          <div
            className="shadow-lg shadow-slate-800 w-full pt-[57.6923%] relative"
            style={{ alignSelf: "center" }}
          >
            <Image
              src="/images/approach1.jpg"
              objectFit="contain"
              layout="fill"
              alt="approach1"
              className="cards"
            />
          </div>
          <div
            className="float-right absolute right-0 shadow-lg shadow-slate-800 w-full pt-[71.25%] md:w-[70%] md:pt-[49.875%] md:mr-[20px] xl:-mr-[30px] 2xl:-mr-[100px] mt-4 md:-mt-[30px] lg:-mt-[50px] relative"
            style={{ alignSelf: "center" }}
          >
            <Image
              src="/images/approach2.jpg"
              objectFit="contain"
              layout="fill"
              alt="approach2"
              className="cards"
            />
          </div>
        </div>

        {/* <div className="facebook_text_grid_width view_mobile !space-y-8">
          <Image
            src="/images/card1.png"
            objectFit="contain"
            layout="intrinsic"
            width={300}
            height={300}
            alt="hand"
            className="rounded-2xl"
          />
        </div> */}
      </div>
      <div className="col-span-12 box-border flex flex-col xl:col-span-12">
        <div
          className="xl:col-span-5"
          style={{ alignSelf: "center", background: "red" }}
        ></div>
        <div className="xl:col-span-6"></div>
      </div>
      <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
        <h1
          className="user-active text-center text-5xl lg:text-7xl"
          style={{ fontWeight: "700" }}
        >
          1M+ Utenti Giornalieri
        </h1>
      </div>
      <br />
      <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12">
          <div className="infoBox xl:col-span-3" style={{ borderLeft: "none" }}>
            <PhotographIcon className="mb-2" width={30} height={30} />
            <p className="infoGray mb-2 text-center text-lg font-medium tracking-widest">
              FOTO
            </p>
            <p className="text-center text-2xl font-semibold">+50K</p>
          </div>
          <div className="infoBox xl:col-span-3">
            <ThumbUpIcon className="mb-2" width={30} height={30} />
            <p className="infoGray mb-2 text-center text-lg font-medium tracking-widest">
              INTERAZIONI
            </p>
            <p className="text-center text-2xl font-semibold">+15M</p>
          </div>
          <div className="infoBox xl:col-span-3">
            <TicketIcon className="mb-2" width={30} height={30} />
            <p
              className="infoGray mb-2 text-center text-lg font-medium tracking-widest"
              style={{ width: "50%" }}
            >
              LUOGHI MERAVIGLIOSI
            </p>
            <p className="text-center text-2xl font-semibold">+1000</p>
          </div>
          <div
            className="infoBox xl:col-span-3"
            style={{ borderRight: "none" }}
          >
            <StarIcon className="mb-2" width={30} height={30} />
            <p className="infoGray mb-2 text-center text-lg font-medium tracking-widest">
              COLLABORAZIONI
            </p>
            <p className="text-center text-2xl font-semibold">+50</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FacebookSection
