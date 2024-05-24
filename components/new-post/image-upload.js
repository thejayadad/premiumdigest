import React, { useCallback, useRef } from 'react';
import { FiImage } from "react-icons/fi";

const ImageUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default button behavior
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file selection dialog
    }
  };

  const handleUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'uploadsite'); 

      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/socialsite/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        onUpload(data.secure_url); 
      } catch (err) {
        console.error('Error uploading image', err);
      }
    }
  }, [onUpload]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button onClick={handleClick} className="bg-primary flex items-center
       justify-center text-white px-4 py-2 gap-2 rounded-md w-full">
        <FiImage /> Upload
      </button>
    </div>
  );
};

export default ImageUpload;
