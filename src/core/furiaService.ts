// src/core/furiaService.ts

interface JogoInfo {
    adversario: string;
    campeonato: string;
    data: string;
    status: string;
  }
  
  // Exporta a função para poder ser importada em outros arquivos
  export const getProximoJogo = async (): Promise<JogoInfo | null> => {
    console.log('furiaService: Buscando (mock) próximo jogo...');
  
    try {
      // Dados mockados por enquanto
      const jogoMockado: JogoInfo = {
        adversario: 'Vitality Mock Service', // Mudei um pouco para confirmar que está vindo daqui
        campeonato: 'Mock Service Masters',
        data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Agendado (Service)',
      };
      return jogoMockado;
  
    } catch (error) {
      console.error("Erro ao buscar próximo jogo:", error);
      return null;
    }
  };
  
  // Adicione outras funções de serviço aqui no futuro
  // export const getJogadores ...