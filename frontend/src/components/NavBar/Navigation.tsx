interface NavigationProps {
    scrolled: boolean;
    setShowGalleryModal?: (show: boolean) => void;
    setShowContactModal?: (show: boolean) => void;
};
const Navigation = ({ scrolled, setShowGalleryModal, setShowContactModal }: NavigationProps) => {

    return (
        <>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-rose-500' : 'text-white hover:text-rose-200'
                  }`}
                  onClick={(e) => {
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
        </>
    );
};
export default Navigation;
