import React, { useState, useRef } from 'react'
import propTypes from 'prop-types';


export default function Blog({blog, userToken}) {

  const [detailsVis, setDetailsVis] = useState('none');
  const show = useRef(null);

  const likeBlog = async () => {
    const req = await fetch(`/api/blogs/${blog._id}` ,{
      method: "PUT",
      headers:{
          Accept: "application/json",
           "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: blog.likes + 1})})
      if(req.ok) {
        blog.likes += 1;
      }
  }

  const detailsBtn = () => {
    if(detailsVis === 'none') {
      show.current.innerText = 'hide details';
      setDetailsVis('block');
    }
    else {
      show.current.innerText = 'show details';
      setDetailsVis('none');
    }
  }

  const deleteBlog = async () => {
    const userRes = window.confirm('are you sure you wish to delete the blog');
    if(!userRes) return;
    const req = await fetch(`/api/blogs/${blog._id}` ,{
      method: "DELETE",
      headers:{
        Authorization: userToken,
          Accept: "application/json",
           "Content-Type": "application/json"
      }})
      console.log(req);
  }

  
  return<div>
    <button id='showBtn' className='showBtn' onClick={detailsBtn} ref={show}>show details</button>
    <div style={{display: 'block'}}>{blog.title} </div>
    <div style={{display: detailsVis}}>{blog.author}</div>
    <div style={{display: detailsVis}}>{blog.url}</div>
    <div style={{display: detailsVis}}>{blog.likes} <button onClick={likeBlog}>like</button></div>
    <button style={{display: detailsVis}} onClick={deleteBlog}>delete blog</button>
  </div>  
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  userToken: propTypes.string.isRequired
}