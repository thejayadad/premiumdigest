import { signIn } from '@/auth';
import Box from '@/components/box';
import HeadingText from '@/components/heading-text';
import { hasSubscription } from '@/lib/actions/billing';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';
import { FiUser } from 'react-icons/fi';

const SinglePostPage = async ({ params }) => {
    const postId = params.id;
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
    });

    const userHasSubscription = await hasSubscription();

    // Check if the post exists
    if (!post) {
        return <redirect to="/" />;
    }

    // Check if the post is premium and the user doesn't have a subscription
    if (post.premium && !userHasSubscription) {
        return (
            <section className="py-6">
                <Box>
                    <div>
                        <HeadingText
                            title={'Premium Content'}
                            description={'Upgrade your subscription to access this content'}
                        />
                        <p className="text-gray-600 pt-4">
                            This content is only available to premium subscribers. Please login & upgrade your subscription to access this post.
                        </p>
                    </div>
                </Box>
            </section>
        );
    }

    return (
        <section className="py-6">
            <Box>
                <div>
                    <HeadingText
                        title={'Single Post View'}
                        description={'Enjoy the blog post by one of our authors'}
                    />
                    <div>
                        <div className="flex flex-col gap-6 text-gray-600 body-font overflow-hidden">
                            <div className="px-5 py-12 mx-auto">
                                <div className="mx-auto flex flex-wrap">
                                    <img
                                        className="md:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                        src={post.imageSrc}
                                        alt={post.title}
                                    />
                                    <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{post.title}</h1>
                                        <p className="leading-relaxed pt-6">{post.description}</p>
                                        <div className="pt-6">
                                            {post.premium ? (
                                                <span className="bg-primary/90 text-white p-1 text-small rounded-md flex items-center gap-2">Premium <span className="text-green-900">$</span></span>
                                            ) : (
                                                <span className="bg-primary/90 text-white p-1 text-small rounded-md">Free</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </section>
    );
};

 

export default SinglePostPage;
