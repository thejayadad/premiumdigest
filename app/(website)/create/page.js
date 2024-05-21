import Box from '@/components/box'
import HeadingText from '@/components/heading-text'
import NewPostForm from '@/components/new-post/new-post-form'
import React from 'react'

const CreatePage = () => {
  return (
    <section className='py-6'>
        <Box>
            <div className='flex flex-col gap-8'>
            <HeadingText
            title={'New Post Page'}
            description={"Add Your Post Below"}
            />
            <NewPostForm />
            </div>
        </Box>
    </section>
  )
}

export default CreatePage