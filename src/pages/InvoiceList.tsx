import { useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { Invoice } from '../types/invoice';
import { Eye, Edit, Trash2, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const InvoiceList = () => {
  const { state, deleteInvoice } = useInvoice();
  const { invoices } = state;
  
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter((invoice: Invoice) => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-0 slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bounce-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Invoices</h1>
        <Link
          to="/create"
          className="btn-primary flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>Create Invoice</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4 sm:p-6" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by invoice number or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="card overflow-hidden" style={{ animationDelay: '0.2s' }}>
        {filteredInvoices.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <p className="text-gray-500 text-lg">No invoices found</p>
            <Link to="/create" className="btn-primary mt-4 inline-flex items-center space-x-2">
              <Plus size={16} />
              <span>Create your first invoice</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice: Invoice, index: number) => (
                  <tr 
                    key={invoice.id} 
                    className="table-row"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.clientName}</div>
                      <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(invoice.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${invoice.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 transition-colors duration-200 hover:scale-110"
                          title="View Invoice"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 p-1 transition-colors duration-200 hover:scale-110"
                          title="Edit Invoice"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-900 p-1 transition-colors duration-200 hover:scale-110"
                          title="Download PDF"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="text-red-600 hover:text-red-900 p-1 transition-colors duration-200 hover:scale-110"
                          title="Delete Invoice"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="sm:hidden">
              {filteredInvoices.map((invoice: Invoice, index: number) => (
                <div
                  key={invoice.id}
                  className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{invoice.invoiceNumber}</h3>
                      <p className="text-sm text-gray-600">{invoice.clientName}</p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm text-gray-900">{format(new Date(invoice.date), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="text-sm text-gray-900">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-lg font-bold text-gray-900">${invoice.total.toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-2 transition-colors duration-200"
                        title="View Invoice"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-2 transition-colors duration-200"
                        title="Edit Invoice"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-900 p-2 transition-colors duration-200"
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="text-red-600 hover:text-red-900 p-2 transition-colors duration-200"
                        title="Delete Invoice"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredInvoices.length > 0 && (
        <div className="card p-4 sm:p-6" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="stats-card">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
            </div>
            <div className="stats-card">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                ${filteredInvoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
              </p>
            </div>
            <div className="stats-card">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Paid Amount</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                ${filteredInvoices
                  .filter(inv => inv.status === 'paid')
                  .reduce((sum, inv) => sum + inv.total, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="stats-card">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                ${filteredInvoices
                  .filter(inv => inv.status !== 'paid')
                  .reduce((sum, inv) => sum + inv.total, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList; 