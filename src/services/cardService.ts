import * as employeeRepository from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import * as companyRespository from '../repositories/companyRepository';

export async function createCard(employeeId: number, isVirtual: boolean, isBlocked: boolean, cardType: cardRepository.TransactionTypes, apiKey: string){
    const testingApiKey = await companyRespository.findByApiKey(apiKey);
    if (!testingApiKey) throw { type: 'error', message: 'API Key is wrong'};
    
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) throw { type: 'notfound_error', message: "Employee doesn't exist"}

    const existingCardEmployee = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if (existingCardEmployee) throw { type: 'conflict', message: 'Employee already has a card' };

    const newCardNumber = faker.finance.creditCardNumber();

    const expirationDate = dayjs().add(5, 'year').format('MM/YY').toString();

    const securityCode = faker.finance.creditCardCVV()
    const hashedSecurityNumber = bcrypt.hashSync(securityCode, 12);
    const cardName = createNameCard(employee.fullName);

    const cardData: cardRepository.CardInsertData = {
        employeeId, 
        number: newCardNumber, 
        cardholderName: cardName,
        securityCode: hashedSecurityNumber,
        expirationDate,
        password: '',
        isVirtual,
        originalCardId: undefined,
        isBlocked,
        type: cardType
    }

    await cardRepository.insert(cardData);
    return {newCardNumber, cardName, securityCode, expirationDate, cardType}
}

export async function editCard (id: number, cardData: cardRepository.CardUpdateData){
    console.log(id)
    const existingCard = await cardRepository.findById(id)

    if (!existingCard) throw { type: 'Error', message:'Card doesnt exist' }
    if (existingCard.password !== '') throw { type: 'error', message: 'Card is already actived'}

    cardData.securityCode = existingCard.securityCode;

    await cardRepository.update(id, cardData)
}

function createNameCard(name: string){
    const nameArray = name.split(' ');
    let cardName = nameArray[0];

    for (let i=1; i<nameArray.length-1; i++){
        if (nameArray[i].length > 2){
            cardName += ` ${nameArray[i][0]}`
        }
    }
    cardName += ` ${nameArray[nameArray.length-1]}`;
    const nameUpperCase = cardName.toString().toUpperCase()
    return nameUpperCase;
}