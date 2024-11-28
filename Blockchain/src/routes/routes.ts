import { Router } from "express";
import { ProductContractController } from "../controllers/ProductContractController";

const productContractController = new ProductContractController();
const router = Router();

// router.get("/example", exampleController.getExample);
router.post("/deploy-product-contract", productContractController.deploy);

export default router;