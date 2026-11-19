//meu teste 2
//
// integrantes do grupo techcore: murilo, joao, vinicius, pietro,fernanda,davi
import express from 'express'; 
import { produtos } from './produto.js'; 

const app = express(); 
const PORT = 3000; 

app.use(express.json()); 

app.get('/produtos', (req, res) => { 
  res.status(200).json(produtos); 
}); 

app.get('/produtos/:id', (req, res) => { 
  const id = parseInt(req.params.id); 
  const produto = produtos.find(p => p.id === id); 
  if (produto) { 
    res.status(200).json(produto); 
  } else { 
    res.status(404).json({ mensagem: 'Produto não encontrado' }); 
  } 
}); 

app.get('/produtos/nome/:nome', (req, res) => { 
  const nome = req.params.nome; 
  const produto = produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase()); 
  if (produto) { 
    res.status(200).json(produto); 
  } else { 
    res.status(404).json({ mensagem: 'Produto não encontrado' }); 
  } 
}); 

app.post('/produtos', (req, res) => { 
  const { nome, preco, estoque, categoria } = req.body; 
  
  if (!nome || preco === undefined || estoque === undefined || !categoria) { 
    return res.status(400).json({ mensagem: 'Todos os campos (nome, preco, estoque e categoria) são obrigatórios.' }); 
  } 
 
  const proximoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1; 
  const novoProduto = { id: produtos.length + 1, nome, preco: parseFloat(preco), estoque: parseInt(estoque), categoria }; 
  produtos.push(novoProduto); 
  res.status(201).json(novoProduto); 
}); 

app.put('/produtos/:id', (req, res) => { 
  const id = parseInt(req.params.id); 
  const { nome, preco, estoque, categoria } = req.body; 
  const index = produtos.findIndex(p => p.id === id); 
  if (index === -1) { 
    return res.status(404).json({ mensagem: `produto com id ${id}nao encontrado para atualizacao` }); 
  } 
  if (!nome || preco === undefined || estoque === undefined || !categoria) { 
    return res.status(400).json({ mensagem: 'Todos os campos(nome, preco, estoque, categoria devem ser informados' }); 
  } 
  produtos[index] = { id, nome, preco: parseFloat(preco), estoque: parseInt(estoque), categoria }; 
  res.status(200).json(produtos[index]); 
}); 
app.delete('/produtos/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const Index = produtos.findIndex(p=> p.id=== id)

    if (Index === -1) {
        return res.status(404).json({mensagem:`produto com id ${id}nao encontrado para exclusao`})
    }
    const [ produtoremovido] = produtos.splice(Index,1);

    res.status (200).json ({mensagem:`produto com id ${id} removido com sucesso`})
})

app.listen(PORT, () => { 
  console.log(`Servidor rodando em http://localhost:${PORT}`); 
  console.log(`Acesse http://localhost:${PORT}/produtos para testar`); 
});
