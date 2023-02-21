// @ts-nocheck
import React, { useEffect, useState } from "react"
import { collection } from "firebase/firestore"
import { NextPage } from "next"
import Event from "../../components/Event"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import BannerAds from "../../components/layout/BannerAds"
import SeoHead from "../../components/Seo/SeoHead"

const Provincia: NextPage = ({ slug }: { slug: string }) => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaEventi, setListaEventi] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento" &&
        setListaEventi((listaEventi) => [...listaEventi, d.data()])
    })
  }, [data])

  const eventi = listaEventi.filter((doc) => doc?.luogo === slug)
  const ADSENSE_PUBLISHER_KEY = "ca-pub-7292810486004926"
  const ADSENSE_SLOT = "7610040244"

  return (
    <div className="mx-auto mt-24 max-w-6xl">

      <SeoHead
        title="Italia Meravigliosa in tour"
        description="Trova luoghi meravigliosi in tutta Italia alla portata di un click."
        imageUrl="/apple-touch-icon.png" 
      />

      <main className="flex w-full flex-col px-4">
        <br />
        <h4 className="text-center text-4xl font-bold md:text-left uppercase ">
          Luoghi a {slug}
        </h4>

        <br />

        {eventi?.length > 0 ? (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {eventi?.map((evento) => (
              <React.Fragment key={evento?.id}>
                <Event
                  image={evento?.copertina}
                  heading={evento?.titolo}
                  location={evento?.luogo}
                  btnText="Scopri di più"
                  icon={evento?.categorie?.at(0)?.id}
                  to={`/eventi/${evento?.slug}`}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-gray-500">
            {/* Attendere... Al momento non sono presenti luoghi in questa provincia */}
            Caricamento...
          </p>
        )}

        <br />
        <br />

        <div
          className="col-span-12 !m-0"
          style={{
            width: "100%",
          }}
        >
          <div
            className="mx-auto max-w-7xl"
            style={{
              width: "100%",
              display: "flex",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="text-center"
          >
            <div>
              <ins
                className="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={ADSENSE_PUBLISHER_KEY}
                data-ad-slot={ADSENSE_SLOT}
              ></ins>
            </div>
            <BannerAds />
            <br />
            <br />
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params

  return {
    props: {
      slug,
    },
  }
}

export default Provincia
