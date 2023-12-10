import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';

const CreateItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // Display thumbnail
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create FormData to append form fields and the image file
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('image', formData.image);
  
      // Send POST request to server
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        // Handle successful submission
        console.log('Product created successfully!');
      } else {
        // Handle error response
        console.error('Product creation failed:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Product creation error:', error.message);
    } finally {
      // Reset form data and thumbnail
      setFormData({
        title: '',
        description: '',
        price: '',
        image: null,
      });
      setThumbnail(null);
    }
  };    

  return (
    <Card className="p-4 w-80 mx-auto mt-4">
      <h2 className="mb-4">Create Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Product Title:</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {thumbnail && (
            <div className="mt-3">
              <p>Thumbnail:</p>
              <Image src={thumbnail} width="100" height="100" alt="Thumbnail" thumbnail />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default CreateItem;
