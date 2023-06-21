import connect from "./database/mongo.js";
import Purchase from "./models/purchase.js";
import dotenv from "dotenv";
dotenv.config();
connect();


async function main() {
  try {
    const least = await Purchase.aggregate([
      { $group: { _id: "$productId", count: { $sum: 1 } } },
      { $sort: { count: 1 } },
      { $limit: 1 },
    ]).exec();

    const minId = least[0]._id;
    const minCount = least[0].count;

    console.log(`ID "${minId}" repeats ${minCount} times.`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    process.exit();
  }
}

main();


main();