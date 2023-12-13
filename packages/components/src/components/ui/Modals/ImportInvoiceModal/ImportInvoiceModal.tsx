import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { parse, ParseResult } from 'papaparse'
import { Fragment, useEffect, useState } from 'react'

import { LocalInvoice, ValidationResult } from '../../../../types/LocalTypes'
import { validateInvoices } from '../../../../utils/validation'
import { Button, Icon } from '../../atoms'
import FileInput from '../../atoms/FileInput/FileInput'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../atoms/Tabs/Tabs'
import ImportInvoiceTable from '../../organisms/ImportInvoiceTable/ImportInvoiceTable'
import BackArrow from '../../utils/BackArrow'

export interface ImportInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
}

const ImportInvoiceModal = ({ isOpen, onClose }: ImportInvoiceModalProps) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null)
  const [json, setJson] = useState<any>(null)
  const [invoices, setInvoices] = useState<LocalInvoice[] | undefined>()
  const [isError, setIsError] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'upload' | 'review'>('upload')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])

  useEffect(() => {
    if (!validationResults) {
      return
    }

    // Temporary for displaying validation results
    setJson(JSON.stringify(validationResults, null, 2))
    console.log('-------------------------------')
    console.log('Valid results')
    console.log('-------------------------------')
    console.log(JSON.stringify(validationResults?.filter((result) => result.valid)))

    console.log('-------------------------------')
    console.log('Invalid results')
    console.log('-------------------------------')
    console.error(validationResults?.filter((result) => !result.valid))

    setIsLoading(false)
    setSelectedTab('review')
  }, [validationResults])

  const handleFileAdded = (file: File) => {
    if (file && file.type != 'text/csv') {
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (file) {
      setIsLoading(true)

      const reader = new FileReader()

      reader.readAsText(file)

      reader.onload = async () => {
        parse(reader.result as string, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<LocalInvoice>) => {
            const validationResults = validateInvoices(results.data as LocalInvoice[])
            setValidationResults(validationResults)

            // If no errors in validation, then we can set the invoices
            if (validationResults.every((result) => result.valid)) {
              setSelectedInvoices(results.data.map((invoice) => invoice.InvoiceNumber))
              setInvoices(results.data as LocalInvoice[])
            }
          },
          error: (err: any) => {
            console.error('PARSE ERROR', err)
            setIsError(true)
          },
        })
      }
    }
  }

  const onImportInvoices = () => {
    console.log('Invoices to import', selectedInvoices)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative font-inter text-default-text z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full transform bg-white text-left align-middle transition-all min-h-screen lg:px-0 lg:flex fixed inset-0 overflow-y-auto z-50">
              <div className="flex min-h-full flex-row pt-[80px] w-full">
                <BackArrow
                  intent="close"
                  onClick={() => {
                    onClose()
                  }}
                />
                <div className="-mt-1 ml-[2.875rem] w-full pr-[7.625rem]">
                  <Dialog.Title
                    as="h3"
                    className="text-[28px]/8 font-semibold text-clip md:whitespace-nowrap flex-nowrap flex justify-between h-10"
                  >
                    Import invoices
                    <AnimatePresence>
                      {selectedInvoices?.length > 0 && selectedTab == 'review' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            size="large"
                            onClick={onImportInvoices}
                            className="w-10 h-10 md:w-full md:h-12"
                          >
                            <span className="hidden md:inline-block">
                              Import{' '}
                              {selectedInvoices.length == 1
                                ? 'invoice'
                                : `${selectedInvoices.length} invoices`}
                            </span>
                            <Icon name="add/16" className="md:hidden" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Dialog.Title>

                  <Tabs value={selectedTab} defaultValue="upload" className="w-full mt-14">
                    <TabsList>
                      <TabsTrigger
                        value="upload"
                        className="first:rounded-l-md last:rounded-r-md text-grey-text font-medium bg-main-grey transition-all focus-visible:outline-none disabled:pointer-events-none data-[state=active]:bg-information-bg  data-[state=active]:text-default-text"
                        onClick={() => setSelectedTab('upload')}
                      >
                        <div className="pr-4">1</div>
                        <div>Upload file</div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="review"
                        className="first:rounded-l-md last:rounded-r-md text-grey-text font-medium bg-main-grey transition-all focus-visible:outline-none disabled:pointer-events-none data-[state=active]:bg-information-bg  data-[state=active]:text-default-text"
                        onClick={() => setSelectedTab('review')}
                        disabled={true}
                      >
                        <div className="pr-4">2</div>
                        <div>Review and import</div>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="w-full">
                      <div className="pt-12 pr-10">
                        <FileInput
                          onFileAdded={handleFileAdded}
                          isError={isError}
                          setIsError={setIsError}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="review" className="mt-14">
                      {/* TODO: Validate length */}
                      {invoices && (
                        <ImportInvoiceTable
                          invoices={invoices}
                          selectedInvoices={selectedInvoices}
                          setSelectedInvoices={setSelectedInvoices}
                        />
                      )}
                      <div className="text-xs bg-black text-blue-300 max-h-screen overflow-y-auto">
                        {!invoices && json && <pre>{json}</pre>}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default ImportInvoiceModal
