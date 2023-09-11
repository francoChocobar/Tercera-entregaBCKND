import { Router } from "express";
import { productService } from "../dao/index.js";
import {ckeckUserAuthenticated, showLoginView} from "../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, stock, sort = "asc" } = req.query;
    const stockValue = stock === 0 ? undefined : parseInt(stock);
    if (!["asc", "desc"].includes(sort)) {
      return res.render("products", { error: "Orden no valida" });
    }
    const sortValue = sort === "asc" ? 1 : -1;
    let query = {};
    if (stockValue) {
      query = { stock: { $gte: stockValue } };
    }
    const result = await productService.getWithPaginate(query, {
        page,
        limit,
        sort:{price:sortValue},
        lean:true
    });
    

const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
const resultProductsViews = {
    status:"success",
    payload: result.docs,
    totalPages:result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page:result.page,
    hasPrevPage:result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
    nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
}
console.log(resultProductsViews);
    res.render("products", resultProductsViews);
  } catch (error) {
    res.render("products", { error: "No se pueden visualizar los datos" });
  }
});


router.get("/registro",showLoginView,(req,res)=>{
  res.render("signup");
});

router.get("/login", showLoginView, (req,res)=>{
  res.render("login");
});

router.get("/perfil", checkUserAuthenticated, (req,res)=>{
  console.log(req.user);
  res.render("profile",{user: req.user});
});

router.get("/cambio-password", (req,res)=>{
  res.render("changePassword")
});







export { router as viewsRouter };
