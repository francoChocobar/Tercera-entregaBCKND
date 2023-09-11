import { Router } from "express";
import { cartService, productService } from "../dao/index.js";




const router = Router();

router.post("/", async (req, res) => {
  try {
    const cartCreated = await cartService.save();
    res.json({ status: "success", data: cartCreated });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
router.get("/:cid", (req, res) => {});
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.json({ status: "success", data: cartCreated });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export { router as cartsRouter };
