
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-4 bg-white shadow-inner border-t-2 border-ecoGreen rounded-t-2xl">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-500">
            © 2025 Ecopal
          </p>
          <p className="flex items-center text-sm text-gray-500">
            Made with <Heart className="h-4 w-4 mx-1 text-ecoPink" /> for Nature
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
