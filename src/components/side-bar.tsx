import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaHomeSolid } from "react-icons/lia";
import { RiHistoryFill } from "react-icons/ri";
import { useState } from "react";

export const links = [
    { path: '/dashboard', label: 'Dashboard', icon: <LiaHomeSolid size={24} /> },
    { path: '/complaint', label: 'Make Complaint', icon: <FaBook size={24}/> },
    { path: '/settings', label: 'Settings', icon: <IoSettingsOutline size={24}/> },
    { path: '/history', label: 'Complaint History', icon: <RiHistoryFill size={24}/> },
];


const SideBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    const linkClass = (path: string) => 
        `w-full flex items-center gap-2 transition-all duration-300 py-3 px-4 rounded-lg ${
        location.pathname === path ? "bg-primary-darkblue text-white" : "text-primary-black hover:bg-gray-100"
    }`;

  return (
    <>
    {/* Hamburger Button for Mobile */}
    <div className="lg:hidden fixed top-0 left-0 w-full 
    flex items-center justify-between box-shadow p-2 bg-white z-50">
       <div className="">
            <h3 className="poppins text-lg font-bold">FUTA</h3>
            <h4 className="font-medium text-gray-500">Public Complaint System</h4>
       </div>

        <div className="lg:hidden mb-2 top-4 right-4 ">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full bg-primary-darkblue text-white">
                <span className="sr-only">Open menu</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-white px-5 border-r border-gray-100 text-primary-darkblue lg:hidden transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="w-full h-full">
                    <div className="px-1 py-3">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary-darkblue">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <h3 className="poppins text-2xl md:text-3xl 2xl:text-4xl font-bold">FUTA</h3>
                        <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">Public Complaint System</h4>
                    </div>
                    <div className="mt-16 w-full text-sm font-medium">
                        {links.map((link, index) => (
                            <a href={link.path} key={index} onClick={() => setIsMobileMenuOpen(false)}>
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
            </div>

            <div className="pt-12 lg:hidden"></div>
    <div className="z-[3] fixed max-lg:hidden w-[16%] h-screen bg-white border-r border-gray-100 text-primary-darkblue">
        <h3 className="poppins mt-10 md:mt-14 text-xl md:text-2xl 2xl:text-3xl font-bold text-center">FUTA</h3>
        <h4 className="mt-1 text-center font-medium text-gray-500">Public Complaint System</h4>

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
    </>
  )
}

export default SideBar