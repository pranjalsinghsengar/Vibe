import { shopifyAxios } from "../../../config/index.js";
import ShopifyProduct from "../model/shopifyProductModel.js";

export const placeShopifyOrder = async (req, res) => {
  // const { productId, customerName, email, address, quantity } = req.body;

  try {
    console.log("-------------------- shopify order created 1 -------------------------------------")
    // 1. Get product from MongoDB
    // const product = await Product.findById(productId);
    // if (!product) return res.status(404).json({ error: "Product not found" });

    // 2. Save the order locally in MongoDB
    // const newOrder = await Order.create({
    //   productId,
    //   customerName,
    //   email,
    //   address,
    //   quantity
    // });

    // 3. Prepare order data for Shopify
    const shopifyOrderData = {
      order: {
        line_items: [
          {
            variant_id: 44070569410731, // Use the variant ID
            quantity: 1 // Or any quantity you want to order
          }
        ],
        customer: {
          // Either provide existing customer ID or email+name to create a new one
          first_name: "Somu",
          last_name: "broo...",
          email: "john.doe@example.com"
        },
        shipping_address: {
          first_name: "John",
          last_name: "Doe",
          address1: "123 Main Street",
          phone: "555-555-5555",
          city: "New York",
          province: "NY",
          country: "US",
          zip: "10001"
        },
        billing_address: {
          first_name: "John",
          last_name: "Doe",
          address1: "123 Main Street",
          phone: "555-555-5555",
          city: "New York",
          province: "NY",
          country: "US",
          zip: "10001"
        },
        financial_status: "paid" // Mark order as paid. Use "pending" if unpaid.
      }
    };
    
    
    // console.log("-------------------- shopifyOrderData 2 -------------------------------------",shopifyOrderData)


    const productList = await shopifyAxios.get("/products.json")
    console.log("-------------------- productList 3 -------------------------------------",productList.data.products[0])


    // 4. Create the order in Shopify
    const response = await shopifyAxios.post("/orders.json", shopifyOrderData);
    console.log("-------------------- response 4 -------------------------------------",response)


    res.status(201).json({
      message: "Order placed successfully",
      shopifyOrder: response.data.order
    });
  } catch (err) {
    console.log("err-------->",err)
    console.error("Order error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to place order", errData: err });
  }
};

export const syncShopifyProducts = async (req, res) => {
  try {
    const response = await shopifyAxios.get("/products.json");
    const products = response.data.products;

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in Shopify store" });
    }

    let insertedCount = 0;

    for (const product of products) {
      const exists = await ShopifyProduct.findOne({ shopifyProductId: product.id });

      if (!exists) {
        await ShopifyProduct.create({
          shopifyProductId: product.id,
          data: product,
        });
        insertedCount++;
      }
    }
    return res.json({
      message: "Products synced successfully",
      newProductsAdded: insertedCount,
      totalFromShopify: products.length,
    });
  } catch (error) {
    console.error("Error syncing Shopify products:", error);
    res.status(500).json({
      message: "Failed to sync products",
      error: error.message,
    });
  }
};