
import React, {useState} from "react";
import "../styles/globals.css";
import Cookies from 'js-cookie';
import { useEffect} from 'react';
import { useRouter } from 'next/router';





export default function Home() { 
  const token = Cookies.get('token');
  const router = useRouter();

  


  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    else {
      router.push('/blog')
    }
  }, [token, router]);

  
 
    return (
        <div className="home-sections bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
           
         
         

        </div>  
    );
} 
