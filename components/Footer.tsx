import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaEnvelope, FaFacebook, FaDownload } from "react-icons/fa"
import BuyMeCoffee from "./BuyMeCoffee"

const Footer = () => {
  return (
    <footer>
      <Link href="/servizi.pdf" target="_blank" download>
        <a className="wrapperUsername wrapperUsername2">
          <FaDownload />
          Scarica ora i nostri servizi
        </a>
      </Link>

      <div className="divider"></div>
      <div
        style={{ display: "flex", alignItems: "center", flexFlow: "column" }}
        className="footerWrapper !m-0 rounded-xl py-6"
      >
        <Link href="/" passHref>
          <a
            className="rounded-xl bg-white p-2   outline-none ring-primary-200 transition duration-200 focus:ring-2"
            style={{ margin: "20px 0" }}
          >
            <div className="flex items-center">
              <Image
                src="/images/fullLogo.png"
                objectFit="contain"
                layout="intrinsic"
                width={180}
                height={40}
                alt="hand"
                title="italia meravigliosa in tour"
                className="logo_navbar"
              />
            </div>
          </a>
        </Link>

        <div style={{ display: "flex", alignItems: "center" }}>
          <FaEnvelope color="gray" />{" "}
          <Link href="mailto:info@italiameravigliosaintour.it">
            <a className="footer-email">info@italiameravigliosaintour.it</a>
          </Link>
        </div>
        <br />
        <BuyMeCoffee />
        <br />

        <Link
          href="https://www.iubenda.com/privacy-policy/76997417"
          title="Privacy Policy"
        >
          <a className="iubenda">Privacy Policy</a>
        </Link>

        <Link href="https://www.iubenda.com/termini-e-condizioni/76997417">
          <a className="iubenda">Termini e Condizioni</a>
        </Link>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #1e90ff",
            maxHeight: 43,
            borderRadius: 6,
            padding: 14,
            margin: "16px 0 44px 0",
            maxWidth: 264,
            alignSelf: "center",
            position: "relative",
            bottom: 35,
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
                color: "#007aff",
              }}
              title="Pagina Facebook"
            >
              Seguici su Facebook
            </a>
          </Link>
        </div>
        <br />
        <div className="copyright-wrapper">
          <span>
            Copyright © 2022 Italia Meravigliosa in Tour | Tutti i diritti sono
            riservati. P.Iva: 04471240400
          </span>

          <br />
          <br />

          <div className="credit-footer">
            Powered by:
            <Link href="https://applabstudio.com/">
              <a>
                <Image
                  src="/images/applab_logo2.png"
                  objectFit="contain"
                  layout="intrinsic"
                  width={60}
                  height={30}
                  alt="hand"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
