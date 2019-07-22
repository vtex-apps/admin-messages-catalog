import React from 'react'
import { defineMessages } from 'react-intl'
import { ExportInstructionProps } from '../MessagesExport'

const messages = defineMessages({
  instruction: {
    defaultMessage: '',
    id: 'admin/messages.catalog.download.instruction1',
  },
})

const DownloadCatalogDataInstruction = ({ intl }: ExportInstructionProps) => (
  <div>
    <p className="mb1 mt0">{intl.formatMessage(messages.instruction)}</p>
  </div>
)

export default DownloadCatalogDataInstruction
