import React from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'
import ColumnBox from './ColumnBox'
import Instruction from './Instruction'

const productMessages = defineMessages({
  instruction1: {
    defaultMessage: '',
    id: 'admin/messages.step1.instruction1',
  },
  instruction2: {
    defaultMessage: '',
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
    defaultMessage: '',
    id: 'admin/messages.step1.instruction5',
  },
})

const ProductRemainingInstructions = ({ intl }: InjectedIntlProps) => (
  <>
    <Instruction intl={intl} message={productMessages.instruction2} />
    <Instruction intl={intl} message={productMessages.instruction3} />
    <div>
      <Instruction intl={intl} message={productMessages.instruction4} />
      <ColumnBox entity="product" />
    </div>
    <Instruction intl={intl} message={productMessages.instruction5} />
  </>
)

export default ProductRemainingInstructions
