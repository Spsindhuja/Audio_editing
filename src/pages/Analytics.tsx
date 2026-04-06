import React from 'react';
import { TrendingUp, Users, CreditCard, AlertTriangle } from 'lucide-react';

export function Analytics() {
  const metrics = [
    { name: 'Total Transactions', value: '12,847', change: '+15.3%', icon: CreditCard, trend: 'up' },
    { name: 'Success Rate', value: '98.2%', change: '+0.8%', icon: TrendingUp, trend: 'up' },
    { name: 'Active Merchants', value: '1,234', change: '+12.1%', icon: Users, trend: 'up' },
    { name: 'Failed Transactions', value: '231', change: '-5.2%', icon: AlertTriangle, trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor integration performance and success metrics</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <metric.icon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Merchant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TXN_001', merchant: 'Store ABC', amount: '₹1,250', status: 'Success', time: '2 min ago' },
                { id: 'TXN_002', merchant: 'Shop XYZ', amount: '₹750', status: 'Success', time: '5 min ago' },
                { id: 'TXN_003', merchant: 'Store DEF', amount: '₹2,100', status: 'Failed', time: '8 min ago' },
                { id: 'TXN_004', merchant: 'Shop GHI', amount: '₹890', status: 'Success', time: '12 min ago' },
              ].map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                  <td className="py-3 px-4">{transaction.merchant}</td>
                  <td className="py-3 px-4 font-medium">{transaction.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      transaction.status === 'Success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{transaction.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}