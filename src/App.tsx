import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import CreateInvoice from './pages/CreateInvoice'
import InvoiceList from './pages/InvoiceList'
import { InvoiceProvider } from './context/InvoiceContext'
import { Invoice } from './types/invoice'

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateInvoice />} />
              <Route path="/invoices" element={<InvoiceList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </InvoiceProvider>
  )
}

export default App 