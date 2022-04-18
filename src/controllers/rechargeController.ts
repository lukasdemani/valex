import { Request, Response } from "express";
import * as rechargeService from '../services/rechargeService';;

export async function rechargeCard(req: Request, res: Response){
    const { id } = req.params;
    const { amount } = req.body;

    const cardData = {
        cardId: Number(id),
        amount
    }


    try {
        await rechargeService.rechargeCard(cardData);
    }catch(err: any){
        return res.sendStatus(500).send({ message: err.message })
    }

    res.sendStatus(201);
}