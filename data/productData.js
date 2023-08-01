// const products = [
//   {
//     id: 1,
//     name: "Product A",
//     price: 10.0,
//     description: "This is the description of our product",
//     ratings: 4,
//     discount: {
//       type: true,
//       discount: 20,
//     },
//     images:
//       "https://64.media.tumblr.com/b3d74b0b77a64d4e9aa9a2a68b76a88d/5bbff0fa690c6a16-cd/s1280x1920/8ad9b984be6f0b8c040c52c90eadb9ac72dcdd9a.jpg",
//     size: String,
//     colors: String,
//     gender: String,
//     stock: {
//       type: true,
//       quantity: 5,
//     },
//     refund: {
//       policy: "No",
//     },
//     shippingInfo: String,
//   },
//   { id: 2, name: "Product B", price: 20.0 },
// ];

// const getAllProducts = () => products;

// const getProductById = (id) => products.find((p) => p.id === id);

// const addProduct = (newProduct) => {
//   const id = product.length + 1;
//   const product = { id, ...newProduct };
//   product.push(product);
//   return product;
// };

// const updateProduct = (id, updatedProduct) => {
//   const index = product.findIndex((p) => p.id === id);
//   if (index !== -1) {
//     products[index] = { ...products[index], ...updatedProduct };
//     return products[index];
//   }
//   return null;
// };

// const deleteProduct = (id) => {
//   const index = products.findIndex((p) => p.id === id);
//   if (index !== -1) {
//     return products.splice(index, 1)[0];
//   }
//   return null;
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// };
