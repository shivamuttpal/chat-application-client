import React from 'react';
import './style.css';

import Image from 'next/image';
import img from '../../public/chat.jpg';

export default function Home() {
  return (
    <> 
    <div className="chat">
      <div className="nav flex justify-center">
        <Image src={img} alt="" className="h-[50px] w-[50px]" />
      </div>
      <div className="container max-w-[955px] m-auto h-[60vh] border-black border-2 p-[33px] overflow-y-auto mb-[238px">
        <div className="message right">Harry:Hey How are you?</div>
        <div className="message left ">Rohan:Bhai I am fine </div>
        <div className="message right">Harry:Hey How are you?</div>
        <div className="message left ">Rohan:Bhai I am fine </div>
        <div className="message right">Harry:Hey How are you?</div>
        <div className="message left ">Rohan:Bhai I am fine </div>
        <div className="message right">Harry:Hey How are you?</div>
        <div className="message left ">Rohan:Bhai I am fine </div>
        <div className="message right">Harry:Hey How are you?</div>
        <div className="message left ">Rohan:Bhai I am fine </div>
        <div className="message right">Harry:Hey How are you?</div>
        <div className="message left ">Rohan:Bhai I am fine </div>
      </div>

      <div className="send">
        <form action="#" id="send-container" >
          <input type="text" id="messageInp" name="messageInp" />
          <button type="submit" className='btn'>Send</button>
        </form>

      </div>
    </div>
    </>
  );
}
 