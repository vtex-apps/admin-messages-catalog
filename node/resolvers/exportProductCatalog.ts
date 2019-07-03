import { AuthenticationError } from '@vtex/api'

const E_AUTH = 'VtexIdclientAutCookie not found'

async function exportProductCatalog(
  _: unknown,
  __: unknown,
  ctx: Context
): Promise<boolean> {
  const {
    cookies,
    clients: { admin, licenseManager },
  } = ctx
    const VtexIdclientAutCookie = cookies.get('VtexIdclientAutCookie')
    if (!VtexIdclientAutCookie) {
      throw new AuthenticationError(E_AUTH)
    }

    const data = await licenseManager.getTopbarData(VtexIdclientAutCookie)
    const email = data && data.profile && data.profile.email

    await admin.exportCatalogToEmail(email)

    return true
}

export default exportProductCatalog


