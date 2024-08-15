import { useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const tokenFromQuery = query.get("token");
        if (tokenFromQuery) {
            setToken(tokenFromQuery);
        } else {
            // toast.error("Invalid or missing token.");
            // navigate("/login"); // Redirect to login if no token is found
        }
    }, [location, navigate]);

    const handlePasswordReset = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const payload = {
                password: password,
            };

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, payload, { headers });
            toast.success("Password reset successful.");
            navigate("/login"); // Redirect to login after successful reset
        } catch (error) {
            toast.error("Failed to reset password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-screen overflow-y-auto bg-[#f4f4f4] flex justify-between items-center relative container max-w-[2800px]">
            <Toaster />
            <div className="z-[1] relative w-[90%] lg:w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="w-full basis-[50%] max-lg:hidden">
                    <img src="/reset-password.svg" alt="reset password" />
                </div>

                <div className="w-full lg:h-[95%] lg:basis-[50%] bg-white py-4 pb-7 text-primary-darkblue rounded-md max-lg:mt-7">
                    <div className="w-[95%] md:w-[90%] mx-auto px-2">
                        <h3 className="poppins mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">DUNNI</h3>
                        <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">Complaint Management System</h4>

                        <p className="poppins mt-9 lg:mt-16 text-primary-gray">Reset your password</p>

                        <form onSubmit={handlePasswordReset} className="mt-4 text-primary-gray text-lg">
                            <div className="mt-4">
                                <label className="">New Password</label>
                                <input 
                                    type="password"
                                    className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="">Confirm Password</label>
                                <input 
                                    type="password"
                                    className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="mt-9 w-full py-3 bg-primary-aquablue text-white flex items-center justify-center 
                                rounded transition-colors duration-300 hover:bg-opacity-80">
                                {isSubmitting ?
                                <RiLoader4Fill size={20} className="text-white animate-spin" /> 
                                :
                                "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="max-lg:mt-4"></div>
            </div>
        </div>
    );
};

export default ResetPassword;