'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { updatePost } from '@/lib/actions/update-post';
import toast, { Toaster } from 'react-hot-toast';
import ImageUpload from '@/components/new-post/image-upload';
import { Button, Input, Textarea } from '@nextui-org/react';

const UpdatePostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post.title,
      description: post.description,
      premium: post.premium.toString(), // Convert boolean to string
      image: post.imageSrc,
    },
  });
  const image = watch('image');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedData = { ...data, postId: post.id };
      await updatePost(post.id, updatedData);
      toast.success('Post updated successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-2">
            <div>
               <div className="mt-6 border rounded-md p-4">
                <span>Title</span>
                <Input type="text" {...register('title')} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>
                <div className="mt-6 border rounded-md p-4">
                <label>Description</label>
                  <Textarea {...register('description')} />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}                    
                </div>
            </div>   
            <div>
                <div className="mt-6 border rounded-md p-4">
                <span>Premium?</span>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <Input type="radio" value="true" {...register('premium')} />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <Input type="radio" value="false" {...register('premium')} />
                    <span className="ml-2">No</span>
                  </label>
                </div>       
              </div>
              <div className="mt-6 border rounded-md p-4">
                <span>Current Image</span>
                <img src={image} alt="Current Image" className="mt-2 max-w-xs" />
                <ImageUpload onUpload={(file) => setValue('image', file)} />
              </div>
            </div>     
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</Button>
      </form>
      <Toaster />
    </div>
  );
};

// Validation schema using Yup
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  premium: Yup.boolean().required('Premium selection is required'),
});

export default UpdatePostForm;
