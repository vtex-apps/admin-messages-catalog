import React from 'react'
import { defineMessages } from 'react-intl'
import { ExportInstructionProps } from '../MessagesExport'

const messages = defineMessages({
  instruction1: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.instruction1',
  },
})

const ExportCatalogInstruction = ({
  email,
  intl,
}: ExportInstructionProps) => (
  <div>
    <p className="mb1 mt0">{intl.formatMessage(messages.instruction1)}</p>
    <p className="t-mini c-muted-2 mt1 pl5">{email}</p>
  </div>
)

export default ExportCatalogInstruction
