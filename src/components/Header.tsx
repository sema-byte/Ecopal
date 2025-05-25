
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-3 px-4 rounded-b-2xl border-b-2 border-ecoGreen mb-4">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/lovable-uploads/f65f8a63-0172-4b0c-9f71-907eb0defff8.png"
            alt="Ecopal Logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-ecoGreen-dark tracking-wide">
            Ecopal
          </h1>
        </div>
        <div className="flex items-center gap-2 text-ecoPink-dark">
          <Heart className="h-5 w-5" />
          <span className="hidden sm:inline font-medium">For Kids 4-12</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
