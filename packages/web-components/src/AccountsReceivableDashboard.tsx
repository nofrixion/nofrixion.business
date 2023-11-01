import ReactDOM from 'react-dom/client'
import { AccountsReceivable } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'
import React from 'react'
import { PaymentRequestDashboardProps } from '@nofrixion/components/src/components/functional/PaymentRequestDashboard/PaymentRequestDashboard'

const AccountsReceivableWrapperForWebComponent: React.FC<PaymentRequestDashboardProps> = (
  props,
) => {
  return <AccountsReceivable {...props} isWebComponent={true} />
}

const AccountsReceivableWebComponent = r2wc(
  AccountsReceivableWrapperForWebComponent,
  React,
  ReactDOM,
  {
    props: {
      token: 'string',
      apiUrl: 'string',
      merchantId: 'string',
    },
  },
)

customElements.define('payment-request-dashboard', AccountsReceivableWebComponent)
