import express from "express";
import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)


app.listen(PORT, () =>{
    console.log(`listening in the port ${PORT}`);
});