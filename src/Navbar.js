import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; //importing hook for navigation 

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); //includes state to manage mobile menu visibility
  const [scrolled, setScrolled] = useState(false); //includes state to manage scrolling on navbar

  //useEffect to handle scroll event
  useEffect(() => {
    const handleScroll = () => { //updates scroll state based on position of window scroll
      setScrolled(window.scrollY > 50);
    };

    //add scroll event listener 
    window.addEventListener('scroll', handleScroll);
    //to clean up and remove event listener when the component unmounts -- prevents memory leaks and improves performance
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
  //handles navigation for mobile
     const redirect = (page) => {
      setIsOpen(false); //close the menu
      return navigate('/'+page); //allows navigation to specific page
     }
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    > 
    {/* for desktop view */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between"> {/* home link */}
          <a href="#" className="text-2xl font-bold text-orange-400" onClick={() => navigate('/')}>
            Home
          </a>

          <nav className="hidden md:flex space-x-10">
            <a href="#topics" className="text-sm-2xl font-medium text-white hover:text-orange-600"  onClick={() => navigate('/topics')}>
              Topics {/* topics page link */}
            </a>
            <a href="#awards" className="text-sm-2xl font-medium text-white hover:text-orange-600" onClick={() => navigate('/awards')}>
              Awards {/* awards page link */}
            </a>
            <a href="#settings" className="text-sm-2xl font-medium text-white hover:text-orange-600" onClick={() => navigate('/settings')}>
              Settings {/* settings page link */}
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(!isOpen)} //toggles the menu open and close
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-4 pt-2 pb-3 space-y-1"> {/* mobile menu items */}
          <a
            href="#topics" //link to topics
            className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md" //style of text for each link
            onClick={() => redirect('topics')}
          >
            Topics
          </a>
          <a
            href="#awards" //link to awards
            className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
            onClick={() => redirect('awards')}
          >
            Awards
          </a>
          <a
            href="#settings" //link to settings
            className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
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