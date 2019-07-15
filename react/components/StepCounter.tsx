import React, { FC } from 'react'
import { defineMessages, InjectedIntl } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { StepCounterControl } from '../typings/typings'

const messages = defineMessages({
  back: {
    defaultMessage: '',
    id: 'admin/messages.back',
  },
  next: {
    defaultMessage: '',
    id: 'admin/messages.next',
  },
  stepCounter: {
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
        {intl.formatMessage(messages.stepCounter, { current, total })}
      </div>
      <div className="flex-grow-1 tr">
        {current === 1 || removeBack ? null : (
          <span className="mh2">
            <Button variation="tertiary" onClick={back}>
              {intl.formatMessage(messages.back)}
            </Button>
          </span>
        )}
        {current === total ? null : (
          <span className="mh2">
            <Button disabled={nextDisabled} onClick={next}>
              {intl.formatMessage(messages.next)}
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

export default StepCounter
