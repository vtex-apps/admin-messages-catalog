import { AuthenticationError } from '@vtex/api'

const E_AUTH = 'VtexIdclientAutCookie not found'

async function exportProductCatalog(
  _: unknown,
  __: unknown,
  ctx: Context
): Promise<boolean> {
  const {
    cookies,
    clients: { admin, licenseManager, segment },
  } = ctx
    const VtexIdclientAutCookie = cookies.get('VtexIdclientAutCookie')
    if (!VtexIdclientAutCookie) {
      throw new AuthenticationError(E_AUTH)
    }

    const [profileData, segmentData] = await Promise.all([
      licenseManager.getTopbarData(VtexIdclientAutCookie),
      segment.getSegment(),
    ])

    const email = profileData && profileData.profile && profileData.profile.email
    const locale = segmentData.cultureInfo

    admin.exportCatalogToEmail(email, locale)

    return true
}

export default exportProductCatalog


