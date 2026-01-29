import Link from "next/link"

const Game = () => {
  return (
    <section className="mx-3 md:mx-auto max-w-screen-lg px-3 sm:px-6 py-5 sm:py-12 rounded-2xl shadow-xl bg-gradient-to-r from-primary to-secondary text-white text-center flex flex-col items-center gap-6">
      <h2 className="text-3xl sm:text-5xl font-light tracking-wide leading-tight">
        Hidden Costs <br className="block md:hidden" />
        <span className="block text-xl md:text-5xl mt-2 md:mt-0">
          – Can You Find Them?
        </span>
      </h2>

      <p className="text-base sm:text-lg font-light tracking-wide sm:w-3/4">
        There’s more to a ship’s budget than what meets the eye. Can you uncover
        the hidden expenses before they take you by surprise?
      </p>

      <Link href="https://hiddencosts.nautilusshipping.com/?utm_source=website&utm_medium=game&utm_campaign=website" target="_blank">
        <button
          className="group relative py-2 px-6 rounded-lg border border-white/20 bg-white text-primary font-medium shadow-lg hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out hover:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Play the Hidden Costs Game"
        >
          Play the Game Now
          <span className="absolute inset-0 rounded-lg bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        </button>
      </Link>
    </section>
  )
}

export default Game
