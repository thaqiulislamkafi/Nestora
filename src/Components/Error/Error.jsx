import { useNavigate } from 'react-router';
 

const Error = () => {
  const navigate = useNavigate();

  const errorImage = 'https://i.postimg.cc/qvcYrQtP/Error.png'
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Image */}
        <div className="mb-8 flex justify-center">
          <img 
            src={errorImage} 
            alt="Error occurred" 
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        

        {/* Go Home Button */}
        <button
          onClick={handleGoHome}
          className="btn bg-[#e6d70c] px-6 my-8 rounded-lg text-white font-medium transition-colors duration-300 hover:bg-[#e2e60c]"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;