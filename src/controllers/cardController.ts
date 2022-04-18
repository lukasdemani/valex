import { Request, Response } from "express";
import { CardUpdateData } from "../repositories/cardRepository";
import * as cardService from '../services/cardService';

export async function newCard(req: Request, res: Response) {
    const { employeeId, isVirtual, isBlocked, type } = req.body;
    let newCard = {};
    const apiKey = String(req.headers['x-api-key']);

    try {
        newCard = await cardService.createCard(employeeId, isVirtual, isBlocked, type, apiKey)
    }catch(err: any){
        return res.sendStatus(404).send({ message: err.message })
    }

    res.status(201).send(newCard);
}

export async function cardEdit(req: Request, res: Response) {
    const { id } = req.params;
    const cardData: CardUpdateData = req.body;

    try {
        await cardService.editCard(parseInt(id), cardData);
    }catch(err: any){
        return res.sendStatus(500).send({ message: err.message })
    }

    res.sendStatus(201)
}