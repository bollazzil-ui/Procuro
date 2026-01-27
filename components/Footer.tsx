import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-20 px-4 border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-blue-900 tracking-tight">Procuro</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Switzerland's leading intelligent B2B marketplace. Connecting SMEs with IT excellence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6 uppercase text-xs tracking-widest">Platform</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Browse Categories</Link></li>
            <li><Link to="/sme" className="hover:text-blue-600 transition-colors">Smart Match System</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition-colors">Success Stories</Link></li>
            <li><Link to="/provider" className="hover:text-blue-600 transition-colors">Partner Program</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            <li><Link to="/about" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6 uppercase text-xs tracking-widest">Get in Touch</h4>
          <div className="space-y-4">
            <a href="mailto:info@procuro.ch" className="flex items-center gap-2 text-slate-500 text-sm hover:text-blue-600 transition-colors">
              <Mail size={16} /> info@procuro.ch
            </a>
            <a href="mailto:partners@procuro.ch" className="flex items-center gap-2 text-slate-500 text-sm hover:text-blue-600 transition-colors">
              <Users size={16} /> partners@procuro.ch
            </a>
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-900 font-bold mb-1">Office Switzerland</p>
              <p className="text-xs text-blue-700">Bahnhofstrasse 102, 8001 Zürich</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
        <p>© 2026 Procuro. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span>Made in Switzerland</span>
          <div className="w-4 h-3 bg-red-600 flex items-center justify-center relative rounded-sm">
             <div className="absolute w-2 h-[2px] bg-white"></div>
             <div className="absolute w-[2px] h-2 bg-white"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;