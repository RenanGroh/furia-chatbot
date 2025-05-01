import React, { useRef, useState } from "react";
import "./Hover3DCard.css"; // Criaremos este CSS

interface Hover3DCardProps {
  imageUrl: string;
  altText?: string;
  glowColor?: string; // Cor opcional para o brilho
  onClick?: () => void;
}

const Hover3DCard: React.FC<Hover3DCardProps> = ({
  imageUrl,
  altText = "Card image",
  glowColor = "rgba(255, 255, 255, 0.2)", // Branco translúcido por padrão
  onClick, // Recebe a função onClick
  // isSelected,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    // Calcula posição do mouse relativa ao centro do elemento
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Fator de rotação (ajuste para mais/menos inclinação)
    const rotateFactor = 0.09;
    const rotateX = -y * rotateFactor; // Invertido para intuição natural
    const rotateY = x * rotateFactor;

    // Calcula posição do mouse relativa ao canto superior esquerdo para o brilho (0 a 100%)
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;

    // Aplica as variáveis CSS
    cardRef.current.style.setProperty("--rotateX", `${rotateX}deg`);
    cardRef.current.style.setProperty("--rotateY", `${rotateY}deg`);
    cardRef.current.style.setProperty("--glowX", `${glowX}%`);
    cardRef.current.style.setProperty("--glowY", `${glowY}%`);
    cardRef.current.style.setProperty("--glowOpacity", "1"); // Mostra o brilho
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Poderia definir uma opacidade inicial pro brilho aqui se quisesse fade-in
    if (cardRef.current) {
      cardRef.current.style.setProperty("--glowOpacity", "1");
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!cardRef.current) return;
    // Reseta as variáveis CSS para o estado padrão (com transição CSS)
    cardRef.current.style.setProperty("--rotateX", "0deg");
    cardRef.current.style.setProperty("--rotateY", "0deg");
    cardRef.current.style.setProperty("--glowOpacity", "0"); // Esconde o brilho
  };

  return (
    // Wrapper para aplicar perspectiva
    <div className="card-perspective-wrapper">
      <div
        ref={cardRef}
        className={`hover-3d-card ${isHovering ? "is-hovering" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={
          {
            // Define variáveis CSS iniciais e a cor do brilho
            "--rotateX": "0deg",
            "--rotateY": "0deg",
            "--glowX": "50%",
            "--glowY": "50%",
            "--glowOpacity": "0",
            "--glowColor": glowColor,
          } as React.CSSProperties // Type assertion para variáveis customizadas
        }
      >
        <img
          src={imageUrl}
          alt={altText}
          className="card-image-content"
          draggable="false"
        />
        {/* Pseudo-elemento ::before será usado para o brilho via CSS */}
      </div>
    </div>
  );
};

export default Hover3DCard;
