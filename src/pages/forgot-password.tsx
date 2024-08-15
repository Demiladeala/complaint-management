import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/notification-modal";
import toast from "react-hot-toast";
import api from "../components/api";
import { RiLoader4Fill } from "react-icons/ri";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const handleForgotPassword = async (event: FormEvent) => {
  event.preventDefault();
  setEmailError(null); // Reset error state

  // Validate email
  if (!email) {
      setEmailError("Email is required.");
      return;
  }
  if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
  }

  setIsSubmitting(true);

  try {
      const response = await api.post('/auth/forgot-password', 
          new URLSearchParams({ email }),
      );

      if (response.status === 202) {
          setIsModalOpen(true);
      } else {
          // Handle unexpected responses
          toast.error('Something went wrong. Please try again.');
      }
  } catch (error: any) {
      if (error.response && error.response.status === 404) {
          toast.error('User not found.');
      } else if (error.response && error.response.status === 422) {
          toast.error('Validation error. Please check your input.');
      } else {
          toast.error('Failed to send reset link. Please try again.');
      }
  } finally {
      setIsSubmitting(false);
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/forgot-password");
  };

  return (
    <div className="w-full h-screen bg-[#f4f4f4] flex justify-between md:items-center overflow-y-auto relative container max-w-[2800px]">
        <div className="z-[1] relative w-[90%] lg:w-[95%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full basis-[50%] max-lg:hidden">
                <img src="/forgot-password.svg" alt="signup" />
            </div>

            <div className="w-full lg:h-[95%] lg:basis-[50%] bg-white py-4 pb-7 text-primary-darkblue rounded-md max-lg:mt-7">
                <div className="w-[95%] md:w-[90%] mx-auto px-2">
                    <h3 className="poppins mt-10 md:mt-14 text-2xl md:text-3xl 2xl:text-4xl font-bold">DUNNI</h3>
                    <h4 className="mt-1 text-lg md:text-xl font-medium text-gray-500">Complaint Management System</h4>

                    <p className="poppins mt-9 lg:mt-16 text-primary-gray">Enter email to reset password</p>

                    <form className="mt-4 text-primary-gray text-lg">
                        
                        <div className="mt-4">
                          <label className="">Email</label>
                          <input 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`mt-1 outline-none w-full p-3 border rounded-lg 
                          ${emailError ? "border-red-400" : "border-primary-gray"}`} />

                          <div className="h-4">
                            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
                          </div>
                        </div>

                        <button 
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleForgotPassword}
                        className={`mt-8 w-full py-3 text-white flex items-center justify-center rounded
                        transition-colors duration-300 hover:bg-opacity-80 
                        ${isSubmitting ? "bg-stone-300" : "bg-primary-aquablue"}`}>
                            {isSubmitting ? 
                            <RiLoader4Fill size={20} className="text-white animate-spin" /> 
                            : "Submit"}
                        </button>

                    </form>
                </div>
            </div>

            <div className="max-lg:mt-4"></div>
        </div>

        {isModalOpen && (
        <NotificationModal
        image={true}
          message="A link has been sent to your email for password reset. Please check your inbox and spam folder."
          onClose={handleCloseModal}
        />
      )}
  </div>
  )
}

export default ForgotPassword