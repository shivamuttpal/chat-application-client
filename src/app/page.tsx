'use client'
import React, { useEffect, useState, useRef, FormEvent } from 'react';
import Image from 'next/image';
import io, { Socket } from 'socket.io-client';
import img from '../../public/chat.jpg';
import './style.css';

interface Message {
  name: string;
  message: string;
}

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [hasPrompted, setHasPrompted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:8000');
 
    socketRef.current.on('receive', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    }); 

    socketRef.current.on('user-joined', (name: string) => {
      setMessages((prevMessages) => [...prevMessages, { name, message: 'joined the chat' }]);
    });

    socketRef.current.on('left', (name: string) => {
      setMessages((prevMessages) => [...prevMessages, { name, message: 'left the chat' }]);
    });

    if (!userName && !hasPrompted) {
      const name = prompt('Enter your name to join');
      if (name) {
        setUserName(name);
        socketRef.current.emit('new-user-joined', name);
        setHasPrompted(true);
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageInput = e.currentTarget.messageInp as HTMLInputElement;
    const message = messageInput.value.trim();
    if (message && socketRef.current) {
      socketRef.current.emit('send', message);
      setMessages((prevMessages) => [...prevMessages, { name: 'You', message }]);
      messageInput.value = '';
    }
  };

  return (
    <>
      <div className="chat">
        <div className="nav flex justify-center">
          <Image src={img} alt="" className="h-[50px] w-[50px]" />
        </div>
        <div className="container max-w-[955px] m-auto h-[60vh] border-black border-2 p-[33px] overflow-y-auto ">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.name === 'You' ? 'right' : 'left'}`}>
              {msg.name}: {msg.message}
            </div>
          ))}
        </div>
        <div className="send">
          <form onSubmit={sendMessage} className="send-form">
            <input type="text" id="messageInp" name="messageInp" />
            <button type="submit" className="btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
