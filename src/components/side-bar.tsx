import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaHomeSolid } from "react-icons/lia";
import { RiHistoryFill } from "react-icons/ri";


const SideBar = () => {
    const location = useLocation();

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: <LiaHomeSolid size={24} /> },
        { path: '/complaint', label: 'Make Complaint', icon: <FaBook size={24}/> },
        { path: '/settings', label: 'Settings', icon: <IoSettingsOutline size={24}/> },
        { path: '/history', label: 'Complaint History', icon: <RiHistoryFill size={24}/> },
    ];
    
    const linkClass = (path: string) => 
        `w-full flex items-center gap-2 transition-all duration-300 py-3 px-4 rounded-lg ${
        location.pathname === path ? "bg-primary-darkblue text-white" : "text-primary-black hover:bg-gray-100"
    }`;

  return (
    <div className="z-[3] fixed max-lg:hidden w-[16%] h-screen bg-white border-r border-gray-100 text-primary-darkblue">
        <h3 className="poppins mt-10 md:mt-14 text-xl md:text-2xl 2xl:text-3xl font-bold text-center">DUNNI</h3>
        <h4 className="mt-1 text-center font-medium text-gray-500">Complaint Management System</h4>

        <div className="mt-16 w-[90%] mx-auto text-sm font-medium">
                {links.map((link, index) => (
                    <a href={link.path} key={index}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <button className={`${index > 0 ? 'mt-4' : ''} ${linkClass(link.path)}`}>
                                <motion.div
                                    whileHover={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {link.icon}
                                </motion.div>
                                <h4>{link.label}</h4>
                            </button>
                        </motion.div>
                    </a>
                ))}
            </div>
        
    </div>
  )
}

export default SideBar