import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Playground } from './pages/Playground';
import { CodeGenerator } from './pages/CodeGenerator';
import { Documentation } from './pages/Documentation';
import { Analytics } from './pages/Analytics';
import { IntegrationWizard } from './pages/IntegrationWizard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/generator" element={<CodeGenerator />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/wizard" element={<IntegrationWizard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;