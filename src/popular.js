import connect from "./database/mongo.js";
import Order from "./models/order.js";
import dotenv from "dotenv";

dotenv.config();
connect();

async function main() {
  try {
    const most = await Order.aggregate([
      { $group: { _id: "$productId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]).exec();

    const maxId = most[0]._id;
    const maxCount = most[0].count;

    console.log(`ID "${maxId}" repeats ${maxCount} times.`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    process.exit();
  }
}

main();



main();