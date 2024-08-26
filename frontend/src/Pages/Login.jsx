import React, { useState } from 'react';
import auth from '../firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from "../components/Navbar"
import DialogBox from '../components/Dialog';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const[title,setTitle]=useState();
  const[message,setMessage]=useState();
  const navigate=useNavigate();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const putTitle=(heading)=>setTitle(heading)
  const putMessage=(message)=>setMessage(message)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      openDialog();
      putTitle('Login Successful');
      putMessage('You can purchase freely now')
      setEmail('');
      setPassword('')
      setTimeout(() => {
        closeDialog();
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error(err);
      
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email format');
          break;
        case 'auth/user-disabled':
          setError('User account is disabled');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Error logging in');
          break;
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="bg-gray-100 shadow-md rounded-md p-8 max-w-md w-full"
        >
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email:
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Password:
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Log In
          </button>
        </form>
      </div>
         
            <DialogBox
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={title}
        actionLabel="Close"
        onAction={closeDialog}
      >
       <p>{message}</p>
      </DialogBox>
    </>
  );
};

export default Login;
