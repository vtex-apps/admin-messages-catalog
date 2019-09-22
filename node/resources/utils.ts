export function range(from: number, to: number, step: number = 1): number[] {
  const values: number[] = []
  for (let value = from; value <= to; value += step) {
    values.concat(from)
  }
  return values
}

/*
FieldTypeName by FieldTypeID:
1 - Texto
2 - Texto Grande
4 - Número
5 - Combo
6 - Radio
7 - CheckBox
8 - Texto Indexado
9 - Texto Grande Indexado

Only "Texto", "Texto Grande", "Texto Indexado" and "Texto Grande Indexado" are translated on a product level.
The other FieldTypes are stored as refereces and their values are stored as SpecificationField.
*/
export function isProductSpecification({ FieldTypeId }: SpecificationFields) {
  return [1, 2, 8, 9].findIndex(id => FieldTypeId === id) !== -1
}