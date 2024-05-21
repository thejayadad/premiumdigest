'use client'
// DeleteButton.js
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Button } from '@nextui-org/react';
import { deletePost } from '@/lib/actions/delete-post';
import toast from 'react-hot-toast';

const DeleteButton = ({ postId }) => {
  const [deleting, setDeleting] = useState(false); // State for deleting status

  // Function to handle post deletion
  const handleDelete = async () => {
    try {
      setDeleting(true); // Set deleting status to true when deletion is in progress
      
      await deletePost(postId); // Call the deletePost action with postId
      // You can handle any additional logic after successful deletion here
      toast.success("Post Deleted")
      window.location.reload()
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setDeleting(false); // Reset deleting status to false
    }
  };

  return (
    <button variant='light' onClick={handleDelete} disabled={deleting}>
      {deleting ? 'Deleting...' : <FiTrash className='h-4 w-4' />}
    </button>
  );
};

export default DeleteButton;
