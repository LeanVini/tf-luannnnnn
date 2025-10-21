import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock de banco de dados em memória
let products = [
  { id: 1, name: 'Teclado', price: 199.9 },
  { id: 2, name: 'Mouse', price: 99.9 },
];

// Configura o EJS
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

// Rota de VIEW (React embutido)
app.get('/products', (req, res) => {
  res.render('products');
});

// --- ROTAS REST --- //

// Listar produtos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Criar produto
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Dados inválidos' });

  const newProduct = { id: Date.now(), name, price: Number(price) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Excluir produto
app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Produto não encontrado' });

  products.splice(index, 1);
  res.status(204).send();
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}/products`));
