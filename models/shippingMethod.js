const shippingMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  cost: {
    type: Number,
    required: true,
  },
});

const ShippingMethod = mongoose.model('ShippingMethod', shippingMethodSchema);
