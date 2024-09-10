import { ChangeEvent, FormEvent, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../components/api";

type FormData = {
  email: string;
  password: string;
  accountType: string; // New field for account type (student or staff)
};

type Errors = {
  email?: string;
  password?: string;
  accountType?: string;
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    accountType: "student", // Default to student
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (): Errors => {
    const errors: Errors = {};
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }
    if (!formData.accountType) {
      errors.accountType = "Please select an account type.";
    }
    return errors;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await api.post('/api/auth/token', {
        username: formData.email,
        password: formData.password,
      });

      // Save tokens to localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 || status === 404) {
          const errorMessage = data.detail || 'An error occurred. Please try again.';
          toast.error(errorMessage);
        } else {
          toast.error('Failed to Login. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
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
    <div className="w-full h-screen bg-[#f4f4f4] flex justify-between items-center overflow-y-auto relative container max-w-[2800px]">
      <Toaster />
      <div className="z-[1] relative w-[90%] lg:w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="w-full basis-[50%] max-lg:hidden">
          <img src="/login.svg" alt="login" />
        </div>

        <div className="w-full lg:h-[95%] lg:basis-[50%] bg-white py-4 pb-7 text-primary-darkblue rounded-md max-lg:mt-7">
          <div className="w-[95%] md:w-[90%] mx-auto px-2">
            <h3 className="poppins mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">FUTA</h3>
            <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">Public Complaint System</h4>

            <p className="poppins mt-9 lg:mt-16 text-primary-gray">Login to your account!</p>

            <form onSubmit={handleLogin} className="mt-4 text-primary-gray text-lg">
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg ${errors.email && 'border-red-500'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg ${errors.password && 'border-red-500'}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="mt-4">
                <label>Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg"
                >
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                </select>
                {errors.accountType && <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>}
              </div>

              <div className="mt-2 w-full flex justify-end">
                <a href="/forgot-password" className="text-sm text-primary-aquablue">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-3 bg-primary-aquablue text-white flex items-center justify-center rounded transition-colors duration-300 hover:bg-opacity-80"
              >
                {isSubmitting ? <RiLoader4Fill size={20} className="text-white animate-spin" /> : "Login"}
              </button>

              <div className="mt-3 w-full flex justify-center text-sm">
                Don't have an account? &nbsp;
                <a href="/signup" className="text-primary-aquablue">
                  Signup
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="max-lg:mt-4"></div>
      </div>
    </div>
  );
};

export default Login;