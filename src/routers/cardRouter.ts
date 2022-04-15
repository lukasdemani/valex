import { Router } from "express";
import * as cardController from "../controllers/cardController";
import * as rechargeController from "../controllers/rechargeController";
import * as transactionController from "../controllers/transactionController"

const cardRouter = Router();

cardRouter.post("/cards/new", cardController.newCard);
cardRouter.put("/cards/:id/edit", cardController.cardEdit);
cardRouter.put("/cards/:id/recharge", rechargeController.rechargeCard);
cardRouter.get("/cards/:id/transactions", transactionController.getTransactions);
cardRouter.post("/cards/:id/transactions", transactionController.insertTransaction);

export default cardRouter;  