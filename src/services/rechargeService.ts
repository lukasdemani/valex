import * as rechargeRepository from '../repositories/rechargeRepository';
import * as cardRepository from '../repositories/rechargeRepository';

export async function rechargeCard(id: number){
    const existingCard = await cardRepository.findByCardId(id);

    if (!existingCard) throw { type: Error }

    if (existingCard.)
}