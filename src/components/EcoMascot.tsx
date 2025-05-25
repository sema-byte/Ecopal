
import { useState, useEffect } from 'react';

interface EcoMascotProps {
  image: string;
  alt?: string;
  animation?: 'bounce' | 'float' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const EcoMascot = ({ 
  image, 
  alt = "Ecopal Mascot", 
  animation = 'float',
  size = 'md' 
}: EcoMascotProps) => {
  const [currentImage, setCurrentImage] = useState(image);
  
  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
    xl: 'w-64 h-64'
  };
  
  const animationClasses = {
    bounce: 'animate-bounce-slight',
    float: 'animate-float',
    none: ''
  };
  
  return (
    <div className={`${sizeClasses[size]} ${animationClasses[animation]} relative z-10`}>
      <img 
        src={currentImage} 
        alt={alt}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default EcoMascot;
