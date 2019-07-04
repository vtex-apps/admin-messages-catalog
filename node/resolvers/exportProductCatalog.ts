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

    const profileData = await licenseManager.getTopbarData(VtexIdclientAutCookie)
    const email = profileData && profileData.profile && profileData.profile.email

    // Cannot await this promise because it can take several minutes to get resolved.
    // In practice the connection will timeout before it...
    admin.exportCatalogToEmail(email)

    return true
}

export default exportProductCatalog


