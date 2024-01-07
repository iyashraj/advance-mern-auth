import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n
    MongoDB Connect: ${connectionInstance.connection.host}!
    `);
  } catch (err) {
    console.log("ERROR: ", err);
    process.exit(1);
  }
};

export {ConnectDB}
