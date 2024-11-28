import { Router } from "express";
import { ExampleController } from "../controllers/ExampleController";

const exampleController = new ExampleController();
const router = Router();

router.get("/example", exampleController.getExample);
router.post("/example", exampleController.postExample);

export default router;