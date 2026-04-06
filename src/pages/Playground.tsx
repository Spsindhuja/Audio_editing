import React, { useState } from 'react';
import { Play, Copy, Download, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';
import { ResponseViewer } from '../components/ResponseViewer';

export function Playground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('payments');
  const [requestPayload, setRequestPayload] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    { id: 'payments', name: 'Create Payment', method: 'POST', path: '/v1/payments' },
    { id: 'refunds', name: 'Process Refund', method: 'POST', path: '/v1/refunds' },
    { id: 'transactions', name: 'Get Transaction', method: 'GET', path: '/v1/transactions/{id}' },
    { id: 'status', name: 'Payment Status', method: 'GET', path: '/v1/payments/{id}/status' },
  ];

  const samplePayloads = {
    payments: `{
  "amount": 1000,
  "currency": "INR",
  "merchant_id": "MERCHANT_001",
  "order_id": "ORDER_123456",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210"
  },
  "billing_address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postal_code": "400001",
    "country": "IN"
  },
  "return_url": "https://merchant.com/success",
  "cancel_url": "https://merchant.com/cancel",
  "webhook_url": "https://merchant.com/webhook"
}`,
    refunds: `{
  "transaction_id": "TXN_123456789",
  "amount": 500,
  "reason": "Customer request",
  "notes": "Partial refund for damaged item"
}`,
    transactions: `{
  "transaction_id": "TXN_123456789"
}`,
    status: `{
  "payment_id": "PAY_123456789"
}`
  };

  const handleEndpointChange = (endpointId: string) => {
    setSelectedEndpoint(endpointId);
    setRequestPayload(samplePayloads[endpointId] || '');
    setResponse(null);
  };

  const handleExecuteRequest = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        data: {
          id: "PAY_" + Math.random().toString(36).substr(2, 9),
          status: "success",
          amount: 1000,
          currency: "INR",
          created_at: new Date().toISOString(),
          message: "Payment processed successfully"
        },
        headers: {
          "content-type": "application/json",
          "x-request-id": "req_" + Math.random().toString(36).substr(2, 9)
        }
      };
      setResponse(mockResponse);
      setIsLoading(false);
    }, 1500);
  };

  const currentEndpoint = endpoints.find(e => e.id === selectedEndpoint);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Playground</h1>
          <p className="text-gray-600">Test Pine Labs APIs with live credentials in real-time</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Request Configuration</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Live Environment</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
                <select
                  value={selectedEndpoint}
                  onChange={(e) => handleEndpointChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {endpoints.map((endpoint) => (
                    <option key={endpoint.id} value={endpoint.id}>
                      {endpoint.method} {endpoint.path} - {endpoint.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  currentEndpoint?.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {currentEndpoint?.method}
                </span>
                <span className="font-mono text-sm text-gray-700">
                  https://api.pinelabs.com{currentEndpoint?.path}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Request Payload</label>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </button>
                </div>
                <CodeEditor
                  value={requestPayload}
                  onChange={setRequestPayload}
                  language="json"
                />
              </div>

              <button
                onClick={handleExecuteRequest}
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Execute Request
                  </>
                )}
              </button>
            </div>
          </div>

          {response && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Response</h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600">200 OK</span>
                </div>
              </div>
              <ResponseViewer response={response} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Environment</span>
                <span className="text-sm font-medium text-green-600">Sandbox</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">API Key</span>
                <span className="text-sm font-mono text-gray-900">sk-test-***</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Version</span>
                <span className="text-sm font-medium text-gray-900">v1</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">Generate Test Data</div>
                <div className="text-xs text-gray-500 mt-1">Create sample customer and order data</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">View Error Codes</div>
                <div className="text-xs text-gray-500 mt-1">Reference common error scenarios</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium text-gray-900">Test Webhooks</div>
                <div className="text-xs text-gray-500 mt-1">Simulate webhook delivery</div>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
            <div className="flex items-center mb-3">
              <AlertCircle className="w-5 h-5 text-indigo-600 mr-2" />
              <h4 className="font-semibold text-indigo-900">Pro Tip</h4>
            </div>
            <p className="text-sm text-indigo-700">
              Use the playground to test your integration before going live. All requests use sandbox credentials and won't affect real transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}