import { SetStateAction, useEffect, useState } from "react";
import { ChatMessage } from "../constants";

const Chat = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
  
    useEffect(() => {
      const fetchChatHistory = async () => {
        const response = await fetch('http://localhost:5001/chat/history', {
          credentials: 'include',
          method: 'GET',
        });
        const data = await response.json();
        setChatHistory(data);
      };
    
      fetchChatHistory();
    }, []);
    
    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setUserInput(e.target.value);
    };
  
    const handleSubmit = async () => {
      setChatHistory([...chatHistory, { type: 'user', text: userInput }]);
      
      const response = await fetch('http://localhost:5001/chat', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });
      const data = await response.json();
      const modelReply = data.model_response;
    
      setChatHistory([...chatHistory, { type: 'user', text: userInput }, { type: 'model', text: modelReply }]);
      
      setUserInput('');
    };

    return (
        <div className="container px-5 pt-24 mx-auto flex flex-wrap">
            <div className="flex flex-col text-center w-full mb-5 md:mb-20">
                <h1 className="text-6xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-2xl">Soul Chat</h1>
                <p className="text-s text-[#b9aee8] text-600 tracking-widest font-bold uppercase">
                    Chat with your own personal AI-based psychological assistant named Soul. <br /> 
                    Soul has access to your past entries and can help you reflect on your past experiences and emotions.
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                {chatHistory.map((entry, index) => (
                    <div 
                    key={index} 
                    className={`p-3 p-5 rounded text-zinc-100 ${entry.type === 'user' ? 'bg-zinc-700 bg-opacity-40' : 'bg-[#b9aee8] bg-opacity-50'}`}
                    >
                    {entry.text}
                    </div>
                ))}
            </div>

            <div className="flex w-full lg:flex-row flex-col mx-auto items-end sm:space-x-4 sm:space-y-0 space-y-4 mt-5">
                <div className="relative flex-grow w-full">
                    <input 
                        type="text" 
                        className="w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus:ring-2 focus:ring-[#b9aee8] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider" 
                        value={userInput} 
                        onChange={handleInputChange} 
                    />
                </div>
                <button 
                    className="text-white bg-[#b9aee8] border-0 py-2 px-6 focus:outline-none hover:bg-[#2fa0d6] rounded text-base font-bold transition duration-300 ease-in-out tracking-wider"
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
