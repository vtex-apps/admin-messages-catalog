import React, { FC } from 'react'
import { defineMessages, InjectedIntl } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { StepCounterControl } from '../typings/typings'

const { backMessage, nextMessage, stepCounterMessage } = defineMessages({
  backMessage: {
    defaultMessage: '',
    id: 'admin/messages.back',
  },
  nextMessage: {
    defaultMessage: '',
    id: 'admin/messages.next',
  },
  stepCounterMessage: {
    defaultMessage: '',
    id: 'admin/messages.stepCounter',
  },
})

interface Props extends StepCounterControl {
  intl: InjectedIntl
  removeBack?: boolean
  nextDisabled?: boolean
}

const StepCounter: FC<Props> = ({
  intl,
  back,
  current,
  next,
  nextDisabled,
  removeBack,
  total,
}) => {
  return (
    <div className="flex items-center">
      <div className="c-muted-1 f6">
        {intl.formatMessage(stepCounterMessage, { current, total })}
      </div>
      <div className="flex-grow-1 tr">
        {current === 1 || removeBack ? null : (
          <span className="mh2">
            <Button variation="tertiary" onClick={back}>
              {intl.formatMessage(backMessage)}
            </Button>
          </span>
        )}
        {current === total ? null : (
          <span className="mh2">
            <Button disabled={nextDisabled} onClick={next}>
              {intl.formatMessage(nextMessage)}
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

export default StepCounter
