import React, { FC, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { defineMessages, InjectedIntl } from 'react-intl'

import { Alert, Button, IconClose } from 'vtex.styleguide'
import { MessagesOfProvider } from '../typings/typings'
import { getMessages } from '../utils/csv'

const MEGA = 2**20

const {
  productCatalogMessage,
  uploadMessage,
  noIdColumnMessage,
  notSupportedFileMessage,
  noTranslatableFieldMessage,
} = defineMessages({
  noIdColumnMessage: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.error-id-column',
  },
  noTranslatableFieldMessage: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.error-no-translatable-field',
  },
  notSupportedFileMessage: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.error-supported-file',
  },
  productCatalogMessage: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.product-catalog-label',
  },
  uploadMessage: {
    defaultMessage: '',
    id: 'admin/messages.messages-upload.upload-label',
  },
})


interface CSVUploaderProps {
  intl: InjectedIntl
  setMessages: (messages: MessagesOfProvider[] | null) => void
}

type ErrorCode = null | 'REJECTED' | 'NO_TRANSLATABLE_FIELD_FOUND' | 'ID_NOT_FOUND'

function errorToMessage(
  error: ErrorCode,
  { formatMessage }: InjectedIntl
): string {
  switch (error) {
    case null:
      return ''
    case 'REJECTED':
      return formatMessage(notSupportedFileMessage)
    case 'NO_TRANSLATABLE_FIELD_FOUND':
      return formatMessage(noTranslatableFieldMessage)
    case 'ID_NOT_FOUND':
      return formatMessage(noIdColumnMessage)
  }
}

const CSVUploader: FC<CSVUploaderProps> = ({ intl, setMessages }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState<ErrorCode>(null)
  const [loading, setLoading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.csv', '.xls', '.xlsx'],
    maxSize: 20 * MEGA,
    multiple: false,
    onDrop: async ([upload]: File[]) => {
      if (!upload) {
        setError('REJECTED')
        return 
      }

      let errorCode: ErrorCode = null
      setLoading(true)
      const messages = await getMessages(upload)
        .catch((e: Error) => {
          errorCode = e.message as ErrorCode
          return [] as MessagesOfProvider[]
        })
        .finally(() => setLoading(false))

      if (!errorCode) {
        setName(upload.name)
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
            {intl.formatMessage(productCatalogMessage)}
          </p>
        </div>
        {!name ? (
          <div {...getRootProps()}>
            <Button variation="secondary" isLoading={loading}>
              {intl.formatMessage(uploadMessage)}
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