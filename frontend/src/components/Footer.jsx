import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">ScholarSync</h2>
          </div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering students to find their perfect scholarship match through intelligent AI assistance.
            Built with MERN stack and zero-shot prompting technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
              <ul className="space-y-2 text-gray-400">
                <li>React.js Frontend</li>
                <li>Node.js Backend</li>
                <li>MongoDB Database</li>
                <li>Zero-shot AI Prompting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Smart Profile Analysis</li>
                <li>Real-time Matching</li>
                <li>Natural Language Input</li>
                <li>Structured Results</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Capabilities</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Zero-shot Learning</li>
                <li>Profile Extraction</li>
                <li>Eligibility Matching</li>
                <li>Score Calculation</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <p className="text-gray-400">
              © 2025 ScholarSync. Built with MERN stack and AI-powered matching algorithms.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;