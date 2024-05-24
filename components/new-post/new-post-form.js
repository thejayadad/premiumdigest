'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createPost } from '@/lib/actions/create-post';
import { Toaster, toast } from 'react-hot-toast';
import ImageUpload from './image-upload';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  premium: Yup.boolean().required('Premium selection is required'),
});

const NewPostForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const postData = { ...data, imageSrc: image };
      await createPost(postData);
      toast.success('Post created successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="border rounded-md p-4">
              <span>Title</span>
              <Input placeholder="Title..." {...register('title')} />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="mt-6 border rounded-md p-4">
              <Textarea placeholder="Description..." {...register('description')} />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
          </div>
          <div>
            <div className="border rounded-md p-4">
              <span>Premium?</span>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input type="radio" value="true" {...register('premium', { value: true })} />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" value="false" {...register('premium', { value: false })} />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {errors.premium && <p className="text-red-500">{errors.premium.message}</p>}
            </div>
            <div className="mt-6 border rounded-md p-4">
              <ImageUpload onUpload={(file) => setImage(file)} />
              {image && (
                <img src={image} alt="Preview" className="mt-2 max-w-xs" />
              )}
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full mt-6" disabled={loading}>
          {loading ? 'Creating...' : 'Submit'}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default NewPostForm;
