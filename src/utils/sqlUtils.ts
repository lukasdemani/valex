import * as cardRepository from '../repositories/cardRepository';

interface DataOptions {
  object: cardRepository.CardUpdateData,
  offset: number
}

export function mapObjectToUpdateQuery({ object , offset = 1 }:DataOptions) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}
