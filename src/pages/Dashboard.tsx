import { useInvoice } from '../context/InvoiceContext';
import { Link } from 'react-router-dom';
import { Plus, FileText, DollarSign, Clock } from 'lucide-react';

const Dashboard = () => {
  const { state } = useInvoice();
  const { invoices } = state;

  const stats = {
    total: invoices.length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    pending: invoices.filter(inv => inv.status === 'sent').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
  };

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  const recentInvoices = invoices
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 px-4 sm:px-0 slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bounce-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/create"
          className="btn-primary flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>Create Invoice</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="stats-card" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="stats-card" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Paid Invoices</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.paid}</p>
            </div>
          </div>
        </div>

        <div className="stats-card" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="stats-card" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue and Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Revenue Card */}
        <div className="card p-4 sm:p-6" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Revenue</h3>
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 ml-2">
              ${totalRevenue.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">From paid invoices</p>
        </div>

        {/* Recent Invoices */}
        <div className="card p-4 sm:p-6" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {recentInvoices.length === 0 ? (
              <p className="text-gray-500 text-sm">No invoices yet</p>
            ) : (
              recentInvoices.map((invoice, index) => (
                <div
                  key={invoice.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 gap-2"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{invoice.invoiceNumber}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{invoice.clientName}</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">${invoice.total.toFixed(2)}</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'sent'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 