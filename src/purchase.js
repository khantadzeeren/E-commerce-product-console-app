import prompts from "prompts";
import connect from "./database/mongo.js";
import Purchase from "./models/purchase.js";
import Product from "./models/product.js";
import dotenv from "dotenv";

dotenv.config();
connect();
async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "quantity",
      message: "Please enter product quantity",
    },
    {
      type: "text",
      name: "price",
      message: "Please enter product price",
    },
    {
      type: "text",
      name: "productId",
      message: "Please enter product productId",
    },
  ]);

  const existingProduct = await Product.findOne({ id: response.productId });

  if (existingProduct) {
    await Purchase.create({
      quantity: response.quantity,
      price: response.price,
      productId: response.productId,
    });
   
    console.log("Purchase saved to MongoDB!");
  } else {
    console.log("Product ID does not exist");
  }
  process.exit();
}

main();