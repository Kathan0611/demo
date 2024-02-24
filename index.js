const express =require('express');
const app = require("express")();
const mogoose = require("mongoose");

require("dotenv").config();
const {CreateProduct}=require('./Controller/ProductController');
const Router =require('./Router/ProductRouter');


//in req.body part if data not json then convert into json
app.use(express.json());
app.use("/product",Router);
main().catch((err) => console.log(err));

async function main() {
  await mogoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("connect database succefully");
}

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

// app.post("/product", CreateProduct);

// console.log(process.env.PORT)/

app.listen(process.env.PORT, () => {
  console.log(`Server running  on port ${process.env.PORT}`);
});


