import React from 'react';
import { Leaf, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-green-600 mb-4">
              <Leaf className="w-8 h-8 mr-2" />
              <span className="text-xl font-bold text-gray-900">EcoTrade</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The world's first transparent, verified carbon credit marketplace. 
              Retire carbon instantly with legal certification.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-green-600 transition">Browse Projects</a></li>
              <li><a href="#" className="hover:text-green-600 transition">How it Works</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-green-600 transition">API Access</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-green-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Careers</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Blog</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition"><Twitter size={20}/></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition"><Linkedin size={20}/></a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition"><Github size={20}/></a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition"><Mail size={20}/></a>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              © 2025 EcoTrade Inc. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;