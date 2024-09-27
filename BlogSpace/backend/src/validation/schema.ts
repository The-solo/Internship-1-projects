import z from 'zod';

export const userSchema = z.object({
    email : z.string().email(),
    name : z.string().min(3).max(255).optional(),
    password : z.string().min(8)
});


export const blogSchema = z.object({
    title : z.string().max(255),
    content : z.string().optional(),
    publised : z.boolean().default(false),
});



