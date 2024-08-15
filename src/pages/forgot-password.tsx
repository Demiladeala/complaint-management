import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/notification-modal";

const ForgotPassword = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = (event: FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
    // You can also add logic to trigger the actual forgot password API here
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/reset-password"); // Navigate to the reset password page
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
                            <input type="email"
                            className="mt-1 outline-none w-full p-3 border border-primary-gray rounded-lg" />
                        </div>

                        <button 
                        onClick={handleForgotPassword}
                        className="mt-8 w-full py-3 bg-primary-aquablue text-white flex items-center justify-center rounded
                        transition-colors duration-300 hover:bg-opacity-80">
                            Submit
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