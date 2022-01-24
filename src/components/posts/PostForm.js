import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { SendCheck } from 'react-bootstrap-icons'

const PostForm = ({ handleSubmit, title, text, photo, setTitle, setText, setPhoto }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='title'>
      <Form.Label>Title</Form.Label>
      <Form.Control
        placeholder='Title'
        name='title'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='text'>
      <Form.Label>Post</Form.Label>
      <Form.Control
        placeholder='Whats on your mind?'
        name='text'
        value={text}
        onChange={event => setText(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='photo'>
      <Form.Label>Upload Photo</Form.Label>
      <Form.Control
        placeholder='Upload Photo'
        name='photo'
        value={photo}
        onChange={event => setPhoto(event.target.value)}
      />
    </Form.Group>
    <Button className='mt-2 Bttn' variant='primary' type='submit'>Submit <SendCheck /></Button>
    <div className='mt-5 footer' >Tell the world you onion</div>
  </Form>
)
export default PostForm
