import { ChangeEvent, FormEvent, useState } from "react";
import OtpModal from "../components/otp-modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";

type FormData = {
    userName: string;
    password: string;
    email: string;
}

type Errors ={
    userName?: string;
    password?: string;
    email?: string;
}

const Signup = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        password: "",
        email: ""
    });
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = ():Errors => {
        const errors:Errors = {};
        if (!formData.userName) errors.userName = "username is required.";
        if (!formData.password) {
            errors.password = "Password is required.";
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
            errors.password = "Password must contain at least one symbol, one uppercase letter, and one number.";
        }
        if (!formData.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid.";
        }
        return errors;
    };

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            const payload = {
                username: formData.userName,
                password: formData.password,
                email: formData.email,
            };
    
            await axios.post(`${BASE_URL}/api/auth/register`, payload, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setIsOtpModalOpen(true);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // Display the error message from the API response
                const errorMessage = error.response.data.detail || 'Failed to Sign up. Please try again.';
                toast.error(errorMessage);
            } else {
                // Handle other errors
                toast.error('Failed to Sign up. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    

  return (
    <div className="w-full h-screen bg-[#f4f4f4] flex justify-between md:items-center overflow-y-auto relative container max-w-[2800px]">
        <Toaster />
        <div className="z-[1] relative w-[90%] lg:w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full basis-[50%] max-lg:hidden">
                <img src="/signup.svg" alt="signup" />
            </div>

            <div className="w-full lg:h-[95%] lg:basis-[50%] bg-white py-4 pb-7 text-primary-darkblue rounded-md max-lg:mt-7">
                <div className="w-[95%] md:w-[90%] mx-auto px-2">
                    <h3 className="poppins mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">DUNNI</h3>
                    <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">Complaint Management System</h4>

                    <p className="poppins mt-9 lg:mt-16 text-primary-gray">Sign up to create an account!</p>

                    <form 
                    onSubmit={handleSignup}
                    className="mt-4 text-primary-gray text-lg">
                        <div>
                            <label className="">Username</label>
                            <input 
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={`mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg 
                            ${errors.userName && 'border border-red-500'}`} />
                            <div className="h-4">
                            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <label className="">Email</label>
                            <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg 
                            ${errors.email && 'border border-red-500'}`} />
                            <div className="h-4">
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="">Password</label>
                            <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg 
                            ${errors.password && 'border border-red-500'}`} />
                            <div className="h-4">
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                        </div>

                        <button 
                        type="submit"
                        onClick={handleSignup}
                        className="mt-9 w-full py-3 bg-primary-aquablue text-white flex items-center justify-center rounded
                        transition-colors duration-300 hover:bg-opacity-80">
                            {isSubmitting ? 
                            <RiLoader4Fill size={20} className="text-white animate-spin mx-16"/>
                             : "Sign up"}
                        </button>

                        <div className="mt-3 w-full flex justify-center text-sm">
                            Already have an account?{""}
                            <a href="/login">
                            <p className="text-sm text-primary-aquablue">&nbsp;Login</p>
                            </a>
                        </div>

                    </form>
                </div>
            </div>

            <div className="max-lg:mt-4"></div>
        </div>
        {isOtpModalOpen && 
        <OtpModal 
        email={formData.email}
        onClose={() => setIsOtpModalOpen(false)} 
        />}
  </div>
  )
}

export default  Signup