import ReactDOM from 'react-dom/client'
import { AccountsReceivable } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'
import React from 'react'

const AccountsReceivableWebComponent = r2wc(AccountsReceivable, React, ReactDOM, {
  props: {
    token: 'string',
    apiUrl: 'string',
    merchantId: 'string',
  },
})

customElements.define('payment-request-dashboard', AccountsReceivableWebComponent)
