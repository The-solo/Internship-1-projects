import express from 'express';
import  userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();//access to the env file.

app.use(express.json());
app.use("/*", cors());
app.use("/api/v1/user", userRouter);//routing all the user routes.
app.use("/api/v1/blogs", blogRouter);// routing all the blog routes.

const PORT = process.env.PORT;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port....`);
  });
}

module.exports = app; //exporting a whole application as function for vercel deployment.
