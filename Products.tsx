import React, { useEffect, useState } from 'react';
import ProductCreateForm from './ProductCreateForm';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Função para buscar produtos
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função de exclusão
  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      // Remove o produto localmente
      setProducts((prev: Product[]) => prev.filter((p: Product) => p.id !== id));
    } else {
      alert('Erro ao excluir o produto.');
    }
  };

  // Quando um novo produto é criado
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev: Product[]) => [...prev, newProduct]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Produtos</h1>

      <ProductCreateForm onProductCreated={handleAddProduct} />

      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: '10px' }}>
            <strong>{p.name}</strong> — R$ {p.price.toFixed(2)}
            <button
              onClick={() => handleDelete(p.id)}
              style={{
                marginLeft: '10px',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
