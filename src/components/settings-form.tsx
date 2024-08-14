const SettingsForm = () => {
  return (
    <main className="pb-[4rem]">
        <div className="h-[17rem] w-full relative">
            <div className="absolute inset-0 bg-black/50"></div>
            <img src="/settings.jpg" alt="settings-hero"
            className="w-full h-full object-cover bg-cover bg-no-repeat" />
        </div>   

        <div className="w-[90%] mx-auto text-primary-darkblue">
            <div className="flex items-start gap-3">
                <div className="relative h-40 w-40 rounded-full bg-white p-2">
                    <img src="/profile.png" alt="profile" 
                    className="z-[1] relative top-[-3rem] w-full h-full rounded-full object-cover border-4"/>
                </div>

                <div>
                    <h3 className="text-2xl mt-3 font-semibold">Settings</h3>
                    <p className="text-primary-gray">user@gmail.com</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold">Password</h2>
                <p className="mt-1 2xl:text-xl font-medium text-gray-500">
                    Please enter your current password to change your password
                </p>


                <div className="mt-10 lg:mt-16 flex flex-col lg:flex-row lg:items-center gap-5">
                    <label className="font-medium">Current Password</label>
                    <input type="password"
                    className="mt-1 outline-none p-3 w-full lg:w-[60%] border border-primary-gray rounded-lg" />
                </div>

                <div className="mt-4 lg:mt-16 flex flex-col lg:flex-row lg:items-center gap-5">
                    <label className="font-medium">New Password</label>
                    <input type="password"
                    className="mt-1 outline-none p-3 w-full lg:w-[60%] border border-primary-gray rounded-lg" />
                </div>

                <div className="mt-4 lg:mt-16 flex flex-col lg:flex-row lg:items-center gap-5">
                    <label className="font-medium">Confirm Password</label>
                    <input type="password"
                    className="mt-1 outline-none p-3 w-full lg:w-[60%] border border-primary-gray rounded-lg" />
                </div>
            </div>
        </div>
    </main>
  )
}

export default SettingsForm