import { useState } from "react";

interface LoginProps {
    handleUserLogin: (id: string) => void;
}

const Login = ({ handleUserLogin }: LoginProps) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); 

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
                console.log('login success');
                localStorage.setItem('userId', data.userId);
                handleUserLogin(data.userId);
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
                body: JSON.stringify({ email, password }),
            });

            if (signupResponse.ok) {
                // Automatically log the user in after a successful signup
                const loginResponse = await fetch('https://soul-backend-b87052aa2595.herokuapp.com/login', {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                
                const data = await loginResponse.json();
                if (loginResponse.ok) {
                    console.log('Signup and login success');
                    console.log('login success');
                    localStorage.setItem('userId', data.userId);
                    handleUserLogin(data.userId);
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
          Soul
          </h1>
          <h3 className="leading-7 mt-2 text-l text-[#b9aee8] text-700 tracking-widest">
              Explore the <big>complex</big> landscape of your mind through profound analysis of your thoughts and feelings. <br /> 
              Contribute any thought, dream, journey, or emotion to our <big>AI-fueled journal</big>, be it vague or elaborate. <br /> 
              Leveraging advanced NLP algorithms, we organize your thoughts and pinpoint <big>behavioral patterns</big>. <br /> 
              Most importantly, we <big>decode your subconscious</big>, offering understanding of your inner realm. <br />
          </h3>
        </div>
  
        <div className="flex w-full justify-center lg:flex-row flex-col mx-auto items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div className="relative md:mb-4" style={{ width: '300px' }}> 
              <input
                  type="email"
                  name="nota"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider"
              />
              <input
                  type="password"
                  name="nota"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-3 w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus: focus:ring-2 focus:ring-[#2fa0d6] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider"
              />
              <div className="flex w-full justify-center mt-5">
                <button
                    onClick={handleLogin}
                    className="mr-2 text-white bg-[#313131] border-0 py-2 px-3 focus:outline-none hover:bg-[#212121] rounded text-base font-medium transition duration-300 ease-in-out w-[47%] tracking-wider"
                >
                    Log In 
                </button>
                <button
                    onClick={handleSignup}
                    className="ml-2 text-white bg-[#313131] border-0 py-2 px-3 focus:outline-none hover:bg-[#212121] rounded text-base font-medium transition duration-300 ease-in-out w-[47%] tracking-wider"
                >
                    Sign Up 
                </button>
 
              </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
