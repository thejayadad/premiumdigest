import { auth } from '@/auth'
import Box from '@/components/box'
import HeadingText from '@/components/heading-text'
import prisma from '@/lib/prisma'
import React from 'react'
import UpdatePostForm from '../../_components/update-post-form'

const DashboardPostPage = async ({params}) => {
    const postId = params.id; // Extract postId from params
    const session = await auth()
    const user = session?.user
    const userEmail = user.email

     // Fetch the user by email to get the user's ID
  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!existingUser) {
    return (
      <section className='max-w-5xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full'>
        <div className='text-center text-gray-500'>User not found.</div>
      </section>
    );
  }
  const post = await prisma.post.findUnique({
    where: {
        id: postId
    },

})
if(!post){
    return redirect("/dashboard")

}


  return (
    <section className='py-6'>
        <Box>
            <HeadingText
            title={'Post Update'}
            description={'Update your post below'}
            />
            <div>
                <div className='py-12' >
                    <div>
                        <UpdatePostForm post={post} />
                    </div>
                </div>
            </div>
        </Box>
    </section>
  )
}

export default DashboardPostPage