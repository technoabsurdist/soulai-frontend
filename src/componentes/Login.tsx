import { useState } from "react";
import { ViewAccess } from "../constants";

interface LoginProps {
    handleUserLogin: () => void;
}


const Login = ({ handleUserLogin }: LoginProps) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); 
    const [name, setName] = useState("")
    const [view, setView] = useState<ViewAccess>(ViewAccess.LOGIN); 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://soul-backend-b87052aa2595.herokuapp.com/login', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if(response.ok) {
                localStorage.removeItem('userId');
                localStorage.removeItem('email')
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('email', data.email)
                handleUserLogin();
            } else {
                console.error('Login error:', data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const signupResponse = await fetch('https://soul-backend-b87052aa2595.herokuapp.com/signup', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (signupResponse.ok) {
                const loginResponse = await fetch('https://soul-backend-b87052aa2595.herokuapp.com/login', {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                
                const data = await loginResponse.json()
                if (loginResponse.ok) {
                    // god this is disgusting codeeeeeeeeeeeeeeee
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email')
                    localStorage.removeItem('name')
                    localStorage.setItem('userId', data.userId)
                    localStorage.setItem('email', email)
                    localStorage.setItem('name', name)
                    handleUserLogin();
                } else {
                    console.error('Login error after signup');
                }
            } else {
                console.error('Signup error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
      <div className="container px-5 pt-24 mx-auto flex flex-wrap">
        <div className="flex flex-col text-center w-full mb-12 md:mb-19">
          <h1 className="mt-10 mb-4 text-6xl md:text-5xl lg:text-7xl font-black text-white tracking-wider">
          <span className="[text-shadow:3px_2px_2px_var(--tw-shadow-color)] shadow-indigo-500">ALMA</span>
          </h1>
          <h3 className="leading-7 mt-2 text-l text-[#b9aee8] text-700 tracking-widest [text-shadow:1px_1px_1px_var(--tw-shadow-color)] shadow-indigo-500">
              Explore the <big>complex</big> landscape of your mind through profound analysis of your thoughts and feelings. <br /> 
              Contribute any thought, dream, journey, or emotion to our <big>AI-fueled journal</big>, be it vague or elaborate. <br /> 
              Leveraging advanced NLP algorithms, we organize your thoughts and pinpoint <big>behavioral patterns</big>. <br /> 
              Most importantly, we <big>decode your subconscious</big>, offering understanding of your inner realm. <br />
          </h3>
        </div>
  
        <div className="flex w-full justify-center lg:flex-row flex-col mx-auto items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div className="relative md:mb-4" style={{ width: '300px' }}> 
              {view === ViewAccess.LOGIN ? (
            
                <>
                    <input
                        type="email"
                        name="nota"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider shadow-md shadow-indigo-500/50"
                    />
                    <input
                        type="password"
                        name="nota"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3 w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider shadow-md shadow-indigo-500/50"
                    />
                    <div className="flex w-full justify-center mt-5">
                        <button
                            onClick={handleLogin}
                            className="mr-2 text-white bg-[#313131] border-0 py-2 px-1 focus:outline-none hover:bg-[#212121] rounded text-base font-medium transition duration-300 ease-in-out w-[47%] tracking-wider shadow-md shadow-grey-500/50"
                        >
                            Log In 
                        </button>
        
                    </div>
                        <button
                            onClick={() => setView(ViewAccess.SIGNUP)}
                            className="mr-2 mt-1 text-[#717171] underline transition duration-300 ease-in-out w-[95.5%] tracking-wider"
                        >
                            Sign Up?
                        </button>
                </>
              ) : (
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        className="mb-3 w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider shadow-md shadow-indigo-500/50"
                    />
                    <input
                        type="email"
                        name="nota"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider shadow-md shadow-indigo-500/50"
                    />
                    <input
                        type="password"
                        name="nota"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3 w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider shadow-md shadow-indigo-500/50"
                    />
                    <div className="flex w-full justify-center mt-5">
                        <button
                            onClick={handleSignup}
                            className="mr-2 text-white bg-[#313131] border-0 py-2 px-1 focus:outline-none hover:bg-[#212121] rounded text-base font-medium transition duration-300 ease-in-out w-[60%] tracking-wider"
                        >
                            Create Account 
                        </button>
        
                    </div>
                    <button
                        onClick={() => setView(ViewAccess.LOGIN)}
                        className="mr-2 mt-1 text-[#717171] text-[11px] underline transition duration-300 ease-in-out w-[95.5%] tracking-wider"
                    >
                        Already have an account? 
                    </button>
                </>
              )}

        </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
