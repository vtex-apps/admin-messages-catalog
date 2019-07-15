
/* Typings for `vtex.styleguide` */
declare module 'vtex.styleguide' {
  import { ComponentClass, ComponentType } from 'react'

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

  export interface ToastProps {
    showToast: ShowToastFunction
    hideToast: () => void
    toastState: unknown
  }

  export function withToast<P>(
    component: ComponentType<P & ToastProps>
  ): ComponentClass<Pick<P, Exclude<keyof P, keyof ToastProps>>>

  export const Alert: any
  export const Box: any
  export const Button: any
  export const Dropdown: any
  export const IconClose: any
  export const Layout: any
  export const PageBlock: any
  export const PageHeader: any
  export const ProgressBar: any
  export const ToastProvider: any 
}
