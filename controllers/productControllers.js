const Product = require("../models/products");

// Create Product- ADMIN
exports.createProduct = async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    })
  }catch(err){
    res.status(500).json({message:"Product not added!"})
  }
};

// Get Product Detail
exports.getProductDetails = async(req,res) =>{
  try{
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({
          message:"Product not found."
        })
    }
    res.status(200).json({
      success:true,
      product
    })  
  }catch(err){
    res.status(500).json({message:"Error occoured while fetching by product ID"})
  }}

// Get all products
exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const searchQuery = req.query.searchQuery || "";

  try {
    let query = {};
    if (searchQuery) {
      query.title = { $regex: new RegExp(searchQuery, "i") };
    }

    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      success: true,
      products,
    });
  }catch(err){
res.status(500).json({message:"Products could not be fetched."})
  }
};

// Update Products - ADMIN
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product - admin
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
try{

  if(!product){
    return res.status(404).json({
      message:"Product not found"
    })
  }
  await Product.deleteOne({ _id:req.params.id });

  res.status(200).json({
    message:"Product Deleted Successfully"
  })
}catch(err){
  res.status(500).json("Error occured while deleting the product.")
}
}
