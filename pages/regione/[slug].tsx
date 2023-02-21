// @ts-nocheck
import React, { useEffect, useState } from "react"
import { collection } from "firebase/firestore"
import { NextPage } from "next"
import Event from "../../components/Event"
import { firestore } from "../../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"
import BannerAds from "../../components/layout/BannerAds"
import SeoHead from "../../components/Seo/SeoHead"

const regions = {
  "0": {
    states: ["ITA5418", "ITA5419", "ITA5420", "ITA5421"],
    name: "Abruzzo",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "abruzzo",
  },
  "1": {
    states: ["ITA5389", "ITA5390"],
    name: "Basilicata",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "basilicata",
  },
  "2": {
    states: ["ITA5391", "ITA5392", "ITA5393", "ITA5394", "ITA5395"],
    name: "Calabria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "calabria",
  },
  "3": {
    states: ["ITA5396", "ITA5397", "ITA5398", "ITA5399", "ITA5400"],
    name: "Campania",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "campania",
  },
  "4": {
    states: [
      "ITA5358",
      "ITA5359",
      "ITA5360",
      "ITA5361",
      "ITA5362",
      "ITA5363",
      "ITA5364",
      "ITA5365",
      "ITA5366",
    ],
    name: "Emilia-Romagna",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "emilia-romagna",
  },
  "5": {
    states: ["ITA5455", "ITA5456", "ITA5457", "ITA5458"],
    name: "Friuli-Venezia Giulia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "friuli-venezia-giulia",
  },
  "6": {
    states: ["ITA5422", "ITA5423", "ITA5424", "ITA5425", "ITA5426"],
    name: "Lazio",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "lazio",
    slug: "lazio",
  },
  "7": {
    states: ["ITA5367", "ITA5368", "ITA5369", "ITA5370"],
    name: "Liguria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "liguria",
  },
  "8": {
    states: [
      "ITA5443",
      "ITA5444",
      "ITA5445",
      "ITA5446",
      "ITA5447",
      "ITA5448",
      "ITA5449",
      "ITA5450",
      "ITA5451",
      "ITA5452",
      "ITA5453",
      "ITA5454",
    ],
    name: "Lombardia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "lombardia",
  },
  "9": {
    states: ["ITA5427", "ITA5428", "ITA5429", "ITA5430", "ITA5431"],
    name: "Marche",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "marche",
  },
  "10": {
    states: ["ITA5401", "ITA5402"],
    name: "Molise",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "molise",
  },
  "11": {
    states: [
      "ITA5434",
      "ITA5435",
      "ITA5436",
      "ITA5437",
      "ITA5438",
      "ITA5439",
      "ITA5440",
      "ITA5441",
    ],
    name: "Piemonte",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "piemonte",
  },
  "12": {
    states: ["ITA5403", "ITA5404", "ITA5405", "ITA5406", "ITA5407", "ITA5408"],
    name: "Puglia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "puglia",
  },
  "13": {
    states: [
      "ITA5371",
      "ITA5372",
      "ITA5373",
      "ITA5374",
      "ITA5375",
      "ITA5376",
      "ITA5377",
      "ITA5378",
    ],
    name: "Sardegna",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "sardegna",
  },
  "14": {
    states: [
      "ITA5409",
      "ITA5410",
      "ITA5411",
      "ITA5412",
      "ITA5413",
      "ITA5414",
      "ITA5415",
      "ITA5416",
      "ITA5417",
    ],
    name: "Sicilia",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "sicilia",
  },
  "15": {
    states: [
      "ITA5379",
      "ITA5380",
      "ITA5381",
      "ITA5382",
      "ITA5383",
      "ITA5384",
      "ITA5385",
      "ITA5386",
      "ITA5387",
      "ITA5388",
    ],
    name: "Toscana",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "toscana",
  },
  "16": {
    states: ["ITA5459", "ITA5460"],
    name: "Trentino-Alto Adige",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "trentino-alto-adige",
  },
  "17": {
    states: ["ITA5432", "ITA5433"],
    name: "Umbria",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "umbria",
  },
  "18": {
    states: ["ITA5442"],
    name: "Valle d'Aosta",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "valle-d-aosta",
  },
  "19": {
    states: [
      "ITA5461",
      "ITA5462",
      "ITA5463",
      "ITA5464",
      "ITA5465",
      "ITA5466",
      "ITA5467",
    ],
    name: "Veneto",
    color: "#d1d5db",
    hover_color: "#6ee7b7",
    slug: "veneto",
  },
}

const Regione: NextPage = ({ slug }: { slug: string }) => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )

  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [region, setRegion] = useState("")

  useEffect(() => {
    for (const key in regions) {
      if (regions[key].slug === slug) {
        setRegion(regions[key].name)
      }
    }

    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento" &&
        setListaEventi((listaEventi) => [...listaEventi, d.data()])
    })
  }, [data])

  const eventi = listaEventi.filter((doc) => doc?.region === region)

  const ADSENSE_PUBLISHER_KEY = "ca-pub-7292810486004926"
  const ADSENSE_SLOT = "7610040244"

  return (
    <div className="mx-auto mt-28 max-w-6xl">
      <Head>
        <meta property="og:title" content="Trova luoghi meravigliosi in tutta Italia alla portata di un click" />
        <meta property="og:image" itemProp="image" content={evento?.copertina} />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://www.italiameravigliosaintour.it" />
      </Head>
      
      <main className="flex w-full flex-col px-4">
        {/* <div className="w-full bg-gray-100">
          <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p>

          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1708355893696705"
            data-ad-slot="9487119343"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div> */}

        <br />
        <br />

        <h4 className="text-center text-4xl font-bold md:text-left">
          Luoghi in {region}
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
                  icon={evento?.categorie?.at(0).id}
                  btnText="Scopri di più"
                  to={`/eventi/${evento?.slug}`}
                />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-gray-500">
            {/* Attendere... Al momento non sono presenti luoghi in questa regione */}
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

export default Regione
