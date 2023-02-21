import CVForm from "../components/CVForm"
import SeoHead from "../components/Seo/SeoHead"
import { NextPage } from "next"

const LavoraConNoi: NextPage = () => {
  return (
    <div className="mx-auto mt-24 max-w-6xl">
      <SeoHead
        title="Italia Meravigliosa in tour"
        description="Trova luoghi meravigliosi in tutta Italia alla portata di un click."
        imageUrl="/apple-touch-icon.png" 
      />
      <main className="flex w-full flex-col px-4">
        <h4 className="text-center text-4xl font-bold md:text-left">
          Lavora con Noi
        </h4>
        <br />
        <CVForm />

        <br />
        <br />

        {/* <div className="w-full bg-gray-100">
          <p className="mt-2 ml-2 rounded-lg text-gray-500">Pubblicità</p> */}

          {/* <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1708355893696705"
            data-ad-slot="9487119343"
            data-ad-format="auto"
            data-full-width-responsive="true"
         ></ins> */}
       {/* </div> */}
      </main>
    </div>
  )
}

export default LavoraConNoi
