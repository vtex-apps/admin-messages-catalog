import React from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import { Entity } from '../../utils/constants'
import ColumnBox from './ColumnBox'
import Instruction from './Instruction'

const messages = defineMessages({
  instruction2: {
    defaultMessage: '',
    id: 'admin/messages.catalog.download.instruction2',
  },
  instruction3: {
    defaultMessage: '',
    id: 'admin/messages.catalog.download.instruction3',
  },
  instruction4: {
    defaultMessage: '',
    id: 'admin/messages.catalog.download.instruction4',
  },
})

interface Props extends InjectedIntlProps {
  entity: Entity
}

const DownloadCatalogRemainingInstructions = ({ entity, intl }: Props) => (
  <>
    <Instruction intl={intl} message={messages.instruction2} />
    <div>
      <Instruction intl={intl} message={messages.instruction3} />
      <ColumnBox entity={entity} />
    </div>
    <Instruction intl={intl} message={messages.instruction4} />
  </>
)

export default DownloadCatalogRemainingInstructions
