import connect from "./database/mongo.js";
import Purchase from "./models/purchase.js";
import prompts from "prompts";
import dotenv from "dotenv";
dotenv.config();
connect();


async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "productId",
      message: "Enter your productId",
    },
  ]);

  const checkId = await Purchase.find({ productId: response.productId });
  const purchases = await Purchase.find({ productId: response.productId });
  const quantities = purchases.map((purchase) => purchase.quantity);
  const totalPrices = purchases.map(({ price, quantity }) => price * quantity);

  const sumAmount = quantities.reduce((acc, quantity) => acc + quantity, 0);
  const sumPrice = totalPrices.reduce((acc, price) => acc + price, 0);

  const purchaseAverage = sumPrice / sumAmount;

  if (checkId) {
    console.log(purchaseAverage);
  }
  process.exit();
}

main();