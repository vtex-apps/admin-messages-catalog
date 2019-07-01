import React, {FC} from 'react'
import {defineMessages, InjectedIntl, injectIntl} from 'react-intl'
import {Box, Button, Layout, PageBlock, PageHeader} from 'vtex.styleguide'

interface Props {
  intl: InjectedIntl
}

const AdminMessages: FC<Props> = ({intl}) => {
  return (
    <div className="min-vh-100 bg-muted-5">
      <Layout
        pageHeader={
          <PageHeader
            title={intl.formatMessage({id: 'admin/messages.headerTitle'})}
          />
        }>
        <PageBlock>
          <div className="bb b--muted-4  nh7 ph7 pb7 mb7">
            <div className="flex">
              <div>
                <p className="mb1 mt0">
                  {intl.formatMessage({
                    id: 'admin/messages.step1.instruction1',
                  })}
                </p>
                <p className="t-mini c-muted-2 mt1 pl5">nardi@vtex.com.br</p>
              </div>
              <div className="flex-grow-1 tr">
                <Button variation="secondary">
                  {intl.formatMessage({
                    id: 'admin/messages.step1.exportCatalog',
                  })}
                </Button>
              </div>
            </div>
          </div>
          <p className="mv7">
            {intl.formatMessage({
              id: 'admin/messages.step1.instruction2',
            })}
          </p>
          <p className="mv7">
            {intl.formatMessage(
              {
                id: 'admin/messages.step1.instruction3',
              },
              {file: 'catalog.csv'}
            )}
          </p>
          <div>
            <p className="mv7">
              {intl.formatMessage({
                id: 'admin/messages.step1.instruction4',
              })}
            </p>
            <Box noPadding>
              <div className="c-muted-1 ph5 pv2">
                <p>
                  <span className="mr3 fw5">
                    _ProductName (
                    {intl.formatMessage({
                      id: 'admin/messages.required',
                    })}
                    )
                  </span>{' '}
                  <span className="f6">
                    {intl.formatMessage({
                      id: 'admin/messages.step1.name',
                    })}
                  </span>
                </p>
                <p>
                  <span className="mr3 fw5">_ProductDescription</span>{' '}
                  <span className="f6">
                    {intl.formatMessage({
                      id: 'admin/messages.step1.productDescription',
                    })}
                  </span>
                </p>
              </div>
            </Box>
          </div>
          <p className="mv7">
            {intl.formatMessage({
              id: 'admin/messages.step1.instruction5',
            })}
          </p>
          <div className="flex items-center">
            <div className="c-muted-1 f6">
              {intl.formatMessage(
                {
                  id: 'admin/messages.stepCounter',
                },
                {
                  current: 1,
                  total: 2,
                }
              )}
            </div>
            <div className="flex-grow-1 tr">
              <Button>
                {intl.formatMessage({
                  id: 'admin/messages.next',
                })}
              </Button>
            </div>
          </div>
        </PageBlock>
      </Layout>
    </div>
  )
}

export default injectIntl(AdminMessages)
