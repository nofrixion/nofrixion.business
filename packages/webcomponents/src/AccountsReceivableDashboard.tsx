import ReactDOM from 'react-dom/client'
import { AccountsReceivable } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'

const DashBoard = r2wc(AccountsReceivable, React, ReactDOM, {
  props: {
    token: 'string',
    apiUrl: 'string',
    merchantId: 'string',
  },
})

customElements.define('payment-request-dashboard', DashBoard)
