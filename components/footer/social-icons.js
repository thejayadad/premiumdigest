import React from 'react';
import { FiTwitter, FiYoutube, FiFacebook, FiInstagram } from 'react-icons/fi';

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-2">
      {/* Twitter Icon */}
      <span className="text-blue-500 hover:text-blue-700">
        <FiTwitter className="w-4 h-4" />
      </span>

      {/* YouTube Icon */}
      <span  className="text-red-500 hover:text-red-700">
        <FiYoutube className="w-4 h-4" />
      </span>

      {/* Facebook Icon */}
      <span className="text-blue-700 hover:text-blue-900">
        <FiFacebook className="w-4 h-4" />
      </span>

      {/* Instagram Icon */}
      <span className="text-pink-500 hover:text-pink-700">
        <FiInstagram className="w-4 h-4" />
      </span>
    </div>
  );
};

export default SocialIcons;
