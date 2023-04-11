import '@/styles/globals.css'
import 'bulma/css/bulma.min.css';
// import '@fontawesome/fontawesome-free/css/all.min.css'
import Layout from '../components/Layout'
import { ClerkProvider, RedirectToSignUp, SignIn, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs';


export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SignedIn>
      <SignedOut>
        <Layout>
          <Component {...pageProps} />
          <SignIn />
        </Layout>
      </SignedOut>
    </ClerkProvider>
  )
}
