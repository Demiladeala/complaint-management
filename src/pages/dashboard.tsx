import DashboardDetails from "../components/dashboard-details"
import SideBar from "../components/side-bar"

const Dashboard = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <SideBar/>
        <DashboardDetails/>
    </main>
  )
}

export default Dashboard