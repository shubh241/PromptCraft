"use client";
// to find which user is logged in 
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import React, { useEffect, useState } from 'react'

const EditPrompt = () => {
    const router = useRouter();


    const searchParams = useSearchParams();

    const promptId = searchParams.get('id');
    const [submitting,setSubmitting] = useState(false);
    const [post,setPost]=useState({
        prompt:'',
        tag:'',
    });

    useEffect(()=>{
     const getPromptDetails= async()=>{
     
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
     }

     if (promptId) getPromptDetails()
    },[promptId])
    
    const updatePrompt= async(e)=>{
        e.preventDefault(); // this is going to prevent default behaviour of the browser when submitting the form which is use to do the reload.
        setSubmitting(true);

        if(!promptId) return alert ('Prompt ID not found')

        try{
            // passing all the data to this api /api/prompt/new' using the post request 
            const response= await fetch(`/api/prompt/${promptId}`,{
               method: 'PATCH',
               body: JSON.stringify({
                prompt :post.prompt, 
                tag: post.tag,
               }) 
            })
            if(response.ok){
                router.push('/');
            }

        }catch(error){
         console.log(error);
        } finally{
            setSubmitting(false);
        }
    }

  return (
   <Form
     type='Update'
     post={post}
     setPost={setPost}
     submitting={submitting}
     handleSubmit={updatePrompt}
   
   />
  )
}

export default EditPrompt;