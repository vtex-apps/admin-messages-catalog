export enum TranslatableField {
  description = 'description',
  descriptionShort = 'descriptionShort',
  keywords = 'keywords',
  metaTagDescription = 'metaTagDescription',
  name = 'name',
  titleTag = 'titleTag',
}

export const FIELDS_TO_CSV_DESC : Record<TranslatableField, string> = {
  description: '_ProductDescription',
  descriptionShort : '_ProductShortDescription',
  keywords : '_Keywords',
  metaTagDescription : '_MetaTagDescription',
  name: '_ProductName',
  titleTag : '_SiteTitle',
}
