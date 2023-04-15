import Done from '../components/Done';
import 'bulma/css/bulma.min.css';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from "next/router";

export default function DoneHome() {
  const {userId} = useAuth();
  const router = useRouter();
    
  function Redirect() {
    router.push('/'); 
  };

  if (!userId) {
    return (
        <Redirect></Redirect>
    )
  } 
  return(
    <div>
        <Done></Done>
    </div>
  )
}