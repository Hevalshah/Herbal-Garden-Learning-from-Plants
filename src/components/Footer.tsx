
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-herbal-forest-dark/80 border-t border-herbal-forest py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-herbal-gold font-bold text-lg mb-3">The Herbal Codex</h3>
            <p className="text-herbal-cream/80">
              Explore, learn, and grow with our interactive 3D herbal encyclopedia.
            </p>
          </div>
          
          <div>
            <h3 className="text-herbal-gold font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-herbal-cream/80 hover:text-herbal-gold">Home</Link>
              </li>
              <li>
                <Link to="/garden" className="text-herbal-cream/80 hover:text-herbal-gold">3D Garden</Link>
              </li>
              <li>
                <Link to="/plants" className="text-herbal-cream/80 hover:text-herbal-gold">Plant Directory</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-herbal-gold font-bold text-lg mb-3">Disclaimer</h3>
            <p className="text-herbal-cream/80 text-sm">
              The information provided on this site is for educational purposes only and not intended as medical advice.
              Always consult a healthcare professional before using medicinal herbs.
            </p>
          </div>
        </div>
        
        <div className="border-t border-herbal-forest mt-8 pt-4 text-center text-herbal-cream/60 text-sm">
          &copy; {currentYear} The Herbal Codex. Educational Project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
