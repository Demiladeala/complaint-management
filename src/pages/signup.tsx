const Signup = () => {
  return (
    <div className="w-full md:h-screen bg-[#f4f4f4] flex justify-between md:items-center overflow-y-scroll relative container max-w-[2800px]">
        <div className="z-[1] relative w-[90%] lg:w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full basis-[50%] max-lg:hidden">
                <img src="/signup.svg" alt="signup" />
            </div>

            <div className="w-full lg:h-[95%] lg:basis-[50%] bg-white py-4 pb-7 text-primary-darkblue rounded-md max-lg:mt-7">
                <div className="w-[95%] md:w-[90%] mx-auto px-2">
                    <h3 className="poppins mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">DUNNI</h3>
                    <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">Complaint Management System</h4>

                    <p className="poppins mt-9 lg:mt-16 text-primary-gray">Sign up to create an account!</p>

                    <form className="mt-4 text-primary-gray text-lg">
                        <div>
                            <label className="">Username</label>
                            <input type="text"
                            className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg" />
                        </div>
                        
                        <div className="mt-4">
                            <label className="">Email</label>
                            <input type="email"
                            className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg" />
                        </div>

                        <div className="mt-4">
                            <label className="">Password</label>
                            <input type="password"
                            className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg" />
                        </div>

                        <button className="mt-6 w-full py-3 bg-primary-aquablue text-white flex items-center justify-center rounded
                        transition-colors duration-300 hover:bg-opacity-80">
                            Sign up
                        </button>

                        <div className="mt-3 w-full flex justify-center text-sm">
                            Already have an account?{""}
                            <a href="/login">
                            <p className="text-sm text-primary-aquablue">&nbsp;Login</p>
                            </a>
                        </div>

                    </form>
                </div>
            </div>

            <div className="max-lg:mt-4"></div>
        </div>
  </div>
  )
}

export default  Signup