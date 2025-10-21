import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  onProductCreated: (product: Product) => void;
}

const ProductCreateForm: React.FC<Props> = ({ onProductCreated }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });

    if (res.ok) {
      const newProduct = await res.json();
      onProductCreated(newProduct);
      setName('');
      setPrice('');
    } else {
      alert('Erro ao criar produto.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPrice(e.target.value === '' ? '' : Number(e.target.value))
        }
        required
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Criar Produto</button>
    </form>
  );
};

export default ProductCreateForm;
