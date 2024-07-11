import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import RoutesComponent from './routes';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
