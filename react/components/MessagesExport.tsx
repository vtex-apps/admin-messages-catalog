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
import DownloadCatalogDataInstruction from './utils/DownloadCatalogDataInstruction'
import DownloadCatalogRemainingInstructions from './utils/DownloadCatalogRemainingInstructions'
import ExportCatalogInstruction from './utils/ExportCatalogInstruction'
import ExportCatalogRemainingInstructions from './utils/ExportCatalogRemainingInstructions'
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

type State = null | 'exporting' | 'exported' | 'error'

export interface ExportInstructionProps extends InjectedIntlProps {
  email: string
}

const getExportInstruction = (entity: Entity, props: ExportInstructionProps) => {
  switch(entity) {
    case 'product':
    case 'sku':
      return <ExportCatalogInstruction {...props} />
    case 'brand':
    case 'category':
      return <DownloadCatalogDataInstruction {...props} />
    default:
      return null
  }
}

const getRemaningInstructions = (entity: Entity, props: InjectedIntlProps) => {
  switch(entity) {
    case 'product':
    case 'sku':
      return <ExportCatalogRemainingInstructions {...props} entity={entity} />
    case 'brand':
    case 'category':
      return <DownloadCatalogRemainingInstructions {...props} entity={entity} />
    default:
      return null
  }
}

interface ButtonProps extends InjectedIntlProps {
  entity: Entity
  exportState: State
  onExportCSV: () => void
}

const ExportButton = ({ entity, intl, exportState, onExportCSV }: ButtonProps) => {
  switch (entity) {
    case 'product':
    case 'sku':
      return (
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
      )
    case 'brand':
        return (
          <Button
            variation="secondary"
            href="/_v/private/vtex.admin-messages/v1/brands"
          >
            {intl.formatMessage(messages.exportCatalog)}
          </Button>
        )
    case 'category':
        return (
          <Button
            variation="secondary"
            href="/_v/private/vtex.admin-messages/v1/categories"
          >
            {intl.formatMessage(messages.exportCatalog)}
          </Button>
        )
    default:
      return null
  }
}

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
            <ExportButton
              entity={entity}
              intl={intl}
              exportState={exportState}
              onExportCSV={onExportCSV}
            />
          </div>
        </div>
      </div>
      {getRemaningInstructions(entity, { intl })}
      <StepCounter intl={intl} {...stepCounterControl} />
    </PageBlock>
  )
}

export default withToast(injectIntl(MessagesExport))
