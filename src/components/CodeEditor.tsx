import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: number;
}

export function CodeEditor({ value, onChange, language, height = 300 }: CodeEditorProps) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        style={{ height: `${height}px` }}
        spellCheck={false}
        placeholder={`Enter ${language.toUpperCase()} here...`}
      />
      <div className="absolute top-2 right-2 px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
        {language.toUpperCase()}
      </div>
    </div>
  );
}