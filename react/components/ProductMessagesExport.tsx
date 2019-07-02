import React, { FC } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'
import { Box, Button, PageBlock } from 'vtex.styleguide'
import { StepCounterControl } from '../typings/typings'
import StepCounter from './StepCounter'


const {
  inst1Message,
  inst2Message,
  inst3Message,
  inst4Message,
  inst5Message,
  requiredMessage,
  exportCatalogMessage,
  step1Description,
  step1Name,
} = defineMessages({
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
  intl: InjectedIntl
  stepCounterControl: StepCounterControl
}

const ProductMessagesExport: FC<Props> = ({
  email,
  intl,
  stepCounterControl,
}) => {
  return (
    <PageBlock>
      <div className="bb b--muted-4  nh7 ph7 pb7 mb7">
        <div className="flex">
          <div>
            <p className="mb1 mt0">{intl.formatMessage(inst1Message)}</p>
            <p className="t-mini c-muted-2 mt1 pl5">{email}</p>
          </div>
          <div className="flex-grow-1 tr">
            <Button variation="secondary">
              {intl.formatMessage(exportCatalogMessage)}
            </Button>
          </div>
        </div>
      </div>
      <p className="mv7">{intl.formatMessage(inst2Message)}</p>
      <p className="mv7">
        {intl.formatMessage(inst3Message, { file: 'catalog.csv' })}
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
              <span className="f6">{intl.formatMessage(step1Description)}</span>
            </p>
          </div>
        </Box>
      </div>
      <p className="mv7">{intl.formatMessage(inst5Message)}</p>
      <StepCounter intl={intl} {...stepCounterControl} />
    </PageBlock>
  )
}

export default injectIntl(ProductMessagesExport)
