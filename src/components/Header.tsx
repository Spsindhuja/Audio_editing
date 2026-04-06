import React from 'react';
import { Shield, Bell, User, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Pine Labs</h1>
              <p className="text-xs text-gray-500">API Integration Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search APIs, docs, examples..."
              className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Developer</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}