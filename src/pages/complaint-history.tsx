import RecentComplaints from "../components/recent-complaints"
import SideBar from "../components/side-bar"

const History = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px]">
        <SideBar/>
        <div className="w-full flex lg:justify-end">
            <div className="w-full lg:w-[84%] flex bg-white text-primary-darkblue h-screen pt-8 lg:pt-12 overflow-y-scroll">
              <div className="w-[90%] mx-auto">
                <RecentComplaints page={true}/>
              </div>
          </div>
        </div>
    </main>
  )
}

export default History