import React, { FC, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { defineMessages, InjectedIntl } from 'react-intl'

import { Button, IconClose } from 'vtex.styleguide'
import { MessagesOfProvider } from '../typings/typings'
import { getMessages } from '../utils/csv'

const { productCatalogMessage, uploadMessage } = defineMessages({
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

const CSVUploader: FC<CSVUploaderProps> = ({ intl, setMessages }) => {
  const [name, setName] = useState('')

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.csv'],
    multiple: false,
    onDrop: async ([upload]: File[]) => {
      if (!upload) {
        return // TODO: Rejected file
      }

      let error = null
      const messages = await getMessages(upload).catch(e => {
        error = e
        return [] as MessagesOfProvider[]
      })

      if (!error) {
        setName(upload.name)
        setMessages(messages)
        return
      }

      // TODO: treat errors
    },
  })

  const reset = () => {
    setMessages(null)
    setName('')
  }

  return (
    <div className="bb b--muted-4 nh7 ph7 pb7 mb7">
      <div className="flex items-center">
        <div className="flex-grow-1 tl">
          <p className="mb1 mt0">
            {intl.formatMessage(productCatalogMessage)}
          </p>
        </div>
        {!name ? (
          <div {...getRootProps()}>
            <Button variation="secondary">
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