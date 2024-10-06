import z from 'zod';

export const signupInput = z.object({
    email : z.string().email(),
    name : z.string().min(3).max(255).optional().or(z.literal('')),
    password : z.string().min(8)
});
export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(8)
});

export const updateUser = z.object({
    email : z.string().email().optional(),
    name : z.string().min(3).max(255).optional(),
    password : z.string().min(8).optional(),
});

export const createBlogInput = z.object({
    title : z.string().max(255),
    content : z.string(),
    published : z.boolean().default(false),
});

export const updateBlogInput = z.object({
    title : z.string().optional(),
    content : z.string().optional(),
    id : z.string(),
});

export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type updateUser = z.infer<typeof updateUser>
export type createBlogInput= z.infer<typeof createBlogInput>
export type updateBlogInput= z.infer<typeof updateBlogInput>
