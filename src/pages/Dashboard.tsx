import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle, Clock, Code, Zap } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { name: 'Total Integrations', value: '24', change: '+12%', icon: Code, color: 'text-blue-600' },
    { name: 'Success Rate', value: '98.5%', change: '+0.5%', icon: CheckCircle, color: 'text-green-600' },
    { name: 'Avg Response Time', value: '124ms', change: '-15ms', icon: Clock, color: 'text-purple-600' },
    { name: 'API Calls Today', value: '1,247', change: '+23%', icon: TrendingUp, color: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integration Dashboard</h1>
          <p className="text-gray-600">Monitor your Pine Labs API integrations in real-time</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          Quick Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Integrations</h3>
          <div className="space-y-4">
            {[
              { name: 'Payment Gateway', status: 'Success', time: '2 hours ago', method: 'POST /v1/payments' },
              { name: 'Refund API', status: 'Success', time: '4 hours ago', method: 'POST /v1/refunds' },
              { name: 'Transaction Status', status: 'Success', time: '6 hours ago', method: 'GET /v1/transactions' },
              { name: 'Merchant Onboarding', status: 'Pending', time: '8 hours ago', method: 'POST /v1/merchants' },
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`w-5 h-5 ${integration.status === 'Success' ? 'text-green-500' : 'text-yellow-500'}`} />
                  <div>
                    <p className="font-medium text-gray-900">{integration.name}</p>
                    <p className="text-sm text-gray-500">{integration.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${integration.status === 'Success' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {integration.status}
                  </p>
                  <p className="text-xs text-gray-500">{integration.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Gateway</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment Processing</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Webhook Delivery</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-yellow-600">Degraded</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Ready to integrate?</h3>
            <p className="text-indigo-100 mt-1">Start with our step-by-step integration wizard</p>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Start Wizard
          </button>
        </div>
      </div>
    </div>
  );
}