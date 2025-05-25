
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  color: "green" | "blue" | "pink";
  onClick: () => void;
  children: ReactNode;
}

const FeatureCard = ({ title, icon, color, onClick, children }: FeatureCardProps) => {
  const borderColorClass = {
    green: "border-ecoGreen",
    blue: "border-ecoBlue",
    pink: "border-ecoPink",
  }[color];

  const titleColorClass = {
    green: "text-ecoGreen-dark",
    blue: "text-ecoBlue-dark",
    pink: "text-ecoPink-dark",
  }[color];

  return (
    <div 
      className={`eco-card border-4 ${borderColorClass} flex flex-col h-full hover:scale-[1.01] transition-transform cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{icon}</div>
        <h3 className={`text-xl font-bold ${titleColorClass}`}>{title}</h3>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default FeatureCard;
