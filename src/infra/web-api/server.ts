import express, { Request, Response } from 'express';
import cors from 'cors';
// Importaremos a lógica do 'core' aqui depois
// import { getProximoJogo } from '../../core/furiaService';

const app = express();
const port = process.env.API_PORT || 3001; // Porta para a API

// Habilita o CORS para permitir requisições do frontend (que rodará em outra porta)
app.use(cors());

// Middleware para parsear JSON no corpo das requisições (se precisar enviar dados POST)
app.use(express.json());

// Rota de Teste
app.get('/api/ping', (req: Request, res: Response) => {
  res.json({ message: 'Pong! API está no ar.' });
});

// Rota Exemplo (BUSCAREMOS DADOS REAIS DEPOIS)
app.get('/api/proximo-jogo', async (req: Request, res: Response) => {
  try {
    // POR ENQUANTO: Retorna dados mockados
    // DEPOIS: Chamaremos a função real: const jogo = await getProximoJogo();
    const jogoMockado = {
      adversario: 'Time Rival Exemplo',
      campeonato: 'Campeonato Exemplo',
      data: new Date().toISOString(),
      status: 'Agendado',
    };
    console.log('API: Enviando próximo jogo mockado');
    res.json(jogoMockado);
  } catch (error) {
    console.error('Erro ao buscar próximo jogo:', error);
    res.status(500).json({ message: 'Erro ao buscar dados do próximo jogo.' });
  }
});

// --- Adicione outras rotas aqui ---

app.listen(port, () => {
  console.log(`🚀 API Web Chat FURIA rodando na porta ${port}`);
});