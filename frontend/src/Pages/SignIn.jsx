import React, { useState } from 'react';
import auth from  "../firebase/Firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from "../components/Navbar"; 
import { Link,useNavigate } from 'react-router-dom';
import DialogBox from "../components/Dialog"
import { getFirestore, doc, setDoc } from 'firebase/firestore';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const[title,setTitle]=useState();
  const[message,setMessage]=useState();
const navigate=useNavigate()
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const putTitle=(heading)=>setTitle(heading)
  const putMessage=(message)=>setMessage(message)

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!email || !password) {
      openDialog()
      putTitle("Email and Password required");
      putMessage("Kindly enter Email and set Password to sign in")
      return;
    }
    else if(!mobile){
      openDialog();
      putTitle('Mobile number required');
      putMessage('Kindle enter your contact number')
      return
    }
    else if(!address){
      openDialog('Address Required');
      putMessage('We need address to deliver the shipment')
      return;
    }
    else if(!name){
      openDialog('Name Required');
      putMessage('We need legal Name to Register a customer')
      return;
    }
    

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        mobile: mobile,
        address: address,
        email:email
       
      });
      openDialog(); 
      putTitle('Welcome to Shopease');
      putMessage("Congratulations for your first successful authentication")
      setEmail('');
      setPassword('');
      setName('');
      setMobile('');
      setAddress('');
      setTimeout(()=>{
        navigate("/")
      },3000)
    
    } catch (err) {
      console.error(err);
     
      switch (err.code) {
        case 'auth/email-already-in-use':
          openDialog()
          putTitle('Email already in use');
          putMessage('Kindly login, this email address is registered')
          break;
        case 'auth/invalid-email':
          openDialog()
          putTitle('Register valid Email')
          putMessage("This EMail address format is not supported")
          break;
        case 'auth/weak-password':
          openDialog()
         putTitle('Weak Password');
         putMessage("We need min 6 digit password")
          break;
        default:
          openDialog()
          putTitle('Error signing up');
          putMessage("There is something wrong")
          break;
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <form
          onSubmit={handleSignUp}
          className="bg-gray-100 shadow-md rounded-md p-8 max-w-md w-full"
        >
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name:
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="mobile">
              Mobile number:
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                type="text"
                id="mobile"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
          </div>
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
              Enter Password:
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
          <div className="mb-4">
            <label className="block mb-2" htmlFor="address">
              Enter Address:
              <textarea
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Sign-Up
          </button>
          <p>
            Already an existing user? <Link to="/Login">Login</Link>
          </p>
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

export default SignUp;
