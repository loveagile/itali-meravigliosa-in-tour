const WelcomeSection = (): JSX.Element => {
  return (
    <section
      id="who-we-are-section"
      className="col-span-12 !mt-4 box-border flex flex-col px-4 xl:col-span-12"
    >
      <div className="divider"></div>
      <p className="welcome-subtitle first-title !mt-14 text-center text-3xl font-semibold">
        Guida alla scoperta del Bel Paese
      </p>
      <h1 className="mt-4 text-center text-4xl font-semibold uppercase lg:text-7xl">
        Italia Meravigliosa
      </h1>
      <p className="mt-8 text-center font-medium">
        Siamo partiti dalla nostra pagina Facebook a Gennaio del 2020, con
        l’intenzione di <b>mostrarvi le meraviglie nascoste del nostro paese</b>
        , Oggi con oltre 300 mila follower e tante foto di località pubblicate e
        milioni di visualizzazioni, abbiamo deciso di creare una redazione di
        <i>“Italia Meravigliosa”</i> e di creare questo portale, perchè{" "}
        <b>possa guidarvi in luoghi meravigliosi da esplorare</b>, buon viaggio
        a tutti voi.
      </p>
      <div className="divider"></div>
    </section>
  )
}

export default WelcomeSection
