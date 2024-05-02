const express = require('express');
const stripe = require('stripe')('sk_test_51PC2KSRrJeR7QGM6kVoA83vWuInxNUGlVqXgxma6V2cuZaGxm0t44UiEs2bUU1K4qkhTIrfF3JAxF5y7w2YmZkES00HCArFuhW'); // Importe a biblioteca do Stripe e defina sua chave secreta
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Middleware para servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota para processar o pagamento
app.post('/pagamento', async (req, res) => {
  const { valor, token } = req.body; // Obtenha os dados enviados pelo formulário

  try {
    // Crie uma cobrança na Stripe
    const charge = await stripe.charges.create({
      amount: valor, // Valor do pagamento em centavos
      currency: 'usd', // Moeda (neste exemplo, dólares americanos)
      source: token, // Token do cartão de crédito enviado pelo frontend
      description: 'Pagamento no seu site', // Descrição do pagamento
    });

    // Envie uma resposta de sucesso
    res.status(200).json({ success: true, message: 'O pagamento foi processado com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    // Envie uma resposta de erro
    res.status(500).json({ success: false, message: 'Ocorreu um erro ao processar o pagamento. Por favor, tente novamente mais tarde.' });
  }
});

// Rota de exemplo para testar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor Node.js em execução!');
});

// Inicie o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


