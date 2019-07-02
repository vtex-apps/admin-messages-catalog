import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { InjectedIntl, injectIntl } from 'react-intl'

import { Button, PageBlock, ProgressBar } from 'vtex.styleguide'

import { AddProductTranslationsMutationFn } from '../mutations/AddProductTranslations'
import { MessagesOfProvider, StepCounterControl, SupportedLocale } from '../typings/typings'
import { getLocaleMessage } from './LanguagePicker'
import StepCounter from './StepCounter'

const BATCH_SIZE = 10
const PROGRESS_BARS = 50

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
    return intl.formatMessage(
      { id: 'admin/messages.messages-progress.translate-progress' },
      { progress: uploaded - failed, total, language }
    )
 }

  if (failed > 0) {
    return intl.formatMessage(
      { id: 'admin/messages.messages-progress.translate-failed' },
      { failed }
    )
  }

  return intl.formatMessage(
    { id: 'admin/messages.messages-progress.translate-success' },
    { language }
  )
}

function getCurrentProgressPercentage(progress: number, total: number): string {
  return `${Math.floor((100 * progress) / total)} %`
}

interface Props {
  addProductTranslations: AddProductTranslationsMutationFn
  done: () => void
  intl: InjectedIntl
  locale: SupportedLocale
  stepCounterControl: StepCounterControl
  messages: MessagesOfProvider[]
  setMessages: Dispatch<SetStateAction<MessagesOfProvider[] | null>>
}

const ProductMessagesImport: FC<Props> = ({
  addProductTranslations,
  done,
  intl,
  locale,
  messages,
  setMessages,
  stepCounterControl,
}) => {
  const [cancelled, setCancelled] = useState(false)
  const [batchProgress, setBatchProgress] = useState(0)
  const [failedTranslations, setFailedTranslations] = useState(
    [] as MessagesOfProvider[]
  )

  const batchesNumber = Math.ceil(messages.length / BATCH_SIZE)

  useEffect(() => {
    if (cancelled) {
      return
    }
    const translations = messages.slice(batchProgress * BATCH_SIZE, BATCH_SIZE)
    addProductTranslations({ variables: { translations, language: locale! } })
      .then(result => {
        if (result && result.data) {
          const failedProviders = new Set(
            result.data.addProductTranslations.map(({ provider }) => provider)
          )
          setFailedTranslations([
            ...failedTranslations,
            ...translations.filter(({ provider }) =>
              failedProviders.has(provider)
            ),
          ])
        }
      })
      .then(() => {
        if (batchProgress < batchesNumber) {
          setBatchProgress(batchProgress + 1)
        }
      })
  }, [batchProgress, cancelled])

  const progress = Math.min(batchProgress * BATCH_SIZE, messages.length)
  const total = messages.length

  const language = intl.formatMessage(getLocaleMessage(locale))

  const retry = () => {
    setMessages(failedTranslations)
    setFailedTranslations([])
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
            {intl.formatMessage({ id: 'admin/messages.cancel' })}
          </Button>
        ) : failedTranslations.length > 0 ? (
          <Button onClick={retry}>
            {intl.formatMessage({ id: 'admin/messages.retry' })}
          </Button>
        ) : (
          <Button onClick={done}>
            {intl.formatMessage({ id: 'admin/messages.done' })}
          </Button>
        )}
      </div>
      <StepCounter removeBack {...stepCounterControl} intl={intl} />
    </PageBlock>
  )
}

export default injectIntl(ProductMessagesImport)
