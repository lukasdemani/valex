import { Request, Response } from "express";
import * as transactionService from '../services/transactionService';

export async function insertTransaction(req: Request, res: Response){
    const { id } = req.params;
    const { businessId, amount } = req.body;

    const transactionData = {
        cardId: Number(id),
        businessId: Number(businessId),
        amount
    }

    try {
        await transactionService.newPayment(transactionData)
    }catch(err: any){
        return res.sendStatus(500).send({ message: err.message })
    }

    res.sendStatus(201);
}

export async function getTransactions(req: Request, res: Response){
    const { id } = req.params;

    const transactions = await transactionService.getTransactions(Number(id))

    res.send(transactions)
}