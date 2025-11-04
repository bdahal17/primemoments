import {useSelector} from "react-redux";
import {Menu, Sparkles, X} from "lucide-react";
import Navigation from "./Navigation.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../store/hooks.ts";

interface NavBarProps {
    scrolled: boolean;
    setShowGalleryModal: (show: boolean) => void;
    setShowContactModal: (show: boolean) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}
const NavBar: React.FC<NavBarProps> = ({ scrolled, setShowContactModal, setShowGalleryModal, setIsMenuOpen, isMenuOpen }: NavBarProps) => {

  const user = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const isBootstrapping = useAppSelector((state) => state.user.isBootstrapping);
  return (
      <nav
          style={{
              position: "fixed",
              top: 0,
              left: 0,
          }}
          className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-600 py-6'}`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                  <div
                      className="flex items-center space-x-2"
                      // go to path '/' and refresh the page
                      onClick={() => {
                          navigate('/');
                      }}
                    >
                      <Sparkles className={`h-8 w-8 ${scrolled ? 'text-rose-500' : 'text-white'}`}/>
                      <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                        GG Decor
                      </span>
                  </div>
                  {location.pathname === '/' && (<Navigation
                      scrolled={scrolled}
                      setShowContactModal={setShowContactModal}
                      setShowGalleryModal={setShowGalleryModal}
                  />
                  )}
                  {location.pathname === '/' && (<button
                      className="md:hidden"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                      {isMenuOpen ? (
                          <X className={scrolled ? 'text-gray-900' : 'text-white'}/>
                      ) : (
                          <Menu className={scrolled ? 'text-gray-900' : 'text-white'}/>
                      )}
                  </button>)}
                  {location.pathname === '/' && (<button
                      onClick={() => {
                          if (!user) {
                              navigate('/login');
                          } else if (user) {
                              navigate('/account');
                          }
                      }}
                  >
                      {user ? ('Account') : ('Login')}
                  </button>
                  )}
              </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
                  <div className="px-4 pt-2 pb-4 space-y-2">
                      {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                          <a
                              key={item}
                              href={`#${item.toLowerCase()}`}
                              className="block py-2 text-gray-700 hover:text-rose-500"
                              onClick={(e) => {
                                  setIsMenuOpen(false);
                                  if (item === 'Gallery') {
                                      e.preventDefault();
                                      setShowGalleryModal(true);
                                  } else if (item === 'Contact') {
                                      e.preventDefault();
                                      setShowContactModal(true);
                                  }
                              }}
                          >
                              {item}
                          </a>
                      ))}
                  </div>
              </div>
          )}
      </nav>
  );
};

export default NavBar;
