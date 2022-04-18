import * as paymentRepository from '../repositories/paymentRepository';
import * as cardRepository from '../repositories/cardRepository';
import * as businessRepository from '../repositories/businessRepository';
import * as rechargeRepository from '../repositories/rechargeRepository'
import dayjs from 'dayjs';

export async function getTransactions (id: number){
    const card = await cardRepository.findById(id);
    if (!card) throw { type: 'Error' };

    const payments = await paymentRepository.findByCardId(id);
    if (!payments) throw { type: 'Error' };

    const recharges = await rechargeRepository.findByCardId(id);
    if (!recharges) throw { type: 'Error' };

    const balance = getBalance(id);

    const allTransactions = {
        balance,
        transactions: payments,
        recharges
    }

    return allTransactions;
}

export async function newPayment(paymentData: paymentRepository.PaymentInsertData){
    
    const card = await cardRepository.findById(paymentData.cardId);
    if (!card) throw { type: 'Error', message: 'Card doesnt exist' };

    const isExpirated = dayjs().isBefore(dayjs(card.expirationDate));
    if (isExpirated) throw { type: 'Error', message: 'Card expirated'}

    const existingBusiness = await businessRepository.findById(paymentData.businessId)
    if (!existingBusiness) throw { type: 'Error', message: 'Business doesnt registered' }

    const isSameType = existingBusiness.type !== card.type
    if (!isSameType) throw { type: 'Error', messagem: 'Different type' }

    const balance = await getBalance(paymentData.cardId);
    if (balance < paymentData.amount) throw { type: 'Error', message: 'Insufficient card balance' }

    await paymentRepository.insert(paymentData);
}

async function getBalance(cardId: number){
    const amountPayment = await paymentRepository.totalPayment(cardId)
    const amountRecharge = await rechargeRepository.totalRecharge(cardId)
    const balance = amountRecharge - amountPayment;

    return balance;
}