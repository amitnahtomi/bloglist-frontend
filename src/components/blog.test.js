import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Blog from './Blog.js';

describe('single blog', ()=>{
    const blog = {
        title: "aaa",
        author: "bbb",
        url: "ccc",
        likes: 0
    }
    const componenet = render(
        <Blog blog={blog} userToken='eyJhbGciOiJIUzI1NiJ9.dGVzdDE.9fQvukrA79JjhlEmem_OhRRB_gpTIIrxsGAuNL9ENcY'/>
    )
    const title = componenet.getByText('aaa');
        const author = componenet.getByText('bbb');
        const url = componenet.getByText('ccc');
        const likes = componenet.getByText(0);
        const showBtn = componenet.container.querySelector('button');
        const likeBtn = componenet.container.querySelectorAll('button')[1];
        console.log(likeBtn);
        
    test('only title should be defined', ()=>{
        expect(title.style.display).toBe('block');
        expect(author.style.display).toBe('none')
        expect(url.style.display).toBe('none')
        expect(likes.style.display).toBe('none')
    })
    afterEach(()=>{
        fireEvent.click(showBtn);
        fireEvent.click(likeBtn);
    })
    test('blog ahould be visible', ()=>{
     expect(author.style.display).toBe('block')
        expect(url.style.display).toBe('block')
        expect(likes.style.display).toBe('block')
    })
    test('should like a blog', ()=>{
        expect(likes).toHaveTextContent('2 like');
    })
})