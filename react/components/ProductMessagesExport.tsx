import React, { FC, useCallback, useState } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'
import { Box, Button, PageBlock, ShowToastFunction, withToast } from 'vtex.styleguide'
import { ExportProductCatalogMutationFn } from '../mutations/ExportProductCatalog'
import { StepCounterControl } from '../typings/typings'
import StepCounter from './StepCounter'


const {
  catalogExportedMessage,
  exportBeganMessage,
  exportCatalogMessage,
  inst1Message,
  inst2Message,
  inst3Message,
  inst4Message,
  inst5Message,
  requiredMessage,
  somethingWrongMessage,
  step1Description,
  step1Name,
} = defineMessages({
  catalogExportedMessage: {
    defaultMessage: '',
    id: 'admin/messages.step1.catalog-exported',
  },
  exportBeganMessage: {
    defaultMessage: '',
    id: 'admin/messages.step1.export-began-toast',
  },
  exportCatalogMessage: {
    defaultMessage: '',
    id: 'admin/messages.step1.exportCatalog',
  },
  inst1Message: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction1',
  },
  inst2Message: {
    defaultMessage:
      '2. After exporting: open your email and download the attached file',
    id: 'admin/messages.step1.instruction2',
  },
  inst3Message: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction3',
  },
  inst4Message: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction4',
  },
  inst5Message: {
    defaultMessage:
      '5. After translating:  save the file and click Next to continue',
    id: 'admin/messages.step1.instruction5',
  },
  requiredMessage: {
    defaultMessage: '',
    id: 'admin/messages.required',
  },
  somethingWrongMessage: {
    defaultMessage: '',
    id: 'admin/messages.step1.something-wrong-toast',
  },
  step1Description: {
    defaultMessage: '',
    id: 'admin/messages.step1.productDescription',
  },
  step1Name: {
    defaultMessage: '',
    id: 'admin/messages.step1.name',
  },
})


interface Props {
  email: string
  exportProductCatalog: ExportProductCatalogMutationFn
  intl: InjectedIntl
  showToast: ShowToastFunction
  stepCounterControl: StepCounterControl
}

const ProductMessagesExport: FC<Props> = ({
  email,
  exportProductCatalog,
  intl,
  showToast,
  stepCounterControl,
}) => {
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)

  const exportCatalog = useCallback(() => {
    setExporting(true)
    exportProductCatalog()
      .catch(() => {
        setExported(false)
        showToast(intl.formatMessage(somethingWrongMessage))
      })
      .then(() => {
        setExported(true)
        showToast(intl.formatMessage(exportBeganMessage))
      })
  }, [])

  return (
    <PageBlock>
      <div className="bb b--muted-4  nh7 ph7 pb7 mb7">
        <div className="flex">
          <div>
            <p className="mb1 mt0">{intl.formatMessage(inst1Message)}</p>
            <p className="t-mini c-muted-2 mt1 pl5">{email}</p>
          </div>
          <div className="flex-grow-1 tr">
            <Button
              variation="secondary"
              isLoading={!exported && exporting}
              disabled={exported}
              onClick={exportCatalog}
            >
              {exported
                ? intl.formatMessage(catalogExportedMessage)
                : intl.formatMessage(exportCatalogMessage)}
            </Button>
          </div>
        </div>
      </div>
      <p className="mv7">{intl.formatMessage(inst2Message)}</p>
      <p className="mv7">
        {intl.formatMessage(inst3Message)}
      </p>
      <div>
        <p className="mv7">{intl.formatMessage(inst4Message)}</p>
        <Box noPadding>
          <div className="c-muted-1 ph5 pv2">
            <p>
              <span className="mr3 fw5">
                _ProductName ({intl.formatMessage(requiredMessage)})
              </span>{' '}
              <span className="f6">{intl.formatMessage(step1Name)}</span>
            </p>
            <p>
              <span className="mr3 fw5">_ProductDescription</span>{' '}
              <span className="f6">
                {intl.formatMessage(step1Description)}
              </span>
            </p>
          </div>
        </Box>
      </div>
      <p className="mv7">{intl.formatMessage(inst5Message)}</p>
      <StepCounter intl={intl} {...stepCounterControl} />
    </PageBlock>
  )
}

export default withToast(injectIntl(ProductMessagesExport))
