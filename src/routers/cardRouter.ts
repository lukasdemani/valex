import { Router } from "express";
import * as cardController from "../controllers/cardController";
import * as rechargeController from "../controllers/rechargeController";
import * as transactionController from "../controllers/transactionController";
import * as validateMiddleware from '../middewares/validateSchemaMiddleware';
import * as cardSchema from '../schemas/cardSchema';
import * as editCardSchema from  '../schemas/editCardSchema';
import * as rechargeSchema from '../schemas/rechargeSchema';
import * as transactionSchema from '../schemas/transactionSquema';

const cardRouter = Router();

cardRouter.post("/cards/new", validateMiddleware.validateSchemaMiddleware(cardSchema.default), cardController.newCard);
cardRouter.put("/cards/:id/edit", validateMiddleware.validateSchemaMiddleware(editCardSchema.default), cardController.cardEdit);
cardRouter.post("/cards/:id/recharge", validateMiddleware.validateSchemaMiddleware(rechargeSchema.default), rechargeController.rechargeCard);
cardRouter.get("/cards/:id/transactions", transactionController.getTransactions);
cardRouter.post("/cards/:id/transactions", validateMiddleware.validateSchemaMiddleware(transactionSchema.default), transactionController.insertTransaction);

export default cardRouter;