import { auth } from '@/auth'
import Box from '@/components/box'
import HeadingText from '@/components/heading-text'
import { deletePost } from '@/lib/actions/delete-post'
import prisma from '@/lib/prisma'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { FiTrash } from 'react-icons/fi'
import DeleteButton from './_components/delete-post-button'
import { Toaster } from 'react-hot-toast'
import Stripe from 'stripe';
import { createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '@/lib/actions/billing'




export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: '2023-10-16',
});



const DashboardPage = async () => {
    const session = await auth()
    const user = session?.user
    const userEmail = user.email



      //Customer a customer if null
    await createCustomerIfNull()


     // Fetch the user by email to get the user's ID
  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });


  //Generate the customer link
  const manage_link = await generateCustomerPortalLink(""+existingUser?.stripe_customer_id)

  //Check if the user has a subscription
  const hasSub = await hasSubscription()

  //Create a link for the customer
  const checkout_link = await createCheckoutLink(""+existingUser?.stripe_customer_id)


  const posts = await prisma.post.findMany({
    where: { creatorId: existingUser.email },
  });
  console.log("Email " + userEmail)
console.log("Posts " + posts)
  return (
    <section className='py-6'>
        <Box>
            <div className='flex items-center justify-between'>
            <HeadingText
            title={'Dashboard Page'}
            description={'See all Post & Manage your Subscription Status'}
            />
       
                <div className='flex items-center gap-2 text-[9px]'>
                  <Link href={""+manage_link}>
                Manage Billing
            </Link>
            <div>
            {
                hasSub ? 
                <div>
                   subscribed
                </div>

                : 

                <div>
                     free plan 
                     <Link href={""+checkout_link}>
                        UpGrade
                     </Link>
                </div>
            }
        </div>
                </div>
            </div>
       
            <div>
                <div className='flex flex-col w-full px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8'>
                    <div className='p-4 border rounded-xl inline-block min-w-full overflow-hidden'>
                        <table className='min-w-full leading-normal text-center'> 
                           <thead>
                            <tr>
                                <th
                                className='px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200'
                                >
                                Title
                                </th>
                                <th
                                className='px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200'
                                >
                                Date
                                </th>
                                <th
                                className='px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200'
                                >
                                Type
                                </th>
                                <th
                                className='px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200'
                                >
                                Update
                                </th>
                            </tr>
                           </thead>
                           <tbody>
                            {posts.map(post => (
                                <tr key={post.id}>
                                <td className='px-5 py-3 text-sm font-normal text-center text-gray-800 border-b border-gray-200'>
                                    {post.title}
                                </td>
                                <td className='px-5 py-3 text-sm font-normal text-center text-gray-800 border-b border-gray-200'>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className='px-5 py-3 text-sm font-normal text-center text-gray-800 border-b border-gray-200'>
                                    {post.premium ? 'Premium' : 'Free'}
                                </td>
                                <td className='px-5 py-3 flex items-center gap-1 text-sm justify-center font-normal text-center text-gray-800 border-b border-gray-200'>
                                    <Link 
                                    className='underline text-small hover:text-primary'
                                    href={`/dashboard/post/${post.id}`}>
                                        Details
                                    </Link> 
                                        <DeleteButton postId={post.id} />
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Toaster />
        </Box>
    </section>
  )
}

export default DashboardPage