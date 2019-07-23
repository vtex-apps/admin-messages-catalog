import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'

import { Button, PageBlock, ProgressBar } from 'vtex.styleguide'

import { AddTranslationsMutationFn } from '../mutations/AddTranslations'
import { MessagesOfProvider, StepCounterControl, SupportedLocale } from '../typings/typings'
import { Entity } from '../utils/constants'
import { LOCALE_TO_MESSAGE } from './utils/LanguagePicker'
import StepCounter from './utils/StepCounter'

const BATCH_SIZE = 10
const PROGRESS_BARS = 50

const messages = defineMessages({
  cancel: {
    defaultMessage: '',
    id: 'admin/messages.cancel',
  },
  done: {
    defaultMessage: '',
    id: 'admin/messages.done',
  },
  progress: {
    defaultMessage: '',
    id: 'admin/messages.messages-progress.translate-progress',
  },
  retry: {
    defaultMessage: '',
    id: 'admin/messages.retry',
  },
  translationFaileded: {
    defaultMessage: '',
    id: 'admin/messages.messages-progress.translation-faileded',
  },
  translationSucceeded: {
    defaultMessage: '',
    id: 'admin/messages.messages-progress.translation-succeeded',
  },
})

function getProgressBarState(progress: number, total: number): string[] {
  const completed = Math.floor((progress / total) * PROGRESS_BARS)
  const inProgress =
    progress < total
      ? Math.min(
          Math.max(1, Math.ceil((PROGRESS_BARS * BATCH_SIZE) / total)),
          PROGRESS_BARS - completed
        )
      : 0
  return [
    ...Array(completed).fill('completed'),
    ...Array(inProgress).fill('inProgress'),
    ...Array(PROGRESS_BARS - completed - inProgress).fill('toDo'),
  ]
}

function getUploadProgressMessage(
  uploaded: number,
  total: number,
  failed: number,
  language: string,
  intl: InjectedIntl
) {
  if (uploaded < total) {
    return intl.formatMessage(messages.progress, {
      language,
      progress: uploaded - failed,
      total,
    })
  }

  if (failed > 0) {
    return intl.formatMessage(messages.translationFaileded, { failed })
  }

  return intl.formatMessage(messages.translationSucceeded, { language })
}

function getCurrentProgressPercentage(progress: number, total: number): string {
  return `${Math.floor((100 * progress) / total)} %`
}

interface Props {
  addTranslations: AddTranslationsMutationFn
  done: () => void
  entity: Entity
  intl: InjectedIntl
  locale: SupportedLocale
  stepCounterControl: StepCounterControl
  messages: MessagesOfProvider[]
  setMessages: Dispatch<SetStateAction<MessagesOfProvider[] | null>>
}

const MessagesProgress: FC<Props> = ({
  addTranslations,
  done,
  entity,
  intl,
  locale,
  messages: translationMessages,
  setMessages,
  stepCounterControl,
}) => {
  const [cancelled, setCancelled] = useState(false)
  const [batchProgress, setBatchProgress] = useState(0)
  const [lastRetry, setLastRetry] = useState(-1)
  const [failedTranslations, setFailedTranslations] = useState(
    [] as MessagesOfProvider[]
  )

  const batchesNumber = Math.ceil(translationMessages.length / BATCH_SIZE)

  useEffect(() => {
    if (cancelled) {
      return
    }

    const start = batchProgress * BATCH_SIZE
    const end = Math.min(
      start + BATCH_SIZE - 1,
      translationMessages.length - 1
    )
    const translations = translationMessages.slice(start, end)

    addTranslations({ variables: { entity, translations, language: locale! } })
      .then(result => {
        if (result && result.data) {
          const failedProviders = new Set(
            result.data.addTranslations.map(({ provider }) => provider)
          )
          setFailedTranslations([
            ...failedTranslations,
            ...translations.filter(({ provider }) =>
              failedProviders.has(provider)
            ),
          ])
        }
      })
      .catch(() => {
        if (lastRetry === batchProgress) {
          setFailedTranslations([...failedTranslations, ...translations])
          return
        }
        setLastRetry(batchProgress)
      })
      .then(() => {
        if (batchProgress < batchesNumber) {
          setBatchProgress(batchProgress + 1)
        }
      })
  }, [batchProgress, cancelled, lastRetry])

  const progress = Math.min(
    batchProgress * BATCH_SIZE,
    translationMessages.length
  )
  const total = translationMessages.length

  const language = intl.formatMessage(LOCALE_TO_MESSAGE[locale])

  const retry = () => {
    setMessages(failedTranslations)
    setFailedTranslations([])
    setCancelled(false)
    setBatchProgress(0)
    setLastRetry(-1)
  }

  const cancel = () => {
    setCancelled(true)
    done()
  }

  return (
    <PageBlock>
      <div className="flex items-center flex-column mb3">
        <p>
          {getUploadProgressMessage(
            progress,
            total,
            failedTranslations.length,
            language,
            intl
          )}
        </p>
        <div className="mv3 w-100">
          <ProgressBar
            danger={failedTranslations.length > 0}
            steps={getProgressBarState(progress, total)}
          />
        </div>
        <p>{getCurrentProgressPercentage(progress, total)}</p>
        {progress < total ? (
          <Button variation="secondary" onClick={cancel}>
            {intl.formatMessage(messages.cancel)}
          </Button>
        ) : failedTranslations.length > 0 ? (
          <Button onClick={retry}>{intl.formatMessage(messages.retry)}</Button>
        ) : (
          <Button onClick={done}>{intl.formatMessage(messages.done)}</Button>
        )}
      </div>
      <StepCounter removeBack {...stepCounterControl} intl={intl} />
    </PageBlock>
  )
}

export default injectIntl(MessagesProgress)
