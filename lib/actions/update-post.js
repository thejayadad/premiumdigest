'use server'

import { auth } from "@/auth";
import prisma from "../prisma";



export async function updatePost(postId, eventData) {
    const session = await auth();
    const user = session?.user;
    const userEmail = user.email;

    if (!user) {
        throw new Error('User not found');
    }
    
    try {
        // Fetch user by email to get the correct userId
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        
        if (!existingUser) {
            throw new Error('User not found');
        }

        const { title, description, imageSrc,  premium } = eventData;

        // Update the project using prisma.project.update
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title, description, imageSrc,  premium,
                creatorId :   userEmail  , 
            },
        });

        console.log("Post updated:", updatedPost);
        return updatedPost;
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error('Error: ' + error.message);
    }

}