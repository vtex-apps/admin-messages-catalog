import { uniqBy, unnest } from 'ramda'
import { SpecificationTranslatables, SpecificationValueTranslatables } from '../typings/typings'
import { createXLSX, jsonToXLSXFields } from './xlsx'

const specificationToXLSXMap: Record<keyof SpecificationTranslatables, string> = {
  FieldId: '_FieldId',
  Name: '_Name',
}

const valueToXLSXMap: Record<keyof SpecificationValueTranslatables, string> = {
  FieldValueId: '_ValueId',
  Value: '_Value',
}

export async function getCategorySpecsXLXS(ctx: Context) {
  const { clients: { catalog } } = ctx
  const categories = await catalog.exportCategories()

  const specifications = await Promise.all([
    catalog.getSpecificationsTreeByCategory(categories[0].id),
    ...categories.map(({ id }) => catalog.getSpecificationsByCategory(id)),
  ])
    .then(specificationsByCategory => unnest(specificationsByCategory))
    .then(uniqBy(({ FieldId }) => FieldId))

  const specificationValues = await Promise.all(
    specifications.map(({ FieldId }) => catalog.getSpecificationValues(FieldId))
  )
    .then(valuesBySpecification => unnest(valuesBySpecification))
    .then(uniqBy(({ FieldValueId }) => FieldValueId))

  const specificationsXLSX = specifications.map(specification =>
    jsonToXLSXFields(specification, specificationToXLSXMap)
  )
  const valuesXLSX = specificationValues.map(value =>
    jsonToXLSXFields(value, valueToXLSXMap)
  )

  return createXLSX({ 
    Specifications: specificationsXLSX,
    Values: valuesXLSX,
  })
}