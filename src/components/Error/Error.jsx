import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
       <div className="h-screen flex justify-center items-center text-black rounded-lg p-6 text-center bg-gray-50">
      <div className="flex bg-white justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300 h-1/2 w-8/12 mx-auto items-center flex-col rounded-xl p-8">
        
        <h1 className="text-5xl font-extrabold text-black">404</h1>

        <h2 className="text-2xl font-bold mt-4">
          Oops! Page not found
        </h2>

        <p className="mt-3 text-lg text-gray-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/"
            className="px-5 py-2 bg-black text-white rounded-lg "
          >
            Go Home
          </Link>

          <Link
            to="/createaprofile"
            className="text-black underline"
          >
            Create a profile (if needed)
          </Link>
        </div>
      </div>
    </div>
    );
};

export default Error;