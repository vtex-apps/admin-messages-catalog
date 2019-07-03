/* Typings for `vtex.styleguide` */

declare module 'vtex.styleguide' {
  interface ShowToastOptions {
    action?: {
      label: string
      onClick: () => void
    }
    message: string
    duration?: number
    horizontalPosition?: 'right' | 'left'
  }

  export type ShowToastFunction = (a: ShowToastOptions | string) => void

  export const Box: any
  export const Button: any
  export const Dropdown: any
  export const IconClose: any
  export const Layout: any
  export const PageBlock: any
  export const PageHeader: any
  export const ProgressBar: any
  export const ToastProvider: any 
  export const withToast: any
}
