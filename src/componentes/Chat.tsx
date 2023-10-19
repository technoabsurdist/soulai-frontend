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
        <div className="container mx-auto flex flex-wrap items-start my-10 lg:my-20">
                  <h1 className="">Soul Chat</h1>
      <p className="">
        Chat with your own personal AI-based psychological assistant named Soul. <br /> 
        Soul has access to your past entries and can help you reflect on your past experiences and emotions.
      </p>
      <div className="">
        {chatHistory.map((entry, index) => (
          <div key={index} className="">
            {entry.text}
          </div>
        ))}
      </div>
      <div className="">
        <input type="text" className="" value={userInput} onChange={handleInputChange} />
        <button className="" onClick={handleSubmit}>Send</button>
      </div>
        </div>
    );
};

export default Chat;
