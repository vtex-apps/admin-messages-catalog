import React, { FC, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { defineMessages, InjectedIntl } from 'react-intl'

import { Alert, Button, IconClose } from 'vtex.styleguide'
import { MessagesOfProvider } from '../typings/typings'
import { Entity } from '../utils/constants'
import { getMessages } from '../utils/csv'

const MEGA = 2**20

const {
  productCatalog,
  upload,
  noIdColumn,
  notSupportedFile,
  noTranslatableField,
} = defineMessages({
  noIdColumn: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.error-id-column',
  },
  noTranslatableField: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.error-no-translatable-field',
  },
  notSupportedFile: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.error-supported-file',
  },
  productCatalog: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.catalog-label',
  },
  upload: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.upload-label',
  },
})

type ErrorCode = null | 'REJECTED' | 'NO_TRANSLATABLE_FIELD_FOUND' | 'ID_NOT_FOUND'

function errorToMessage(
  error: ErrorCode,
  { formatMessage }: InjectedIntl
): string {
  switch (error) {
    case null:
      return ''
    case 'REJECTED':
      return formatMessage(notSupportedFile)
    case 'NO_TRANSLATABLE_FIELD_FOUND':
      return formatMessage(noTranslatableField)
    case 'ID_NOT_FOUND':
      return formatMessage(noIdColumn)
  }
}

interface CSVUploaderProps {
  entity: Entity
  intl: InjectedIntl
  setMessages: (messages: MessagesOfProvider[] | null) => void
}

const CSVUploader: FC<CSVUploaderProps> = ({ entity, intl, setMessages }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState<ErrorCode>(null)
  const [loading, setLoading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.csv', '.xls', '.xlsx'],
    maxSize: 20 * MEGA,
    multiple: false,
    onDrop: async ([uploadedFile]: File[]) => {
      if (!uploadedFile) {
        setError('REJECTED')
        return 
      }

      let errorCode: ErrorCode = null
      setLoading(true)
      const messages = await getMessages(entity, uploadedFile)
        .catch((e: Error) => {
          errorCode = e.message as ErrorCode
          return [] as MessagesOfProvider[]
        })
        .finally(() => setLoading(false))

      if (!errorCode) {
        setName(uploadedFile.name)
        setMessages(messages)
        setError(null)
        return
      }

      setError(errorCode)
    },
  })

  const reset = () => {
    setMessages(null)
    setName('')
  }

  return (
    <div className="bb b--muted-4 nh7 ph7 pb7 mb7">
      {!!error ? (
        <div className="mb7">
          <Alert type="error" onClose={() => setError(null)}>
            {errorToMessage(error, intl)}
          </Alert>
        </div>
      ) : null}
      <div className="flex items-center">
        <div className="flex-grow-1 tl">
          <p className="mb1 mt0">
            {intl.formatMessage(productCatalog)}
          </p>
        </div>
        {!name ? (
          <div {...getRootProps()}>
            <Button variation="secondary" isLoading={loading}>
              {intl.formatMessage(upload)}
            </Button>
            <input {...getInputProps()} />
          </div>
        ) : (
          <>
            <p>{name}</p>
            <div className="ph3 pointer" onClick={reset}>
              <IconClose />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CSVUploader