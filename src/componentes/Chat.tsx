import { SetStateAction, useEffect, useState } from "react";
import { ChatMessage, View } from "../constants";

interface ChatProps {
    view: View;
    handleViewNotes: () => void;
    handleViewChat: () => void;
}

const Chat = ({ view, handleViewNotes, handleViewChat}: ChatProps) => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
  
    useEffect(() => {
      const fetchChatHistory = async () => {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`https://soul-backend-b87052aa2595.herokuapp.com/chat/history/${userId}`, {
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
        const newUserInput = { type: 'user', text: userInput };
        const newChatHistory = [...chatHistory, newUserInput];

        const lastFiveMessages = newChatHistory.slice(-5) as ChatMessage[];
    
        setChatHistory(lastFiveMessages);
    
        const userId = localStorage.getItem('userId');
        const response = await fetch('https://soul-backend-b87052aa2595.herokuapp.com/chat', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, text: userInput }),
        });
        const data = await response.json();
        const modelReply = { type: 'model', text: data.model_response };
    
        const updatedChatHistory = [...lastFiveMessages, modelReply].slice(-5) as ChatMessage[];
    
        setChatHistory(updatedChatHistory);
        setUserInput('');
      };

    return (
        <div className="container px-5 pt-24 mx-auto flex flex-wrap">
            <div className="flex flex-col text-center w-full mb-5 md:mb-20">
                <div className="mb-5">
                    <button
                        onClick={handleViewNotes}
                        className={`mx-2 text-white bg-[#313131] border-0 py-2 px-6 focus:outline-none rounded text-base font-bold transition duration-300 ease-in-out tracking-wider ${view === View.NOTES ? "bg-[#212121]" : ""}`}
                    >
                        📝 Notes 
                    </button>
                    <button
                        onClick={handleViewChat}
                        className={`mx-2 text-white bg-[#313131] border-0 py-2 px-6 focus:outline-none rounded text-base font-bold transition duration-300 ease-in-out tracking-wider ${view === View.CHAT ? "bg-[#b9aee8] shadow-md shadow-indigo-500/50" : ""}`}
                    >
                        💬 Chat
                    </button>
                </div>
                <p className="mt-10 text-s text-[#b9aee8] text-600 tracking-widest font-bold uppercase tracking-widest [text-shadow:1px_1px_1px_var(--tw-shadow-color)] shadow-indigo-500">
                    Chat with your own personal AI-based psychological assistant named Soul. <br /> 
                    Soul has access to your past entries and can help you reflect on your past experiences and emotions.
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                {chatHistory.map((entry, index) => (
                    <div 
                    key={index} 
                    className={`inline-block p-3 p-5 rounded text-zinc-100 ${entry.type === 'user' ? 'bg-zinc-700 bg-opacity-40' : 'bg-[#b9aee8] bg-opacity-50'}`}
                    >
                    {entry.text}
                    </div>
                ))}
            </div>

            <div className="flex w-full lg:flex-row flex-col mx-auto items-end sm:space-x-4 sm:space-y-0 space-y-4 mt-5">
                <div className="relative flex-grow w-full">
                    <input 
                        type="text" 
                        placeholder="Send a message to Soul"
                        className="w-full bg-zinc-700 bg-opacity-40 rounded border border-[#b9aee8] focus:ring-2 focus:ring-[#b9aee8] focus:bg-transparent text-base outline-none text-zinc-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out tracking-wider shadow-md shadow-indigo-500/50" 
                        value={userInput} 
                        onChange={handleInputChange} 
                    />
                </div>
                <button 
                    className="text-white bg-[#b9aee8] border-0 py-2 px-6 focus:outline-none rounded text-base font-bold transition duration-300 ease-in-out tracking-wider shadow-lg shadow-indigo-500/50"
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
