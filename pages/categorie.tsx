// @ts-nocheck
import React, { useEffect, useState } from "react"
import { firestore } from "../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import Head from 'next/head'
import SeoHead from "../components/Seo/SeoHead"
import Link from "next/link"
import { NextPage } from "next"

const Categorie: NextPage = () => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "categoria" &&
        setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])

  return (
    <div className="mx-auto mt-24 max-w-6xl">
      <Head>
        <meta property="og:title" content="Trova luoghi meravigliosi in tutta Italia alla portata di un click" />
        <meta property="og:image" itemProp="image" content={categorie?.icona} />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://www.italiameravigliosaintour.it" />
      </Head>

      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold md:text-left">
          Lista delle categorie
        </h4>

        <br />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {categorie.length > 0 &&
            categorie.map((categoria) => (
              <div
                key={categoria?.titolo}
                className="w-full rounded-md bg-primary-100 px-2 text-center text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
              >
                <Link href={`/categoria/${categoria?.titolo}`}>
                  <span className="flex cursor-pointer items-center justify-center space-x-2">
                    <img className="h-4 w-4" src={categoria?.icona} alt="" />
                    <div>{categoria?.titolo}</div>
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}

export default Categorie
