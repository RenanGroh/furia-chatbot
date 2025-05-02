import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number; // Quanto do elemento precisa estar visível (0 a 1)
  triggerOnce?: boolean; // Animar apenas uma vez?
  rootMargin?: string; // Margem ao redor do viewport
}

const useScrollAnimation = (options?: ScrollAnimationOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Atualiza o estado quando o elemento cruza o threshold
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Desconecta o observer se for para animar apenas uma vez
          if (options?.triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else {
            // Se triggerOnce for false, reseta para animar novamente ao sair/entrar
            if (!options?.triggerOnce) {
                setIsVisible(false);
            }
        }
      },
      {
        threshold: options?.threshold || 0.1, // Anima quando 10% estiver visível
        rootMargin: options?.rootMargin || '0px 0px -50px 0px', // Começa a observar um pouco antes de entrar totalmente
      }
    );

    const currentElement = elementRef.current; // Guarda a referência atual
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup: desconecta o observer quando o componente desmontar
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]); // Recria o observer se as opções mudarem

  return { ref: elementRef, isVisible };
};

export default useScrollAnimation;