import { ChangeEvent, FormEvent, useState } from "react";
import OtpModal from "../components/otp-modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";

type FormData = {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  school: string;
  department: string;
  accountType: "student" | "staff";
};

type Errors = {
  userName?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  school?: string;
  department?: string;
};

const Signup = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    school: "",
    department: "",
    accountType: "student", // default account type
  });
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): Errors => {
    const errors: Errors = {};
    if (!formData.userName) errors.userName = "Username is required.";
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      errors.password =
        "Password must contain at least one symbol, one uppercase letter, and one number.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!formData.school) errors.school = "School is required.";
    if (!formData.department) errors.department = "Department is required.";
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
        firstname: formData.firstName,
        lastname: formData.lastName,
        school: formData.school,
        department: formData.department,
      };

      const endpoint =
        formData.accountType === "staff"
          ? `${BASE_URL}/api/auth/register_staff`
          : `${BASE_URL}/api/auth/register_student`;

      await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setIsOtpModalOpen(true);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage =
          error.response.data.detail || "Failed to Sign up. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to Sign up. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
            <h3 className="poppins mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">
              FUTA
            </h3>
            <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">
              Public Complaint System
            </h4>

            <p className="poppins mt-9 lg:mt-16 text-primary-gray">
              Sign up to create an account!
            </p>

            <form onSubmit={handleSignup} className="mt-4 text-primary-gray text-lg">
                <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
                    <div>
                        <label>Username</label>
                        <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.userName && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.userName && (
                            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                        )}
                        </div>
                    </div>

                    <div className="">
                        <label>Email</label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.email && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                        </div>
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">

                    <div className="">
                        <label>First Name</label>
                        <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.firstName && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                        </div>
                    </div>

                    <div className="">
                        <label>Last Name</label>
                        <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.lastName && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                        </div>
                    </div>
                </div>
                  
                <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
                    <div className="">
                        <label>School</label>
                        <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.school && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.school && (
                            <p className="text-red-500 text-sm mt-1">{errors.school}</p>
                        )}
                        </div>
                    </div>

                    <div className="">
                        <label>Department</label>
                        <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.department && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.department && (
                            <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                        )}
                        </div>
                    </div>
                </div>


                <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
                    <div className="">
                        <label>Account Type</label>
                        <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                        className="mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg"
                        >
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                        </select>
                    </div>

                    <div className="">
                        <label>Password</label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 outline-none w-full p-2 border border-primary-gray rounded-lg ${
                            errors.password && "border border-red-500"
                        }`}
                        />
                        <div className="h-4">
                        {errors.password && (
                            <p className="text-red-500 max-sm:text-[9px] max-sm:leading-3 text-xs mt-1">
                            {errors.password}</p>
                        )}
                        </div>
                    </div>
                </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full p-3 bg-primary-aquablue text-white rounded-lg hover:bg-opacity-80 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <RiLoader4Fill className="animate-spin inline-block" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                
              </div>

              <div className="mt-3 w-full flex justify-center text-sm">
                Have an account already? &nbsp;
                <a href="/login" className="text-primary-aquablue">
                  Login
                </a>
              </div>
            </form>

            {/* OTP Modal */}
            {isOtpModalOpen &&  <OtpModal 
            email={formData.email}
            onClose={() => setIsOtpModalOpen(false)} 
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;