export interface PlayerData {
    nickname: string;
    realName?: string;
    cardImageUrl: string; // Imagem da CARTA pronta
    photoImageUrl?: string; // Foto mais "limpa" para o stats panel? (Opcional)
    role: string;
    nationality?: {
      name: string;
      flagUrl: string;
    };
    stats?: { // Dados adicionais
      kda?: string; // Ex: "1.15 / 0.98 / 0.60" (KDR / DPR / ADR)
      rating?: number; // Ex: 1.08
      hsPercent?: number; // Ex: 45.5
    };
  }