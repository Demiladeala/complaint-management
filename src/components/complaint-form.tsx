import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { RiLoader4Fill } from 'react-icons/ri';
import api from './api';
import toast, { Toaster } from 'react-hot-toast';

const ComplaintForm = () => {
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; name: string; type: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file =>
        ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
      );
      setFiles(prevFiles => [...prevFiles, ...newFiles]);

      // Generate previews for images and file names for non-images
      const newPreviews = newFiles.map(file => {
        const url = file.type.startsWith('image/') ? URL.createObjectURL(file) : '';
        return { url, name: file.name, type: file.type };
      });
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append('type', complaintType);
    formData.append('description', description);
    files.forEach((file, index) => {
      formData.append(`supporting_docs[${index}]`, file);
    });
  
    try {
      await api.post('/complaints', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Complaint submitted successfully:');
      // Reset the form after successful submission
      setComplaintType('');
      setDescription('');
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Failed to submit complaint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-full flex md:items-center justify-center'>
      <Toaster />
      <div className="mt-12 lg:mt-5 w-full lg:w-[70%] h-fit bg-white px-5 md:px-8 py-6 box-shadow rounded-2xl">
        <h2 className="poppins text-xl lg:text-2xl font-semibold mb-6">Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="complaintType" className="block md:text-lg font-medium text-gray-700">
              Type of Complaint
            </label>
            <input
              type="text"
              id="complaintType"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-darkblue focus:border-primary-darkblue"
              placeholder="Enter the type of complaint"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block md:text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary-darkblue focus:border-primary-darkblue"
              placeholder="Describe your issue"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="files" className="block md:text-lg font-medium text-gray-700">
              Supporting Documents
            </label>
            <div 
              className="mt-4 relative w-full bg-transparent rounded-lg border border-dashed border-primary-darkblue px-6 py-8 cursor-pointer">
              <input
                type="file"
                accept=".jpeg,.png,.pdf,.doc,.docx"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-full text-lg flex flex-col items-center justify-center cursor-pointer">
                <div className="cursor-pointer">
                  <IoImageOutline size={50} className="text-primary-blue mx-auto"/>
                  <h4 className="max-md:w-[98%] mx-auto mt-6 text-center text-[#70706E]">Drop your files here, or browse</h4>
                  <h4 className="max-md:w-[98%] mx-auto mt-6 text-center text-[#70706E]">JPEG, PNG, PDF, DOC, DOCX are allowed</h4>
                </div>
              </div>
            </div> 

            {previews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">Selected Files:</h4>
                <div className="flex flex-wrap gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative">
                      {preview.url ? (
                        <img src={preview.url} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded border border-gray-300" />
                      ) : (
                        <div className="w-32 h-32 bg-white border border-gray-300 rounded text-center
                        flex items-center justify-center text-gray-600">
                          {preview.name}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviews(prev => prev.filter((_, i) => i !== index));
                          setFiles(prev => prev.filter((_, i) => i !== index));
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white h-2 w-2 p-2 flex items-center justify-center
                         rounded-full text-sm"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary-darkblue text-white font-semibold flex items-center justify-center text-center
             rounded-md hover:bg-primary-600 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 
            <div className='flex items-center gap-1'>
              Submitting
              <RiLoader4Fill size={20} className="text-white animate-spin" />
            </div> : 
            'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;