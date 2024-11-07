const mongoose = require('mongoose');
const slugify = require('slugify');
const Product = require('./productModel');

const productConfigSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      unique: false,
    },
    configs: [
      {
        colorHex: String,
        size: String,
        weight: String, // faltaria food
        imagesUrl: String,
        images: [String],
        productDescription: {
          type: String,
          required: [true, 'A product must have a description'],
        },
        price: {
          type: Number,
          required: [true, 'A product must have a price'],
        },
        productionPrice: {
          type: Number,
          required: [true, 'A product must have a production price'],
        },
        type: {
          type: String,
          enum: ['color', 'size', 'weight', 'food'],
          default: 'color',
        },
        discountPrice: {
          type: Number,
        },
        stock: [
          {
            location: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Location',
            },
            quantity: Number,
            size: String,
          },
        ],
        isActive: {
          type: Boolean,
          default: true,
        },
        extraConfig: [
          {
            key: String,
            value: String,
          },
        ],
      },
    ],
  }
);

//Tipos de usaurio, usario normal, usuario comprador mayorista y administrados
//Agregar codigos de barra, EAM 13, DUM 14
//Ubicacion de rack del stock
//Producto de caja master
//Dimensiones del EAM 13, DUM 14 y del pallet, 
// identificar cuando es EAM 13, DUM 14

const ProductConfig = mongoose.model('ProductConfig', productConfigSchema);
module.exports = ProductConfig;
