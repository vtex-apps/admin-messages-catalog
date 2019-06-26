import React, {FC} from 'react'
import {Box, Button, Layout, PageBlock, PageHeader} from 'vtex.styleguide'

const AdminMessages: FC = () => {
  return (
    <div className="min-vh-100 bg-muted-5">
      <Layout pageHeader={<PageHeader title="Products translation" />}>
        <PageBlock>
          <div className="bb b--muted-4  nh7 ph7 pb7 mb7">
            <div className="flex">
              <div>
                <p className="mb1 mt0">
                  1. Export your product catalog to email
                </p>
                <p className="t-mini c-muted-2 mt1 pl5">nardi@vtex.com.br</p>
              </div>
              <div className="flex-grow-1 tr">
                <Button variation="secondary">Export Catalog</Button>
              </div>
            </div>
          </div>
          <p className="mv7">
            2. Depois de exportar, abra o seu e-mail e faça o download do
            arquivo em anexo
          </p>
          <p className="mv7">
            3. Abra o arquivo <b>catalog.csv</b> no Excel ou no Numbers
          </p>
          <div>
            <p className="mv7">
              4. Traduza, na planilha, o conteúdo das seguintes colunas:
            </p>
            <Box noPadding>
              <div className="c-muted-1 ph5 pv2">
                <p>
                  <span className="mr3 fw5">_ProductName (Required)</span>{' '}
                  <span className="f6">Nome</span>
                </p>
                <p>
                  <span className="mr3 fw5">_Keywords</span>{' '}
                  <span className="f6">Palavras substitutas</span>
                </p>
                <p>
                  <span className="mr3 fw5">_SiteTitle</span>{' '}
                  <span className="f6">Título da página</span>
                </p>
                <p>
                  <span className="mr3 fw5">_ProductDescription</span>{' '}
                  <span className="f6">Descrição do produto</span>
                </p>
                <p>
                  <span className="mr3 fw5">_MetaTagDescription</span>{' '}
                  <span className="f6">Descrição (Meta tag Description)</span>
                </p>
              </div>
            </Box>
          </div>
          <p className="mv7">
            5. Após traduzir, salve o arquivo e clique em <b>Next</b> para
            continuar
          </p>
          <div className="flex items-center">
            <div className="c-muted-1 f6">Step 1 of 2</div>
            <div className="flex-grow-1 tr">
              <Button>Next</Button>
            </div>
          </div>
        </PageBlock>
      </Layout>
    </div>
  )
}

export default AdminMessages
