import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: String,
  date: { type: Date, default: Date.now },
  reviewerName: String,
  reviewerEmail: String
});

const DimensionsSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number
});

const MetaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: String,
  qrCode: String
});

const ProductSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: DimensionsSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [ReviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: MetaSchema,
  images: [String],
  thumbnail: String
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;