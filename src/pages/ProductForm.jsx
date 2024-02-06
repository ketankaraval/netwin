import React from 'react';
import { useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  console.log(id);
  return <div>ProductForm</div>;
};

export default ProductForm;
