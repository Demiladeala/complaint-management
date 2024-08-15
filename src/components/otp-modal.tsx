import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RiLoader4Fill } from 'react-icons/ri';
import { VscClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

type Props = {
    onClose: () => void;
    email: string;
}

const OtpModal = ({ onClose, email }: Props) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 characters
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifyingLoading, setIsVerifyingLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsButtonDisabled(true);
        }
    }, [timeLeft]);

    const handleResendOtp =  async () => {
        setIsButtonDisabled(false);
        setIsVerifyingLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/send-email-verification`, {
                email: email
            }, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            });
    
            if (response.data.success) {
              setIsButtonDisabled(false);
              setTimeLeft(300);
            } else {
                toast.success('OTP resent successfully');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // Display the error message from the API response
                const errorMessage = error.response.data.detail || 'Failed to resend OTP. Please try again.';
                toast.error(errorMessage);
            } else {
                // Handle other errors
                toast.error('Failed to resend OTP. Please try again.');
            }
        } finally {
          setIsVerifyingLoading(false)
        }
    };

    const handleChange = (index: number, value: string) => {
        if (value.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = value.toUpperCase(); // Assuming OTP characters are case-insensitive
            setOtp(newOtp);

            // Move focus to the next input field if the current one is filled
            if (index < otp.length - 1) { // Adjusted to 5 since we now have 6 inputs
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);

            // Move focus to the previous input field if not the first
            if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                prevInput?.focus();
            }
        }
        else if (event.key === 'Enter') {
          // Check if OTP is complete
          if (otp.every(char => char.length === 1)) {
              verifyOtp();
          } else {
              toast.error('Please enter the complete OTP.');
          }
      }
    };

    const verifyOtp = async () => {
      setIsLoading(true)
      try {
          const response = await axios.post(`${BASE_URL}/api/auth/verify-email`, {
              otp: otp.join(''),
              email: email // Include email in the payload
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          if(response.status === 202) {
            toast.success('OTP verified.');
            navigate("/login");
            onClose();
          }
      } catch (error: any) {
          if (error.response && error.response.status === 400) {
              // Display the error message from the API response
              const errorMessage = error.response.data.detail || 'Failed to verify OTP. Please try again.';
              toast.error(errorMessage);
          } else {
              // Handle other errors
              toast.error('Failed to verify OTP. Please try again.');
          }
      } finally {
        setIsLoading(false)
      }
  };
  

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Toaster />
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-[95%] md:w-full relative">
                <div 
                className='absolute right-4 top-4'
                onClick={onClose}>
                    <VscClose size={23}/>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Verify Your OTP</h3>
                <p className="text-gray-600 mb-4">Enter the OTP sent to your email. It is valid for 5 minutes.</p>
                <div className="flex justify-between mb-4">
                    {otp.map((char, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={char}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 p-3 border border-gray-300 rounded-lg text-center text-xl"
                            maxLength={1}
                        />
                    ))}
                </div>
                <button
                    onClick={verifyOtp}
                    disabled={isButtonDisabled}
                    className={`w-full py-3 rounded-lg text-white flex items-center justify-center
                      ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-aquablue'}`}
                >
                    {isLoading ?
                      <RiLoader4Fill size={20} className="text-white animate-spin" />
                    : "Verify OTP"}
                </button>
                <div className="mt-4 text-center flex items-center justify-center text-gray-600">
                    {isButtonDisabled ? (
                        <button
                            onClick={handleResendOtp}
                            className="text-primary-aquablue underline flex items-center justify-center text-center"
                        >
                           {isVerifyingLoading ?
                            <RiLoader4Fill size={20} className="text-primary-aquablue animate-spin" />
                          : "Resend OTP"}
                        </button>
                    ) : (
                        <p>Time remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpModal;