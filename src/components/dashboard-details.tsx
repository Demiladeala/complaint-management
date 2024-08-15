import { useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import DashboardMetrics from "./dashboard-metrics";
import api from "./api";

type User = {
    username: string;
    email: string;
    id: string;
    is_active: boolean;
    is_superuser: boolean;
    last_login: string;
};

type Complaint = {
    type: string;
    description: string;
    supporting_docs: string[];
    id: string;
    user_id: string;
    created_at: string;
    status: string;
    feedbacks: {
        message: string;
        id: string;
        user_id: string;
        complaint_id: string;
        created_at: string;
    }[];
};

const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const DashboardDetails = () => {
    const [user, setUser] = useState<User | null>(null);
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const today = formatDate(new Date());

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/users/me`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchComplaints = async () => {
            try {
                const response = await api.get(`/complaints`, {
                });
                setComplaints(response.data.items);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchUserData();
        fetchComplaints();
    }, []);

    return (
        <div className="w-full flex lg:justify-end">
            <div className="w-full lg:w-[84%] flex bg-white text-primary-darkblue h-screen pt-8 lg:pt-12 overflow-y-scroll">
                <div className="w-[90%] mx-auto">

                    <div className="flex flex-col gap-7 md:flex-row md:items-start justify-between">

                        <div className="flex flex-col gap-1">
                            <h3 className="poppins text-2xl md:text-3xl 2xl:text-4xl font-bold">
                                Hello, {user?.username || "User"}
                            </h3>
                            <h4 className="mt-[2px] text-lg font-medium text-gray-500">
                                Manage complaints, track history, and settings.
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <div>
                                <p>{today}</p>
                            </div>
                            <div className="bg-[#f3f2f2] p-2 rounded-full">
                                <LuCalendarDays size={20} className="text-primary-darkblue" />
                            </div>
                        </div>
                    </div>

                    <DashboardMetrics />

                    <div className="pt-4"></div>
                </div>
            </div>
        </div>
    );
};

export default DashboardDetails;