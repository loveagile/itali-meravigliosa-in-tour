// @ts-nocheck
import type { NextPage } from "next"
import React, { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "react-perfect-scrollbar/dist/css/styles.css"
import Event from "../components/Event"
import { firestore } from "../firebase/clientApp"
import SeoHead from "../components/Seo/SeoHead"
import LandingComponent from "../components/LandingComponent"

const Section = ({
  titolo,
  slug,
  eventi,
}: {
  titolo: string
  slug: string
  eventi: any
}) => (
  <div className="col-span-12 px-4">
    <h4 className="text-center text-4xl font-bold md:text-left">{titolo}</h4>
    <br />

    <Swiper
      slidesPerView={1}
      breakpoints={{
        968: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {eventi
        ?.filter((doc) => doc?.luogo === slug)
        ?.map((doc) => (
          <SwiperSlide key={doc?.id} className="mb-8">
            <Event
              image={doc?.copertina}
              heading={doc?.titolo}
              location={doc?.luogo}
              btnText="Scopri di più"
              to={`/eventi/${doc?.slug}`}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
)

const Home: NextPage = () => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )
  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento"
        ? setListaEventi((listaEventi) => [...listaEventi, d.data()])
        : setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  useEffect(() => {
    // ;(window.adsbygoogle = window.adsbygoogle || []).push({})

    const mapScript = document.createElement("script")
    const countryScript = document.createElement("script")
    // const clickScript = document.createElement("script")

    mapScript.src = "/scripts/mapdata.js"
    countryScript.src = "/scripts/countrymap.js"
    mapScript.async = true
    countryScript.async = true

    // clickScript.type = "text/javascript"
    // clickScript.innerHTML = `simplemaps_worldmap.hooks.zoomable_click_region = function(id){
    //       alert(simplemaps_worldmap_mapdata.state_specific[id].name);
    //     }`

    document.body.appendChild(mapScript)
    document.body.appendChild(countryScript)
    // document.body.appendChild(clickScript);

    return () => {
      document.body.removeChild(mapScript)
      document.body.removeChild(countryScript)
      // document.body.removeChild(clickScript);
    }
  }, [])

  return (
    <>
      <SeoHead
        title="Italia Meravigliosa in tour"
        description="Trova luoghi meravigliosi in tutta Italia alla portata di un click."
      />
      <LandingComponent eventi={listaEventi} categorie={categorie} />
    </>
  )
}

export default Home
