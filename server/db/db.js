import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect) {
      console.log("MONGODB CONNECTED SUCCESSFULLY");
    }
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
