import React from 'react';
import { Copy, Download } from 'lucide-react';

interface ResponseViewerProps {
  response: any;
}

export function ResponseViewer({ response }: ResponseViewerProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${
            response.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {response.status}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <pre className="text-sm text-gray-800 overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
      
      <div className="text-xs text-gray-500">
        Response time: 127ms • Size: 2.4KB
      </div>
    </div>
  );
}