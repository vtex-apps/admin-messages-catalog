import React from 'react'
import { FormattedMessage, InjectedIntlProps } from 'react-intl'

interface InstructionProps extends InjectedIntlProps {
  message: FormattedMessage.MessageDescriptor
}

const Instruction = ({ intl, message }: InstructionProps) => (
  <p className="mv7">{intl.formatMessage(message)}</p>
)

export default Instruction
