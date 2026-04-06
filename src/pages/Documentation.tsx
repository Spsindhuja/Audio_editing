import React, { useState } from 'react';
import { Search, Book, ExternalLink, Code, Zap } from 'lucide-react';

export function Documentation() {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Quick Start Guide', description: 'Get up and running in 5 minutes' },
        { name: 'Authentication', description: 'API key setup and security' },
        { name: 'Error Handling', description: 'Common errors and solutions' },
      ]
    },
    {
      title: 'Payment APIs',
      items: [
        { name: 'Create Payment', description: 'Initialize payment transactions' },
        { name: 'Payment Status', description: 'Check payment status and details' },
        { name: 'Refunds', description: 'Process full and partial refunds' },
      ]
    },
    {
      title: 'Webhooks',
      items: [
        { name: 'Webhook Setup', description: 'Configure webhook endpoints' },
        { name: 'Event Types', description: 'Available webhook events' },
        { name: 'Security', description: 'Webhook signature verification' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600">Comprehensive guides and API reference</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Full Docs
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <Code className="w-4 h-4 mr-2" />
            API Reference
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'React Integration', description: 'Complete React payment form', lang: 'React' },
                { name: 'Node.js Backend', description: 'Express server with webhooks', lang: 'Node.js' },
                { name: 'Python Flask', description: 'Flask app with payment processing', lang: 'Python' },
                { name: 'cURL Examples', description: 'Direct API calls', lang: 'Bash' },
              ].map((example, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{example.name}</h4>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {example.lang}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            </div>
            <div className="space-y-3">
              <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">API Playground</div>
                <div className="text-sm text-gray-600">Test APIs interactively</div>
              </a>
              <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Error Codes</div>
                <div className="text-sm text-gray-600">Complete error reference</div>
              </a>
              <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">SDKs</div>
                <div className="text-sm text-gray-600">Official client libraries</div>
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Book className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Postman Collection</span>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm">Download</button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">OpenAPI Spec</span>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm">View</button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Changelog</span>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm">View</button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">?</span>
              </div>
              <h4 className="font-semibold text-green-900">Need Help?</h4>
            </div>
            <p className="text-sm text-green-800 mb-3">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}