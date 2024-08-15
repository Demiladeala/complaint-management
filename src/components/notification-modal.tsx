import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
    message: string;
    onClose: () => void;
    image?: boolean;
  };
  
  const NotificationModal = ({ message, onClose, image }: Props) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        {image && 
        <VscVerifiedFilled className="mt-5 mb-6 mx-auto text-primary-aquablue" size={85} />}
          <p className="text-gray-700 mb-4 font-medium">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-primary-aquablue text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default NotificationModal;  