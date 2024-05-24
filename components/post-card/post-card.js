import Link from 'next/link';
import React from 'react';

const PostCard = ({ post }) => {
  return (
    <Link
      className='m-auto overflow-hidden rounded-md shadow-sm cursor-pointer h-90 w-60 md:w-80"'
      href={`/post/${post.id}`}
    >
      <div className='block w-full h-full'>
        <img
          className='object-cover w-full max-h-64'
          src={post.imageSrc}
        />
        <div className='w-full flex items-center justify-between py-4 px-2'>
          <p className='title-font sm:text-md font-medium text-gray-900'>{post.title}</p>
          {post.premium ? (
            <span className='bg-gray-200 text-gray-900 p-1 text-small rounded-md flex items-center gap-2'>Premium 
            <span className='text-green-900'>$</span>
            </span>
          ) : (
            <span className='bg-primary/90 text-white p-1 text-small rounded-md'>Free</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
