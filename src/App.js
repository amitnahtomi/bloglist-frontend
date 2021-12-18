import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [formVisisbility, setFormVisisbility] = useState('none')
  const username = useRef(null);
  const password = useRef(null);
  const title = useRef(null);
  const url = useRef(null);
  const author = useRef(null);
  const response = useRef(null);

  const logInBtn = async () => {
    const req = await fetch("/api/users" ,{
      method: "PUT",
      headers:{
          Accept: "application/json",
           "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username.current.value, password: password.current.value})})
      if(req.ok){
        const user = await req.json();
        localStorage.setItem('user', JSON.stringify({userToken:user.token, username: username.current.value}))
        setUser({userToken:user.token, username: username.current.value});
      }
      else {
        responseDiv('wrong username or password');
      }
  }

  const logOutBtn = () => {
    setUser(null);
    localStorage.clear();
  }

  const viewForm = () => {
    if(formVisisbility === 'none') {
      setFormVisisbility('block');
    }
    else {
      setFormVisisbility('none');
    }
  }

  const createBlog = async () => {
    const req = await fetch("/api/blogs" ,{
      method: "POST",
      headers:{
        Authorization: user.userToken,
          Accept: "application/json",
           "Content-Type": "application/json"
      },
      body: JSON.stringify({title: title.current.value, url: url.current.value, author: author.current.value})})
      if(req.ok) {
        responseDiv(`added a blog by ${author.current.value}`)
        blogService.getAll(user.userToken).then(blogs =>
          setBlogs( blogs )
          )  
        }
        else {
          responseDiv('missing details');
        }
      author.current.value = '';
      title.current.value = '';
      url.current.value = '';
      setFormVisisbility('none');
    }

    const responseDiv = (msg) => {
      response.current.innerText = msg;
      setTimeout(()=>{response.current.innerText = ''}, 3000);
    }

  useEffect(() => {
    if(user === null) {
      if(localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')))
        return;
      }
      else {
        return;
      }
    } 
    const fetchBlogs = async () => {
      const req = await fetch("/api/blogs" ,{
        method: "GET",
        headers:{
          Authorization: user.userToken,
            Accept: "application/json",
             "Content-Type": "application/json"
        }})
        const blogsList = await req.json();
        setBlogs(blogsList);
    }
    fetchBlogs(); 
  }, [blogs, user])
if(user === null) {
  return <div>
    <input ref={username} placeholder='user name'></input>
    <input ref={password} placeholder='password'></input>
    <button onClick={logInBtn}>log in</button>
    <div id='resDiv' ref={response}></div>
  </div>
}
else {
  return (
    <div>
      <h2>blogs</h2>
      <div ref={response}></div>
      <div>{user.username} logged in</div>
      <button onClick={logOutBtn}>log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} userToken={user.userToken}/>
      )}
      <button onClick={viewForm}>create new blog</button>
      <div style={{display: formVisisbility}}>
      <div>title: <input ref={title}></input></div>
      <div>author: <input ref={author}></input></div>
      <div>url: <input ref={url}></input></div>
      <button onClick={createBlog}>create</button>
      </div>
    </div>
  )
      }
}

export default App