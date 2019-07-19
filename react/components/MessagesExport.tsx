import React, { FC, useCallback, useState } from 'react'
import { defineMessages, InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl'
import {
  Alert,
  Button,
  PageBlock,
  ToastProps,
  withToast
} from 'vtex.styleguide'
import { StepCounterControl } from '../typings/typings'
import { Entity } from '../utils/constants'
import CatalogRemainingInstructions from './utils/CatalogRemainingInstructions'
import ExportCatalogInstruction from './utils/ExportCatalogInstruction'
import StepCounter from './utils/StepCounter'

const messages = defineMessages({
  catalogExported: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.catalog-exported',
  },
  exportBegan: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.export-began',
  },
  exportCatalog: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.exportCatalog',
  },
  somethingWrong: {
    defaultMessage: '',
    id: 'admin/messages.catalog.export.something-wrong',
  },
})

export interface ExportInstructionProps extends InjectedIntlProps {
  email: string
}

const getExportInstruction = (entity: Entity, props: ExportInstructionProps) => {
  switch(entity) {
    case 'product':
    case 'sku':
      return <ExportCatalogInstruction {...props} />
    default:
      return null
  }
}

const getRemaningInstructions = (entity: Entity, props: InjectedIntlProps) => {
  switch(entity) {
    case 'product':
    case 'sku':
      return <CatalogRemainingInstructions {...props} entity={entity} />
    default:
      return null
  }
}

type State = null | 'exporting' | 'exported' | 'error'

interface Props extends ToastProps {
  email: string
  entity: Entity
  exportCSV: () => Promise<any>
  intl: InjectedIntl
  stepCounterControl: StepCounterControl
}

const MessagesExport: FC<Props> = ({
  email,
  entity,
  exportCSV,
  intl,
  showToast,
  stepCounterControl,
}) => {
  const [exportState, setExportState] = useState<State>(null)

  const onExportCSV = useCallback(() => {
    setExportState('exporting')
    exportCSV()
      .catch(() => setExportState('error'))
      .then(() => {
        setExportState('exported')
        showToast(intl.formatMessage(messages.exportBegan))
      })
  }, [])

  return (
    <PageBlock>
      {exportState === 'error' && (
        <div className="mb7">
          <Alert type="error" onClose={() => setExportState(null)}>
            {intl.formatMessage(messages.somethingWrong)}
          </Alert>
        </div>
      )}
      <div className="bb b--muted-4  nh7 ph7 pb7 mb7">
        <div className="flex">
          {getExportInstruction(entity, { email, intl })}
          <div className="flex-grow-1 tr">
            <Button
              variation="secondary"
              isLoading={exportState === 'exporting'}
              disabled={exportState === 'exported'}
              onClick={onExportCSV}
            >
              {exportState === 'exported'
                ? intl.formatMessage(messages.catalogExported)
                : intl.formatMessage(messages.exportCatalog)}
            </Button>
          </div>
        </div>
      </div>
      {getRemaningInstructions(entity, { intl })}
      <StepCounter intl={intl} {...stepCounterControl} />
    </PageBlock>
  )
}

export default withToast(injectIntl(MessagesExport))
