import React from 'react'
import ReactDOM from 'react-dom/client'
import { Dashboard } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'

const WebPaymentRequestDashboard = r2wc(Dashboard, React, ReactDOM, {
  props: {
    token: 'string',
    apiUrl: 'string',
    merchantId: 'string',
  },
})

customElements.define('payment-request-dashboard', WebPaymentRequestDashboard)
