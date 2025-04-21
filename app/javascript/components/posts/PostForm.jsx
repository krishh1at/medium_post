import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Image } from 'react-bootstrap';
import { fetchCategories } from '../../actions/categories';

const PostForm = ({
  onSubmitHandler = () => console.warn('onSubmitHandler not provided'),
  handleEditToggle = () => {},
  attributes = {}
}) => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector(state => state.categories);
  const { title, body, category_ids } = attributes;

  const [formData, setFormData] = useState({
    title: title || '',
    body: body || '',
    category_ids: category_ids || [],
  });

  const [formError, setFormError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(attributes.avatar_url || null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value, 10));
    setFormData(prev => ({ ...prev, category_ids: selected }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      setPreviewUrl(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.title || !formData.body) {
      setFormError('Title and body are required.');
      return;
    }
  
    const payload = new FormData();
  
    payload.append('post[title]', formData.title);
    payload.append('post[body]', formData.body);
  
    formData.category_ids.forEach(id => {
      payload.append('post[category_ids][]', id);
    });
  
    if (formData.avatar instanceof File) {
      payload.append('post[avatar]', formData.avatar);
    }

    console.log('FormData contents:');
    for (const [key, value] of payload.entries()) {
      console.log(`${key}:`, value);
    }
    
    onSubmitHandler(payload);
  };
  
  return (
    <Card className='p-4 mt-4 shadow-sm'>
      {formError && <p className='text-danger fw-bold'>{formError}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='postTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            placeholder='Enter post title'
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='postBody'>
          <Form.Label>Body</Form.Label>
          <Form.Control
            as='textarea'
            name='body'
            rows={6}
            placeholder='Write your content here...'
            value={formData.body}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='postCategories'>
          <Form.Label>Select Categories</Form.Label>
          <Form.Select
            multiple
            name='category_ids'
            value={formData.category_ids}
            onChange={handleCategoryChange}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-4' controlId='postAvatar'>
          <Form.Label>Upload Avatar</Form.Label>
          <Form.Control
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
          {previewUrl && (
            <div className='mt-2'>
              <p className='mb-1'>Preview:</p>
              <Image src={previewUrl} alt='Avatar preview' fluid rounded style={{ maxWidth: '200px' }} />
            </div>
          )}
        </Form.Group>

        <div className='d-flex justify-content-between'>
          <Button variant='primary' type='submit'>
            Save
          </Button>
          <Button variant='secondary' type='button' onClick={handleEditToggle}>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default PostForm;
