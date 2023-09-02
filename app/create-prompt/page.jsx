"use client";
import { useSession } from 'next-auth/react';// to find which user is logged in 
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import React, { useState } from 'react'

const CreatePrompt = () => {
    const router = useRouter();
    const {data:session}= useSession();
    const [submitting,setSubmitting] = useState(false);
    const [post,setPost]=useState({
        prompt:'',
        tag:'',
    });
    
    const createPrompt= async(e)=>{
        e.preventDefault(); // this is going to prevent default behaviour of the browser when submitting the form which is use to do the reload.
        setSubmitting(true);

        try{
            // passing all the data to this api /api/prompt/new' using the post request 
            const response= await fetch('/api/prompt/new',{
               method: 'POST',
               body: JSON.stringify({
                prompt :post.prompt,
                userId : session?.user.id,
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
     type='Create'
     post={post}
     setPost={setPost}
     submitting={submitting}
     handleSubmit={createPrompt}
   
   />
  )
}

export default CreatePrompt;