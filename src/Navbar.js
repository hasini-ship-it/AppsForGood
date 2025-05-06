import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

     const redirect = (page) => {
      setIsOpen(false)
      return navigate('/'+page);
     }
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-blue-600" onClick={() => navigate('/')}>
            Home
          </a>

          <nav className="hidden md:flex space-x-10">
            <a href="#topics" className="text-sm font-medium text-gray-800 hover:text-blue-600"  onClick={() => navigate('/topics')}>
              Topics
            </a>
            <a href="#awards" className="text-sm font-medium text-gray-800 hover:text-blue-600" onClick={() => navigate('/awards')}>
              Awards
            </a>
            <a href="#settings" className="text-sm font-medium text-gray-800 hover:text-blue-600" onClick={() => navigate('/settings')}>
              Settings
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#topics"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => redirect('topics')}
          >
            Topics
          </a>
          <a
            href="#awards"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => redirect('awards')}
          >
            Awards
          </a>
          <a
            href="#settings"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => redirect('settings')}
          >
            Settings
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;