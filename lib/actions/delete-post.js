'use server'
// delete-post.js
import prisma from "../prisma";

export const deletePost = async (id) => {
    try {
        console.log("Deleting post with ID:", id);
        const deletedPost = await prisma.post.delete({
            where: { id },
        });
        console.log("Post deleted:", deletedPost);
        return deletedPost;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error('Failed to delete post');
    }
};
