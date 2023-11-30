import { Dialog, Transition } from '@headlessui/react'
import { parse, ParseResult } from 'papaparse'
import { Fragment, useEffect, useState } from 'react'

import { InvoicePayment } from '../../../../types/LocalTypes'
import { validateInvoices, ValidationResult } from '../../../../utils/validation'
import FileInput from '../../atoms/FileInput/FileInput'
import BackArrow from '../../utils/BackArrow'

export interface ImportInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
}

const ImportInvoiceModal = ({ isOpen, onClose }: ImportInvoiceModalProps) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null)

  useEffect(() => {
    console.log(validationResults?.filter((result) => !result.valid))
  }, [validationResults])

  const handleFileAdded = (file: File) => {
    if (file && file.type != 'text/csv') {
      console.log('File is not a csv') // TODO: Handle this error
      return
    }

    if (file) {
      const reader = new FileReader()

      reader.readAsText(file)

      reader.onload = async () => {
        parse(reader.result as string, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<InvoicePayment>) => {
            // TODO: Validate headers
            const validationResults = validateInvoices(results.data as InvoicePayment[])

            setValidationResults(validationResults)
          },
          error: (err: any) => {
            // TODO: Handle parsing errors
            console.log(err)
          },
        })
      }
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative font-inter text-default-text z-50" onClose={() => {}}>
          <Dialog.Panel className="w-full transform bg-white text-left align-middle transition-all min-h-screen px-6 lg:px-0 lg:flex">
            <div className="mt-[86px]">
              <BackArrow
                intent="close"
                onClick={() => {
                  onClose()
                }}
              />
            </div>

            <div className="flex flex-col w-full mt-20">
              <Dialog.Title
                as="h3"
                className="text-2xl md:text-[1.75rem]/8 font-semibold inline-block text-clip md:whitespace-nowrap -mr-6 ml-8 h-fit"
              >
                Import invoices
              </Dialog.Title>

              <div className="ml-8 pr-32 pt-12">
                <FileInput onFileAdded={handleFileAdded} />
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  )
}

export default ImportInvoiceModal
