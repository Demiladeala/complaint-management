const Home = () => {
  return (
    <div className="w-full h-screen lg:flex justify-center overflow-y-scroll relative container max-w-[2800px]">
      <div className="absolute h-screen inset-0">
        <div className="absolute top-0 left-0">
            <img src="/cloud-1.png" alt="cloud" className="max-md:w-56" />
        </div>

        <div className="absolute bottom-0 left-0 max-lg:hidden">
            <img src="/cloud-2.png" alt="cloud" className="relative top-9 w-[30rem]" />
        </div>
      </div>


      <div className="z-[1] relative w-[90%] lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="w-full basis-[50%] max-lg:mt-32">
          <h1 className="text-4xl lg:text-5xl 2xl:text-6xl text-primary-darkblue font-bold">
            FUTA Public Complaint System
          </h1>

          <p className="mt-4 text-lg text-stone-600">Effortlessly submit complaints, track progress, and receive timely feedback. Our streamlined system
             ensures your concerns are addressed promptly, turning your feedback into actionable solutions for a 
             better experience.</p>

            <div className="mt-5 flex items-center gap-3">
              <a href="/signup">
                <button className="py-3 px-7 rounded-lg border border-primary-aquablue 
                transition duration-300 hover:bg-stone-100 cursor-pointer">
                  Sign Up
                </button>
              </a>

              <a href="/login">
                <button className="py-3 px-9 rounded-lg border bg-primary-aquablue text-white
                transition duration-300 hover:bg-opacity-80 cursor-pointer">
                  Login
                </button>
              </a>
            </div>
        </div>

        <div className="w-full basis-[50%]">
          <img src="/hero.svg" alt="hero" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default Home