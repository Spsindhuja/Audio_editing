import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, Code, Zap, Shield } from 'lucide-react';

export function IntegrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: 'Setup Credentials',
      description: 'Configure your API keys and merchant settings',
      icon: Shield
    },
    {
      id: 2,
      title: 'Choose Integration',
      description: 'Select your preferred integration method',
      icon: Code
    },
    {
      id: 3,
      title: 'Configure Webhooks',
      description: 'Set up webhook endpoints for notifications',
      icon: Zap
    },
    {
      id: 4,
      title: 'Test Integration',
      description: 'Verify your integration with test transactions',
      icon: CheckCircle
    }
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => currentStep === stepId;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integration Wizard</h1>
          <p className="text-gray-600">Step-by-step guide to integrate Pine Labs APIs</p>
        </div>
        <div className="text-sm text-gray-500">
          Step {currentStep} of {steps.length}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                isStepCompleted(step.id)
                  ? 'bg-green-500 border-green-500 text-white'
                  : isStepCurrent(step.id)
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {isStepCompleted(step.id) ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  isStepCurrent(step.id) || isStepCompleted(step.id)
                    ? 'text-gray-900'
                    : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-0.5 mx-4 ${
                isStepCompleted(step.id) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Setup Your Credentials</h3>
              <p className="text-gray-600">Enter your Pine Labs API credentials to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input
                  type="password"
                  placeholder="sk-proj-..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Merchant ID</label>
                <input
                  type="text"
                  placeholder="MERCHANT_001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Security Notice</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Your credentials are encrypted and stored securely. Never share your API keys publicly.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStepComplete(1)}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Integration Method</h3>
              <p className="text-gray-600">Select how you want to integrate Pine Labs payments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'JavaScript SDK',
                  description: 'Easy client-side integration',
                  icon: '⚛️',
                  features: ['Drop-in UI', 'Quick setup', 'Mobile friendly']
                },
                {
                  title: 'REST API',
                  description: 'Full control server-side',
                  icon: '🔧',
                  features: ['Complete control', 'Custom UI', 'Backend integration']
                },
                {
                  title: 'Webhook Only',
                  description: 'Event-driven integration',
                  icon: '⚡',
                  features: ['Real-time notifications', 'Event processing', 'Minimal setup']
                }
              ].map((method, index) => (
                <div key={index} className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{method.icon}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h4>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {method.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleStepComplete(2)}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Configure Webhooks</h3>
              <p className="text-gray-600">Set up endpoints to receive payment notifications</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="url"
                  placeholder="https://yoursite.com/webhook"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Events to Subscribe</label>
                <div className="space-y-2">
                  {[
                    'payment.success',
                    'payment.failed',
                    'payment.pending',
                    'refund.processed'
                  ].map((event) => (
                    <label key={event} className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Webhook Security</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    Webhooks are signed with your secret key. Always verify signatures to ensure authenticity.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStepComplete(3)}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Test Your Integration</h3>
              <p className="text-gray-600">Run test transactions to verify everything works correctly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">Test Payment</h4>
                </div>
                <p className="text-sm text-green-800 mb-4">Create a test payment to verify API integration</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Run Test
                </button>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <Zap className="w-6 h-6 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Test Webhook</h4>
                </div>
                <p className="text-sm text-blue-800 mb-4">Verify webhook endpoint receives notifications</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Test Webhook
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold mb-2">🎉 Integration Complete!</h4>
                  <p className="text-green-100">
                    Your Pine Labs integration is ready. You can now process live payments.
                  </p>
                </div>
                <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Go Live
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}