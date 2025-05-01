// src/core/furiaService.ts

interface JogoInfo {
  adversario: string;
  campeonato: string;
  data: string;
  status: string;
}

interface JogadorInfo {
  roster: string;
}

// Exporta a função para poder ser importada em outros arquivos
export const getProximoJogo = async (): Promise<JogoInfo | null> => {
  console.log("furiaService: Buscando (mock) próximo jogo...");

  try {
    // Dados mockados por enquanto
    const jogoMockado: JogoInfo = {
      adversario: "Vitality Mock Service", // Mudei um pouco para confirmar que está vindo daqui
      campeonato: "Mock Service Masters",
      data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Agendado (Service)",
    };
    return jogoMockado;
  } catch (error) {
    console.error("Erro ao buscar próximo jogo:", error);
    return null;
  }
};

export const getJogadoresAtuais = async (): Promise<JogadorInfo | null> => {
  console.log("furiaService: Buscando (mock) jogadores...");
  try {
    // Dados mockados (mais atuais - inventados para exemplo)
    const jogadorMockado: JogadorInfo = {
      roster: "FalleN, kscerato, yuurih, Yekindar, Molodoy", // Com espaços
    };
    // Ou como array: roster: ['FalleN', 'kscerato', ...]
    return jogadorMockado;
  } catch (error) {
    // Use uma mensagem específica para este erro
    console.error("Erro ao buscar jogadores:", error);
    return null;
  }
};

// Adicione outras funções de serviço aqui no futuro
// export const getJogadores ...