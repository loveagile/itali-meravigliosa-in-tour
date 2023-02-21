const Mission = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="flex h-[540px] w-full flex-col items-center justify-center text-center lg:h-[460px]"
        style={{ backgroundColor: "rgb(59 130 246 / 0.5)" }}
      >
        <h4 className="text-[40px] font-semibold text-white">MISSION</h4>
        <br />
        <p className="w-[85%] text-center text-2xl italic text-gray-500">
          “Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni
          angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con occhi
          nuovi con Italia Meravigliosa in Tour. ”
        </p>
        <br />
        <br />
        <br />
        <br />
        <p className="text-2xl font-medium text-white">Paolo Artista</p>
        <p className="mt-2 text-lg font-medium text-gray-500">
          CEO & Founder Italia Meravigliosa
        </p>
      </div>
    </div>
  )
}

export default Mission
