import * as rechargeRepository from '../repositories/rechargeRepository';
import * as cardRepository from '../repositories/cardRepository';
import dayjs from 'dayjs';

export async function rechargeCard(rechargeData: rechargeRepository.RechargeInsertData){
    const existingCard = await cardRepository.findById(rechargeData.cardId);
    if (!existingCard) throw { type: "Error", message: 'Card doensnt exist' }
    
    const isExpirated = dayjs().isBefore(dayjs(existingCard.expirationDate));
    if (isExpirated) throw { type: 'Error', message: 'Card expirated'}

    await rechargeRepository.insert(rechargeData)
}