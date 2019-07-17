import React, { FC, useCallback, useMemo, useState } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'
import {
  Alert,
  Box,
  Button,
  PageBlock,
  ToastProps,
  withToast
} from 'vtex.styleguide'
import { ExportProductCatalogMutationFn } from '../mutations/ExportProductCatalog'
import { StepCounterControl } from '../typings/typings'
import { TranslatableField } from '../utils/constants'
import ColumnDescription from './ColumnDescription'
import StepCounter from './StepCounter'

const messages = defineMessages({
  catalogExported: {
    defaultMessage: '',
    id: 'admin/messages.step1.catalog-exported',
  },
  exportBegan: {
    defaultMessage: '',
    id: 'admin/messages.step1.export-began',
  },
  exportCatalog: {
    defaultMessage: '',
    id: 'admin/messages.step1.exportCatalog',
  },
  instruction1: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction1',
  },
  instruction2: {
    defaultMessage:
      '2. After exporting: open your email and download the attached file',
    id: 'admin/messages.step1.instruction2',
  },
  instruction3: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction3',
  },
  instruction4: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction4',
  },
  instruction5: {
    defaultMessage:
      '5. After translating:  save the file and click Next to continue',
    id: 'admin/messages.step1.instruction5',
  },
  required: {
    defaultMessage: '',
    id: 'admin/messages.required',
  },
  somethingWrong: {
    defaultMessage: '',
    id: 'admin/messages.step1.something-wrong',
  },
  step1Description: {
    defaultMessage: '',
    id: 'admin/messages.catalog.productDescription',
  },
  step1Name: {
    defaultMessage: '',
    id: 'admin/messages.catalog.name',
  },
})

type State = null | 'exporting' | 'exported' | 'error'

interface Props extends ToastProps {
  email: string
  exportProductCatalog: ExportProductCatalogMutationFn
  intl: InjectedIntl
  stepCounterControl: StepCounterControl
}

const ProductMessagesExport: FC<Props> = ({
  email,
  exportProductCatalog,
  intl,
  showToast,
  stepCounterControl,
}) => {
  const [exportState, setExportState] = useState<State>(null)

  const exportCatalog = useCallback(() => {
    setExportState('exporting')
    exportProductCatalog()
      .catch(() => setExportState('error'))
      .then(() => {
        setExportState('exported')
        showToast(intl.formatMessage(messages.exportBegan))
      })
  }, [])

  const translatableFields : TranslatableField[] = useMemo(
    () => Object.values(TranslatableField),
    []
  )

  return (
    <PageBlock>
      {exportState === 'error' ? (
        <div className="mb7">
          <Alert type="error" onClose={() => setExportState(null)}>
            {intl.formatMessage(messages.somethingWrong)}
          </Alert>
        </div>
      ) : null}
      <div className="bb b--muted-4  nh7 ph7 pb7 mb7">
        <div className="flex">
          <div>
            <p className="mb1 mt0">
              {intl.formatMessage(messages.instruction1)}
            </p>
            <p className="t-mini c-muted-2 mt1 pl5">{email}</p>
          </div>
          <div className="flex-grow-1 tr">
            <Button
              variation="secondary"
              isLoading={exportState === 'exporting'}
              disabled={exportState === 'exported'}
              onClick={exportCatalog}
            >
              {exportState === 'exported'
                ? intl.formatMessage(messages.catalogExported)
                : intl.formatMessage(messages.exportCatalog)}
            </Button>
          </div>
        </div>
      </div>
      <p className="mv7">{intl.formatMessage(messages.instruction2)}</p>
      <p className="mv7">{intl.formatMessage(messages.instruction3)}</p>
      <div>
        <p className="mv7">{intl.formatMessage(messages.instruction4)}</p>
        <Box noPadding>
          <div className="c-muted-1 ph5 pv2">
            {translatableFields.map((field: TranslatableField) => (
              <ColumnDescription field={field} key={field} />
            ))}
          </div>
        </Box>
      </div>
      <p className="mv7">{intl.formatMessage(messages.instruction5)}</p>
      <StepCounter intl={intl} {...stepCounterControl} />
    </PageBlock>
  )
}

export default withToast(injectIntl(ProductMessagesExport))
