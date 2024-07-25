import React, { useEffect } from 'react'
import {useAuthenticatedFetch} from '../hooks'
import {Button, DataTable, FormLayout, TextField} from '@shopify/polaris';
import { useState } from 'react';



const Product = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState('false');
  const [isPopupOpen, setIsPopupOpen] = useState('false');
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', body_html: '',vendor:'' });
  const [updatedProduct, setUpdatedProduct] = useState({title: '', body_html: ''});
  const [isDelete, setIsDelete] = useState('false');
  const fetch = useAuthenticatedFetch();
  useEffect(()=>{
    fetchData();
    //updateProduct();
    //createProduct();
    //deleteProduct();
  },[]);

  
  const fetchData =async()=>{
    const response = await fetch("/api/products/all");
    const data = await response.json();
    setProducts(data.data);
    
  }
  console.log(products);

  const createProduct = async()=>{
    const response = await fetch("/api/product/create",{
       method:"POST",
       headers:{"Content-type":"application/json"},
       body:JSON.stringify(newProduct)
    });
    const data = await response.json();
    fetchData();
    console.log(data);
  }

  const updateProduct = async(id)=>{
    const response = await fetch("/api/product/update",{
       method:"PUT",
       headers:{"Content-type":"application/json"},
       body:JSON.stringify(updatedProduct)
    });
    const data = await response.json();
    fetchData();
    console.log(data);
  }
  const deleteProduct = async(productId)=>{
    const response = await fetch("/api/product/delete",{
       method:"DELETE",
       headers:{"Content-type":"application/json"},
       body:JSON.stringify({id:productId})
    });
    const data = await response.json();
    alert(data.Messaege);
    fetchData();
    console.log(data);
  }
  
 /*
  const updateProduct = async(id)=>{
    const response = await fetch("/api/product/update",{
       method:"PUT",
       headers:{"Content-type":"application/json"},
       body:JSON.stringify({id:8624347545822,title:"lakhan hero"})
    });
    const data = await response.json();
    fetchData();
    console.log(data);
  }
  const createProduct = async()=>{
    const response = await fetch("/api/product/create",{
       method:"POST",
       headers:{"Content-type":"application/json"},
       body:JSON.stringify({body_html:"this is a new product",title:"rey reigns"})
    });
    const data = await response.json();
    fetchData();
    setIsModalOpen(false);
    console.log(data);
  }
  
  const deleteProduct = async()=>{
    const response = await fetch("/api/product/delete",{
       method:"DELETE",
       //headers:{"Content-type":"application/json"},
       //body:JSON.stringify({id:8624347545822})
    });
    const data = await response.json();
    console.log(data);
  }*/
 const formHandler=()=>{
  setIsFormOpen('true');
  
 }
 const createBtnHandler =()=>{
  console.log(newProduct);
  createProduct();
  setIsFormOpen('false');
 }
 
 const handleUpdate=(productId)=>{
    setUpdatedProduct({...updatedProduct,id:productId});
    setIsPopupOpen('true');
 }
 //console.log(isFormOpen);

const handleClosePopup = () => {
  setIsPopupOpen('false');
};

const handleSubmit = () => {
  handleClosePopup();
  updateProduct();
};

const handleDelete=(productId)=>{
  deleteProduct(productId);
  
  setIsDelete('true');
  
}

  const productRows = products.map(product => [
    product.title,
    product.body_html,
    product.variants[0].price,
    <Button onClick={()=>{handleUpdate(product.id)}}>Edit</Button>,
    <Button onClick={()=>{handleDelete(product.id)}}>Delete</Button>
  ]);
 


  return (
    <div>
      <h1>this is a products page</h1>
      <Button onClick={formHandler}>Create product</Button>
      {isFormOpen =='true' &&
        <FormLayout>
          <TextField
            label="Title"
            value={newProduct.title}
            onChange={(value) => setNewProduct({ ...newProduct, title: value })}
          />
          <TextField
            label="vendor"
            value={newProduct.vendor}
            onChange={(value) => setNewProduct({ ...newProduct, vendor: value })}
          />
          <TextField
            label="Body_html"
            value={newProduct.body_html}
            onChange={(value) => setNewProduct({ ...newProduct, body_html: value })}
          />
          <Button onClick={createBtnHandler}>Submit</Button>
        </FormLayout>
      }
      <DataTable
          columnContentTypes={['text', 'text', 'text', 'text','text']}
          headings={['Title', 'Body', 'Price', 'edit','delete']}
          rows={productRows}
        />

      {isPopupOpen =='true' && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Edit Information</h2>
            <TextField
              label="Title"
              value={updatedProduct.title}
              onChange={(value) => setUpdatedProduct({ ...updatedProduct, title: value })}
            />
            <TextField
              label="Body_html"
              value={updatedProduct.body_html}
              onChange={(value) => setUpdatedProduct({ ...updatedProduct, body_html: value })}
            />
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleClosePopup}>Close</Button>
          </div>
        </div>
      )}  
    </div>
  )
}

export default Product
