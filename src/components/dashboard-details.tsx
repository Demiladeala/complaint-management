import { LuCalendarDays } from "react-icons/lu";
import DashboardMetrics from "./dashboard-metrics";

type Props = {
   
}

const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const DashboardDetails = ({ }: Props) => {
    const today = formatDate(new Date());
    return (
        <div className="w-full flex lg:justify-end">
            <div className="w-full lg:w-[84%] flex bg-white text-primary-darkblue h-screen pt-8 lg:pt-12 overflow-y-scroll">
                <div className="w-[90%] mx-auto">

                  <div className="flex flex-col gap-7 md:flex-row md:items-start justify-between">

                    <div className="flex flex-col gap-1">
                      <h3 className="poppins text-2xl md:text-3xl 2xl:text-4xl font-bold">Hello, User</h3>
                      <h4 className="mt-[2px] text-lg font-medium text-gray-500">
                      Manage complaints, track history, and settings.
                      </h4>
                    </div>

                    <div className="flex items-center gap-1">
                        <div>
                            <p>{today}</p>
                        </div>
                        <div className="bg-[#f3f2f2] p-2 rounded-full">
                          <LuCalendarDays size={20} className="text-primary-darkblue"/>
                        </div>
                    </div>
                  </div>

                  <DashboardMetrics />

                    <div className="pt-4"></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardDetails;