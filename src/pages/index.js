import 'bulma/css/bulma.min.css';
import { SignIn, SignedIn, SignedOut, useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from "next/router";


export default function Home() {
  const {userId} = useAuth();
  const {user} = useUser();
  const router = useRouter();

  function Redirect() {
    if (userId){    
      router.push('/todos'); 
    } else{
      return(
        <div>
          <h1>Welcome to My To-do!</h1>
          <h2>Login to create and manage your to-do list.</h2>
          <br></br>
          <SignIn />
        </div>
      )
    }
  }

  // if (userId) {
  //   return (
  //     <div>
  //       <h1>Hello, {user.firstName}!</h1>
  //       <p>{userId}</p>
  //     </div>
  //   )
  // }

  return (
    <Redirect></Redirect>
  )
}