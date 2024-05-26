import Box from '@/components/box'
import HeadingText from '@/components/heading-text'
import PostCard from '@/components/post-card/post-card'
import prisma from '@/lib/prisma'
import React from 'react'

const HomePage = async () => {
  const posts = await prisma.post.findMany({})
  return (
    <section className=''>
        <Box>
          <div className='flex flex-col border-l-1 border-r-1 px-2 pt-2 h-screen'>
            <div>
            <HeadingText
            title={'Premium Digest'}
            description={"Check out our latest post below"}
            />
            </div>
            <div className='py-6'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 space-x-2'>
                {posts.map(post => (
                  <PostCard key={post.id} post={post}/>
                ))}
              </div>
            </div>
          </div>
        </Box>
    </section>
  )
}

export default HomePage