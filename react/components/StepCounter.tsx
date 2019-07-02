import React, { FC } from 'react'
import { InjectedIntl } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { StepCounterControl } from '../typings/typings'

interface Props extends StepCounterControl {
  intl: InjectedIntl
  nextDisabled?: boolean
}

const StepCounter: FC<Props> = ({
  intl,
  back,
  next,
  nextDisabled,
  current,
  total,
}) => {
  return (
    <div className="flex items-center">
      <div className="c-muted-1 f6">
        {intl.formatMessage(
          { id: 'admin/messages.stepCounter' },
          { current, total }
        )}
      </div>
      <div className="flex-grow-1 tr">
        {current === 1 ? null : (
          <span className="mh2">
            <Button variation="tertiary" onClick={back}>
              {intl.formatMessage({ id: 'admin/messages.back' })}
            </Button>
          </span>
        )}
        <span className="mh2">
          <Button disabled={nextDisabled} onClick={next}>
            {intl.formatMessage({ id: 'admin/messages.next' })}
          </Button>
        </span>
      </div>
    </div>
  )
}

export default StepCounter
