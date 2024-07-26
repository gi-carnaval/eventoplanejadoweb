import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import RoutesComponent from './routes';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import imageLogo from './assets/ogImage.png'

function App() {

  const helmetContext = {};

  return (
    <AuthProvider>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <meta property="og:image" content={imageLogo} />
          <meta property="image" content={imageLogo} />
        </Helmet>
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <RoutesComponent />
        </GoogleOAuthProvider>
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </HelmetProvider>
    </AuthProvider>
  )
}

export default App
