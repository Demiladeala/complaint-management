import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
    onClose: () => void;
}

const OtpModal = ({ onClose }: Props) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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

  const handleResendOtp = () => {
    setTimeLeft(300);
    setIsButtonDisabled(false);
    // Trigger OTP resend logic here
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if the current one is filled
      if (value && index < 3) {
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
    } else if (event.key === 'Enter') {
      verifyOtp();
    }
  };

  const verifyOtp = () => {
    // Add your OTP verification logic here
    const isOtpCorrect = otp.join('') === '1234'; // Example: replace with actual logic

    if (isOtpCorrect) {
      navigate("/login");
    } else {
      toast.error('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Toaster />
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">Verify Your OTP</h3>
        <p className="text-gray-600 mb-4">Enter the OTP sent to your email. It is valid for 5 minutes.</p>
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 p-3 border border-gray-300 rounded-lg text-center text-xl"
              maxLength={1}
            />
          ))}
        </div>
        <button
          onClick={verifyOtp}
          disabled={isButtonDisabled}
          className={`w-full py-3 rounded-lg text-white ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-aquablue'}`}
        >
          Verify OTP
        </button>
        <div className="mt-4 text-center text-gray-600">
          {isButtonDisabled ? (
            <button
              onClick={handleResendOtp}
              className="text-primary-aquablue underline"
            >
              Resend OTP
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