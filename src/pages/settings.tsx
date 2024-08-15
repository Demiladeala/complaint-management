import SettingsForm from "../components/settings-form"
import SideBar from "../components/side-bar"

const Settings = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <SideBar/>
        <div className="w-full flex lg:justify-end">
            <div className="w-full lg:w-[84%] flex bg-white text-primary-darkblue h-screen overflow-y-auto">
              <div className="w-full">
                <SettingsForm />
              </div>
          </div>
        </div>
    </main>
  )
}

export default Settings