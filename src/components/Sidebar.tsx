import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Code2, 
  FileText, 
  Play, 
  Zap, 
  Home,
  Wand2
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Integration Wizard', href: '/wizard', icon: Wand2 },
  { name: 'API Playground', href: '/playground', icon: Play },
  { name: 'Code Generator', href: '/generator', icon: Code2 },
  { name: 'Documentation', href: '/docs', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 mt-16">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-700' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-8 left-4 right-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Live Environment</span>
          </div>
          <p className="text-xs text-indigo-100 mt-1">Connected to Pine Labs Sandbox</p>
        </div>
      </div>
    </div>
  );
}