//@ts-nocheck
import {
  FaHeart,
  FaMapMarkerAlt,
  FaShare,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa"
import Image from "next/image"
import { useRouter } from "next/router"
import Head from 'next/head'
import Comment from "../../components/common/Comment"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { addDoc, collection } from "firebase/firestore"
import React, { useState, useContext, useEffect } from "react"
import WishContext, { EventProps } from "../../components/context/WishContext"
import DOMPurify from "isomorphic-dompurify"
import toast, { Toaster } from "react-hot-toast"
import SeoHead from "../../components/Seo/SeoHead"
import { NextPage } from "next"
import styled from "styled-components"
const clipboard = () => toast.success("Testo copiato negli appunti!")

const Evento: NextPage = () => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )
  // console.log("This is the date", data)
  const [text, setText] = useState("")
  const [eventi, setEventi] = useState<any[]>([])
  const [evento, setEvento] = useState<any>()
  const [categorie, setCategorie] = useState<any[]>([])
  const router = useRouter()
  const slug = router.query.slug

  const emoji = ["👍🏻", "😍", "❤️", "🤩", "⭐️"]

  useEffect(() => {
    const allEvents = []
    data?.docs.forEach((d) => {
      // console.log("This is the fl scemal", d.data()._fl_meta_.schema)
      if (d.data()._fl_meta_.schema === "evento") {
        setEventi((eventi) => [...eventi, d.data()])
        allEvents.push(d.data())
      } else {
        setCategorie((categorie) => [...categorie, d.data()])
      }
    })
    // console.log("All events inside use efefec",)
    setEvento(allEvents?.filter((doc) => doc.slug === slug)[0])
  }, [data])

  const [listaCommenti, listaCommentiLoading, listaCommentiError] =
    useCollection(collection(firestore, "commenti"), {})

  const [nome, setNome] = useState("")
  const [commento, setCommento] = useState("")

  const [commenti, setCommenti] = useState([])

  // const evento = eventi?.filter((doc) => doc.slug === slug)[0]

  const listaCategorie = categorie?.filter((el) =>
    evento?.categorie.some((p) => p.id === el.id)
  )

  const uploadComment = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (commento != "" && nome != "") {
      addDoc(collection(firestore, "commenti"), {
        slug: slug,
        nome: nome,
        testo: commento,
      }).then(() => {
        setNome("")
        setCommento("")
      })
    }
  }

  useEffect(() => {
    if (listaCommenti && !listaCommentiLoading) {
      const filtered = listaCommenti?.docs?.filter(
        (doc) => doc.data().slug === slug
      )

      setCommenti(filtered)
    }
  }, [listaCommenti, listaCommentiLoading])

  const { add } = useContext(WishContext)

  const addToWish = (event: EventProps) => {
    if (add) {
      add(event)
    }
  }

  // console.log("This is props", evento)
  // console.log(
  //   "THis is the events",
  //   eventi,
  //   "This is evento",
  //   eventi?.filter((doc) => doc.slug === slug)[0]
  // )

  return (
    <div style={{ marginTop: 50 }}>
      <Head>
        <meta property="og:title" content="Trova luoghi meravigliosi in tutta Italia alla portata di un click" />
        <meta property="og:image" itemProp="image" content={evento?.copertina} />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://www.italiameravigliosaintour.it" />
      </Head>

      <link itemProp="thumbnailUrl" href={`https://www.italiameravigliosaintour.it/${evento?.copertina}`} /> 
      <span itemProp="thumbnail" itemScope itemType="https://www.italiameravigliosaintour.it/"> 
        <link itemProp="url" href="https://www.italiameravigliosaintour.it/" /> 
      </span>

      <Toaster />
      <div className="mx-auto my-8 max-w-6xl">
        <main className="flex w-full flex-col xl:flex-row">
          <div className="flex w-full flex-col px-4">
            <div className="relative h-40 w-full">
              <img
                src={evento?.copertina}
                // style={{height:200}}
                className="bannerImage h-full w-full object-cover"
                alt={evento?.titolo}
              />
            </div>
            <div
              className="containerCredits mt-2 flex justify-center space-x-2 md:justify-start"
              style={{
                border: "1px solid #3360FF",
                marginBottom: 20,
                padding: 5,
                borderRadius: 10,
              }}
            >
              <p
                className="creditsEvents  rounded-sm px-2 font-medium"
                style={{ width: "33%" }}
              >
                <Image
                  src="/images/events/credit.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={27}
                  height={27}
                  alt="hand"
                  style={{ marginTop: 3 }}
                />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3360FF",
                    marginLeft: 8,
                  }}
                >
                  Credit
                </span>{" "}
                {" " + evento?.credit}
              </p>
              <p
                className="creditsEvents  rounded-sm px-2 font-medium"
                style={{ width: "33%", textAlign: "center" }}
              >
                <Image
                  src="/images/events/views.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={27}
                  height={27}
                  alt="hand"
                  style={{ marginTop: 4 }}
                />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3360FF",
                    marginLeft: 8,
                  }}
                >
                  Views
                </span>{" "}
                {" " + evento?.views}
              </p>
              <p
                className="creditsEvents  rounded-sm px-2 font-medium"
                style={{ width: "33%", textAlign: "center" }}
              >
                <Image
                  src="/images/events/like.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={27}
                  height={27}
                  alt="hand"
                  style={{ marginTop: 3 }}
                />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3360FF",
                    marginLeft: 8,
                  }}
                >
                  Likes
                </span>{" "}
                {" " + evento?.likes}
              </p>
            </div>
            {/* 
            <br />
            <br /> */}
            <div className="w-full bg-gray-100">
              {/* <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p> */}

              {/* <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1708355893696705"
                data-ad-slot="9487119343"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins> */}
            </div>
            {/* <br />
            <br /> */}

            <div className="flex flex-col items-center justify-between lg:flex-row lg:space-x-12">
              <h4 className="mb-3 text-center text-4xl font-bold text-secondary-500 md:text-left">
                {evento?.titolo}
              </h4>

              <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4 justify-center">
                  {listaCategorie.map((categoria) => (
                    <div className="categoryContainer rounded-sm bg-primary-100 px-2 font-medium text-primary-600">
                      <span className="flex cursor-pointer items-center justify-center space-x-2">
                        <img src={categoria?.icona} alt="" />
                        <span>{categoria?.titolo}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-5 md:flex-col">
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://www.italiameravigliosaintour.it${router.asPath}`
                      )
                      clipboard()
                    }}
                    className="categoryContainer ml-auto flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white"
                  >
                    <FaShare />
                    <span>Copia Link</span>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-6">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://twitter.com/intent/tweet?text=Questo Articolo di Italia Meravigliosa in Tour è maginfico!\n https://italiameravigliosaintour.it${router.asPath}`}
                    >
                      <FaTwitter className="text-sky-500" size={30} />
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://italiameravigliosaintour.it${router.asPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="text-blue-500" size={30} />
                    </a>

                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://api.whatsapp.com/send?text=Questo Articolo di Italia Meravigliosa in Tour è maginfico!\n https://italiameravigliosaintour.it${router.asPath}`}
                    >
                      <FaWhatsapp className="text-green-500" size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="luogoSpan mb-2 !mt-6 flex items-center space-x-1 text-sm text-gray-500 xl:!mt-0">
              <FaMapMarkerAlt /> <span>{evento?.luogo}</span>
            </p>
            <p className="text-center text-lg  md:text-left">{evento?.data}</p>

            <div className="mt-6 flex justify-center space-x-2 md:justify-start xl:mt-2">
              <button
                onClick={() =>
                  addToWish({
                    id: evento?.id,
                    image: evento?.copertina,
                    heading: evento?.titolo,
                    location: evento?.luogo,
                    to: `/eventi/${evento?.slug}`,
                  })
                }
                className="flex items-center space-x-1 rounded-md bg-secondary-100 px-4 py-2 font-semibold text-secondary-500 outline-none ring-secondary-200 ring-offset-2 transition duration-200 hover:bg-secondary-200 focus:ring-2"
              >
                <FaHeart /> <span>Aggiungi nei preferiti</span>
              </button>
            </div>
            <br />
            <hr />
            <br />
            <div className="grid grid-cols-1 space-y-20 lg:grid-cols-12 lg:space-y-0">
              <div className="col-span-6 flex w-full flex-col">
                <p
                  className="prose prose-red"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(evento?.descrizione),
                  }}
                />
                <a
                  href={evento?.googleMap}
                  target="_blank"
                  style={{ width: 200 }}
                  className="buttonMaps flex items-center space-x-1  rounded-md px-4 py-2 font-semibold text-primary-500 outline-none ring-primary-200 ring-offset-2 transition duration-200 focus:ring-2"
                >
                  <FaMapMarkerAlt /> <span>Google Maps</span>
                </a>
              </div>

              <div className="col-span-5 w-full lg:ml-20">
                <h4 className="mb-4 text-xl font-semibold">
                  {commenti?.length < 1 || commenti?.length === undefined
                    ? `0 commenti`
                    : commenti?.length < 2
                    ? `${commenti?.length} commento`
                    : `${commenti?.length} commenti`}
                </h4>

                {commenti?.map((commento, i: number) => (
                  <React.Fragment key={commento.data().nome + i}>
                    <Comment
                      user={commento.data().nome}
                      text={commento.data().testo}
                    />
                  </React.Fragment>
                ))}

                <br />

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-500">
                    Cosa ne pensi di questo luogo? Lascia ora un commento
                  </p>
                  <form className="pb-20">
                    <input
                      className="searchInput form-input mb-4 w-full rounded-lg border-gray-400 py-1 caret-secondary-500 outline-none placeholder:text-gray-400 focus:border-secondary-500 focus:ring-0"
                      type="text"
                      placeholder="nome..."
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />

                    <textarea
                      rows={4}
                      className="form-textarea mb-0 w-full rounded-lg border-gray-400 py-1 caret-secondary-500 outline-none placeholder:text-gray-400 focus:border-secondary-500 focus:ring-0"
                      placeholder="commento..."
                      value={commento}
                      onChange={(e) => setCommento(e.target.value)}
                    />
                    <div className=" flex items-center justify-end">
                      {emoji.map((e) => (
                        <span
                          className="cursor-pointer"
                          onClick={() => setCommento((pre) => pre + e)}
                        >
                          {e}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={uploadComment}
                      className="group relative inline-block overflow-hidden rounded bg-purple-50 px-5 py-2.5 font-medium text-secondary-500 outline-none ring-secondary-500 ring-offset-2 transition-all duration-200 focus:ring-2"
                      type="submit"
                    >
                      <span className="absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary-500 opacity-90 transition-all duration-200 ease-out group-hover:h-full"></span>
                      <span className="relative group-hover:text-white">
                        Invia
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Evento
