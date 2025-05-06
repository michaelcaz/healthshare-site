import React from 'react';
import CssImportChecker from '../components/CssImportChecker';

export default function CssDebugPage() {
  return (
    <>
      <CssImportChecker />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">CSS Debug Page</h1>
        
        <section className="mb-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-medium mb-2">Font Tests</h2>
          <p className="mb-2">This is regular text (should use Satoshi)</p>
          <p className="font-bold mb-2">This is bold text</p>
          <p className="font-medium mb-2">This is medium text</p>
          <p className="italic mb-2">This is italic text</p>
          <p className="text-sm mb-2">This is small text</p>
          <p className="text-lg mb-2">This is large text</p>
          <p className="text-xl mb-2">This is extra large text</p>
        </section>
        
        <section className="mb-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-medium mb-2">Layout Tests</h2>
          <div className="flex gap-4 mb-4">
            <div className="bg-blue-200 p-4 rounded-md">Flex item 1</div>
            <div className="bg-blue-200 p-4 rounded-md">Flex item 2</div>
            <div className="bg-blue-200 p-4 rounded-md">Flex item 3</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-200 p-4 rounded-md">Grid item 1</div>
            <div className="bg-green-200 p-4 rounded-md">Grid item 2</div>
            <div className="bg-green-200 p-4 rounded-md">Grid item 3</div>
          </div>
        </section>
        
        <section className="mb-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-medium mb-2">Component Tests</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Button Element
          </button>
          <div className="mt-4 border border-gray-300 rounded-md p-4 shadow-sm">
            Card Element
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-medium mb-2">CSS Variables Test</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-md" style={{ backgroundColor: 'var(--color-background)' }}>
              --color-background
            </div>
            <div className="p-4 rounded-md" style={{ backgroundColor: 'var(--color-primary)' }}>
              --color-primary
            </div>
            <div className="p-4 rounded-md text-white" style={{ backgroundColor: 'var(--color-secondary)' }}>
              --color-secondary
            </div>
            <div className="p-4 rounded-md" style={{ backgroundColor: 'var(--color-accent)' }}>
              --color-accent
            </div>
          </div>
        </section>
        
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg">
          This element tests fixed positioning
        </div>
      </main>
    </>
  );
} 