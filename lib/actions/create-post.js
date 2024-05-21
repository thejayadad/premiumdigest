'use server'

import { auth } from "@/auth";
import prisma from "../prisma";


// title String
// description String
// imageSrc String
// creatorId  String
// premium Boolean

export async function createPost(eventData) {
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;

    if (!user) {
        throw new Error('User not found');
    }
    try {
        const { title, description, imageSrc,  premium } = eventData;
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const newPost = await prisma.post.create({
            data: {
                title, description, imageSrc, premium, 
                creatorId: userEmail, // Correctly assign the creatorId field
            },
        });
        return newPost;
    } catch (error) {
        console.log("Create Post: " + error);
        throw new Error('Failed to create post.');
    }
}
