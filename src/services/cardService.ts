import * as employeeRepository from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

export async function createCard(idEmployee: number, cardType: cardRepository.TransactionTypes){
    const employee = await employeeRepository.findById(idEmployee);

    if (!employee) throw { type: "Error" }

    const existingCardEmployee = await cardRepository.findByTypeAndEmployeeId(cardType, idEmployee);

    if (existingCardEmployee) throw { type: "conflict" }

    const newCardNumber = faker.finance.creditCardNumber('mastercard');

    const existingCard = await cardRepository.findByNumber(newCardNumber);

    const expirationDate = String(dayjs().add(5, 'year').format('MM/YY').toString);

    const hashedSecurityNumber = bcrypt.hashSync(faker.finance.creditCardCVV(), 12);
    const cardName = String(createNameCard(employee.fullName));

    const card = cardRepository.insert(
        idEmployee, 
        Number(newCardNumber), 
        cardName,
        hashedSecurityNumber,
        expirationDate,
        '0000',
        false,
        0,
        true,
        cardType)

    return {
        
    }
}

function createNameCard(name: string){
    const nameArray = name.split(' ');
    let cardName = nameArray[0];
    for (let i=1; i<nameArray.length-1; i++){
        if (nameArray[i].length > 2){
            cardName += ` ${nameArray[i][0]}`
        }
    }
    cardName += nameArray[nameArray.length-1];

    return cardName.toUpperCase;
}