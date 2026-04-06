import React, { useState } from 'react';
import { Download, Copy, Code, Zap } from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';

export function CodeGenerator() {
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedEndpoint, setSelectedEndpoint] = useState('payments');

  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'php', name: 'PHP', icon: '🐘' },
    { id: 'curl', name: 'cURL', icon: '📡' },
    { id: 'postman', name: 'Postman', icon: '📮' }
  ];

  const endpoints = [
    { id: 'payments', name: 'Create Payment', method: 'POST' },
    { id: 'refunds', name: 'Process Refund', method: 'POST' },
    { id: 'transactions', name: 'Get Transaction', method: 'GET' },
    { id: 'webhook', name: 'Handle Webhook', method: 'POST' }
  ];

  const codeTemplates = {
    react: {
      payments: `import React, { useState } from 'react';

function PaymentForm() {
  const [payment, setPayment] = useState({
    amount: '',
    currency: 'INR',
    orderId: '',
    customerEmail: ''
  });
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.pinelabs.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-proj-YOUR_API_KEY',
          'X-Merchant-Id': 'MERCHANT_001'
        },
        body: JSON.stringify({
          amount: parseInt(payment.amount) * 100, // Convert to paise
          currency: payment.currency,
          order_id: payment.orderId,
          customer: {
            email: payment.customerEmail
          },
          return_url: window.location.origin + '/success',
          cancel_url: window.location.origin + '/cancel'
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        // Redirect to payment URL
        window.location.href = result.payment_url;
      } else {
        console.error('Payment creation failed:', result.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Pine Labs Payment</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Amount (₹)</label>
        <input
          type="number"
          value={payment.amount}
          onChange={(e) => setPayment({...payment, amount: e.target.value})}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Order ID</label>
        <input
          type="text"
          value={payment.orderId}
          onChange={(e) => setPayment({...payment, orderId: e.target.value})}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Customer Email</label>
        <input
          type="email"
          value={payment.customerEmail}
          onChange={(e) => setPayment({...payment, customerEmail: e.target.value})}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default PaymentForm;`
    },
    nodejs: {
      payments: `const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Pine Labs API configuration
const PINE_LABS_API_URL = 'https://api.pinelabs.com/v1';
const API_KEY = 'sk-proj-YOUR_API_KEY';
const MERCHANT_ID = 'MERCHANT_001';

// Create payment endpoint
app.post('/create-payment', async (req, res) => {
  try {
    const { amount, currency, orderId, customer } = req.body;

    const paymentData = {
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      order_id: orderId,
      merchant_id: MERCHANT_ID,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      },
      return_url: \`\${req.protocol}://\${req.get('host')}/payment-success\`,
      cancel_url: \`\${req.protocol}://\${req.get('host')}/payment-cancel\`,
      webhook_url: \`\${req.protocol}://\${req.get('host')}/webhook\`
    };

    const response = await axios.post(
      \`\${PINE_LABS_API_URL}/payments\`,
      paymentData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${API_KEY}\`,
          'X-Merchant-Id': MERCHANT_ID
        }
      }
    );

    res.json({
      success: true,
      payment_id: response.data.id,
      payment_url: response.data.payment_url,
      status: response.data.status
    });

  } catch (error) {
    console.error('Payment creation error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Payment creation failed'
    });
  }
});

// Webhook handler
app.post('/webhook', (req, res) => {
  const { event_type, payment_id, status, amount } = req.body;
  
  console.log('Webhook received:', {
    event_type,
    payment_id,
    status,
    amount
  });

  // Process the webhook based on event type
  switch (event_type) {
    case 'payment.success':
      // Handle successful payment
      console.log(\`Payment \${payment_id} completed successfully\`);
      break;
      
    case 'payment.failed':
      // Handle failed payment
      console.log(\`Payment \${payment_id} failed\`);
      break;
      
    default:
      console.log(\`Unknown event type: \${event_type}\`);
  }

  // Always respond with 200 to acknowledge receipt
  res.status(200).json({ received: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
    },
    python: {
      payments: `import requests
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# Pine Labs API configuration
PINE_LABS_API_URL = 'https://api.pinelabs.com/v1'
API_KEY = 'sk-proj-YOUR_API_KEY'
MERCHANT_ID = 'MERCHANT_001'

class PineLabsClient:
    def __init__(self, api_key, merchant_id):
        self.api_key = api_key
        self.merchant_id = merchant_id
        self.base_url = PINE_LABS_API_URL
        
    def _make_request(self, method, endpoint, data=None):
        """Make authenticated request to Pine Labs API"""
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.api_key}',
            'X-Merchant-Id': self.merchant_id
        }
        
        url = f"{self.base_url}/{endpoint}"
        
        try:
            if method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'GET':
                response = requests.get(url, headers=headers)
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            return None
    
    def create_payment(self, amount, currency, order_id, customer):
        """Create a new payment"""
        payment_data = {
            'amount': amount * 100,  # Convert to paise
            'currency': currency,
            'order_id': order_id,
            'merchant_id': self.merchant_id,
            'customer': customer,
            'return_url': 'https://yoursite.com/success',
            'cancel_url': 'https://yoursite.com/cancel',
            'webhook_url': 'https://yoursite.com/webhook'
        }
        
        return self._make_request('POST', 'payments', payment_data)
    
    def get_payment_status(self, payment_id):
        """Get payment status"""
        return self._make_request('GET', f'payments/{payment_id}/status')

# Initialize Pine Labs client
pine_labs = PineLabsClient(API_KEY, MERCHANT_ID)

@app.route('/create-payment', methods=['POST'])
def create_payment():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['amount', 'order_id', 'customer']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create payment
        result = pine_labs.create_payment(
            amount=data['amount'],
            currency=data.get('currency', 'INR'),
            order_id=data['order_id'],
            customer=data['customer']
        )
        
        if result:
            return jsonify({
                'success': True,
                'payment_id': result.get('id'),
                'payment_url': result.get('payment_url'),
                'status': result.get('status')
            })
        else:
            return jsonify({'error': 'Payment creation failed'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    """Handle Pine Labs webhook"""
    try:
        data = request.get_json()
        
        event_type = data.get('event_type')
        payment_id = data.get('payment_id')
        status = data.get('status')
        
        print(f"Webhook received: {event_type} for payment {payment_id}")
        
        # Process webhook based on event type
        if event_type == 'payment.success':
            # Handle successful payment
            print(f"Payment {payment_id} completed successfully")
        elif event_type == 'payment.failed':
            # Handle failed payment
            print(f"Payment {payment_id} failed")
        
        return jsonify({'received': True}), 200
        
    except Exception as e:
        print(f"Webhook processing error: {e}")
        return jsonify({'error': 'Webhook processing failed'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)`
    },
    curl: {
      payments: `# Create Payment with Pine Labs API

curl -X POST https://api.pinelabs.com/v1/payments \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-proj-YOUR_API_KEY" \\
  -H "X-Merchant-Id: MERCHANT_001" \\
  -d '{
    "amount": 100000,
    "currency": "INR",
    "order_id": "ORDER_123456",
    "merchant_id": "MERCHANT_001",
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
  }'

# Expected Response:
# {
#   "id": "PAY_123456789",
#   "status": "created",
#   "payment_url": "https://checkout.pinelabs.com/pay/PAY_123456789",
#   "amount": 100000,
#   "currency": "INR",
#   "order_id": "ORDER_123456",
#   "created_at": "2025-01-12T10:30:00Z"
# }

# Get Payment Status
curl -X GET https://api.pinelabs.com/v1/payments/PAY_123456789/status \\
  -H "Authorization: Bearer sk-proj-YOUR_API_KEY" \\
  -H "X-Merchant-Id: MERCHANT_001"

# Process Refund
curl -X POST https://api.pinelabs.com/v1/refunds \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-proj-YOUR_API_KEY" \\
  -H "X-Merchant-Id: MERCHANT_001" \\
  -d '{
    "payment_id": "PAY_123456789",
    "amount": 50000,
    "reason": "Customer request",
    "notes": "Partial refund for damaged item"
  }'`
    }
  };

  const getCurrentCode = () => {
    return codeTemplates[selectedFramework]?.[selectedEndpoint] || '// Code template not available';
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCurrentCode());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Code Generator</h1>
          <p className="text-gray-600">Generate integration code for your preferred framework</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={copyCode}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Code
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework</h3>
            <div className="space-y-2">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => setSelectedFramework(framework.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedFramework === framework.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{framework.icon}</span>
                    <span className="font-medium">{framework.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Endpoint</h3>
            <div className="space-y-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedEndpoint === endpoint.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{endpoint.name}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Code className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {frameworks.find(f => f.id === selectedFramework)?.name} - {endpoints.find(e => e.id === selectedEndpoint)?.name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Production Ready</span>
              </div>
            </div>

            <CodeEditor
              value={getCurrentCode()}
              onChange={() => {}}
              language={selectedFramework === 'curl' ? 'bash' : selectedFramework}
              height={600}
            />

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Important Notes</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Replace <code className="bg-blue-100 px-1 rounded">YOUR_API_KEY</code> with your actual Pine Labs API key</li>
                    <li>• Update <code className="bg-blue-100 px-1 rounded">MERCHANT_001</code> with your merchant ID</li>
                    <li>• Configure your webhook endpoint to handle payment notifications</li>
                    <li>• Test in sandbox environment before going live</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}