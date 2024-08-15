import { AiOutlineLike } from "react-icons/ai"
import { BsFillPauseBtnFill, BsStopwatch } from "react-icons/bs"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { RxDoubleArrowDown, RxDoubleArrowRight } from "react-icons/rx"
import { TbMailPause } from "react-icons/tb"
import { VscOutput } from "react-icons/vsc"
import StatusCard from "./status-card"
import { ComplaintsByStatusChart, ComplaintsByTypeChart, TotalComplaintsChart } from "./charts"
import RecentComplaints from "./recent-complaints"

const statusConfig = [
    {
      title: "New",
      count: 0,
      icon: <VscOutput size={35} />,
      color: "text-[#FF5733]",
      arrow: <RxDoubleArrowDown />,
      description: "Fresh issues"
    },
    {
      title: "Pending",
      count: 0,
      icon: <BsStopwatch size={30} />,
      color: "text-yellow-500",
      arrow: <RxDoubleArrowRight />,
      description: "In progress"
    },
    {
      title: "Resolved",
      count: 0,
      icon: <AiOutlineLike size={35} />,
      color: "text-[#28A745]",
      arrow: <IoMdCheckmarkCircleOutline />,
      description: "Issues closed"
    },
    {
      title: "Paused",
      count: 0,
      icon: <TbMailPause size={35} />,
      color: "text-primary-gray",
      arrow: <BsFillPauseBtnFill />,
      description: "On hold"
    }
  ]


  const dashboardData = {
    totalComplaints: [
      { date: '2024-01-01', complaints: 120 },
      { date: '2024-02-01', complaints: 80 },
      { date: '2024-03-01', complaints: 180 },
      // Add more data points
    ],
    complaintsByType: [
      { type: 'Technical', value: 300 },
      { type: 'Billing', value: 150 },
      { type: 'Customer Service', value: 100 },
      // Add more types
    ],
    complaintsByStatus: [
      { status: 'New', count: 50 },
      { status: 'In Progress', count: 80 },
      { status: 'Resolved', count: 70 },
      { status: 'On Hold', count: 30 },
      // Add more statuses
    ],
  };

const DashboardMetrics = () => {

  return (
    <div className="mt-16">
       <div className="border-y py-8 lg:py-12 border-gray-100">
             <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                {statusConfig.map((status, index) => (
                <StatusCard 
                key={index} 
                {...status} 
                isLast={index === statusConfig.length - 1}/>
                ))}
            </div>
       </div>

        <div className="mt-16 lg:mt-24">
            <div className="dashboard-analytics mt-16">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="chart-container lg:col-span-3">
                    <h3 className="mb-2 font-semibold text-lg">Total Complaints Submitted</h3>
                    <TotalComplaintsChart data={dashboardData.totalComplaints} />
                    </div>

                    <div className="chart-container lg:col-span-1">
                    <h3 className="mb-2 font-semibold text-lg">Complaints by Type</h3>
                    <ComplaintsByTypeChart data={dashboardData.complaintsByType} />
                    </div>

                    <div className="chart-container lg:col-span-1">
                    <h3 className="mb-2 font-semibold text-lg">Complaints by Status</h3>
                    <ComplaintsByStatusChart data={dashboardData.complaintsByStatus} />
                    </div>
                </div>
            </div>
        </div>

        <RecentComplaints />
    </div>
  )
}

export default DashboardMetrics