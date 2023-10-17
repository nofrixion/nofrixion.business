import { Currency } from '@nofrixion/moneymoov'
import { useState } from 'react'

import { cn } from '../../../utils'

const CurrencyTab: React.FC<{ currency: Currency; isActive: boolean; onClick: () => void }> = ({
  currency,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn('flex px-1 pb-1 items-center justify-center text-grey-text text-sm leading-6', {
        'text-default-text border-b border-solid border-[#40BFBF]': isActive,
      })}
    >
      {currency === Currency.EUR ? 'Euros' : 'Pounds'}
    </button>
  )
}

export const CurrencyFilter: React.FC<{
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
}> = ({ currency, onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency)
  return (
    <div className="flex items-center space-x-2">
      <CurrencyTab
        onClick={() => {
          setSelectedCurrency(Currency.EUR)
          onCurrencyChange(Currency.EUR)
        }}
        currency={Currency.EUR}
        isActive={selectedCurrency === Currency.EUR}
      />
      <CurrencyTab
        onClick={() => {
          setSelectedCurrency(Currency.GBP)
          onCurrencyChange(Currency.GBP)
        }}
        currency={Currency.GBP}
        isActive={selectedCurrency === Currency.GBP}
      />
    </div>
  )
}
