import React, { useEffect, useRef, useState } from 'react';
import Draggable from "react-draggable";
import { useSocket } from "../config/socketContext";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useNavigate } from 'react-router-dom';



function UniversalChats() {
    const { messages, sendMessage, sendTypingStatus, typingStatus } = useSocket();
    const navigate = useNavigate();


    const chatList = [
        { id: 1, name: "Alice", message: "Hey there!" },
        { id: 2, name: "Bob", message: "What's up?" },
        { id: 3, name: "Charlie", message: "Hello!" },
        { id: 4, name: "David", message: "How are you?" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
        { id: 5, name: "Eve", message: "Good morning!" },
    ];

    const messagess = [
        {
            id: 1,
            name: "Alice",
            messages: [
                { sentBy: "user", id: "12345", text: "Hey there!" },
                { sentBy: "us", id: "123456789", text: "How we can help you!" },
                { sentBy: "user", id: "12345", text: "You can not understand, goodbye!" },
                { sentBy: "us", id: "123456789", text: "How we can help you!" },
            ],
        },
        {
            id: 2,
            name: "Bob",
            messages: [
                { sentBy: "user", id: "54321", text: "What's up?" },
                { sentBy: "us", id: "987654321", text: "How can I assist you?" },
            ],
        },
        {
            id: 3,
            name: "Charlie",
            messages: [
                { sentBy: "user", id: "11223", text: "Hello!" },
                { sentBy: "us", id: "445566", text: "Hey! How’s it going?" },
            ],
        },
        {
            id: 4,
            name: "David",
            messages: [
                { sentBy: "user", id: "77889", text: "How are you?" },
                { sentBy: "us", id: "990011", text: "I'm good, what about you?" },
            ],
        },
        {
            id: 5,
            name: "Eve",
            messages: [
                { sentBy: "user", id: "554433", text: "Good morning!" },
                { sentBy: "us", id: "223344", text: "Good morning! How can I help you today?" },
            ],
        },
    ];


    const [showUniversalChatPopup, setShowUniversalChatPopup] = useState(false);

    const toggleUniversalChatPopup = () => {
        if (isMobileOrTablet) {
            navigate('/chats');
        } else {
            setShowUniversalChatPopup(!showUniversalChatPopup)
        }
    }

    const [openChats, setOpenChats] = useState([]);
    const [message, setMessage] = useState('');
    const chatRefs = useRef({});

    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileOrTablet(window.innerWidth <= 1024); // Adjust breakpoint as needed
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // const openChat = (chat) => {
    //     setOpenChats((prevChats) => {
    //         let updatedChats = [...prevChats, chat];
    //         if (updatedChats.length > 4) updatedChats.shift(); // Remove first if more than 4
    //         return updatedChats;
    //     });
    // };

    const openChat = (chat) => {
        setOpenChats((prevChats) => {
            if (prevChats.some((c) => c.id === chat.id)) return prevChats; // Prevent duplicate chats
            let updatedChats = [...prevChats, chat];
            if (updatedChats.length > 4) updatedChats.shift(); // Remove first if more than 4
            return updatedChats;
        });
    };

    const closeChat = (chatId) => {
        setOpenChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    };
    const handleInputChange = (e) => {
        setMessage(e.target.value);
        // sendTypingStatus(user); // Notify others that this user is typing
    };

    // Handle send message
    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage({ text: message, timestamp: new Date() });
            setMessage(""); // Clear input field
        }
    };


    console.log("opppo", messagess.find((n) => n.id === 1))
    return (
        <div >
            <div className='fixed z-50 bottom-5 right-5 w-12 h-12 rounded-full p-3 hover:p-2 cursor-pointer border-2 transition-all ease-in-out duration-300 bg-secondary border-primary' onClick={toggleUniversalChatPopup}>
                <img src='/chatBox.png' className='w-full h-full object-contain' />
                <span class="absolute flex size-3 top-0 left-0">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
                </span>
            </div>
            <div className="">
                {/* Chat List */}
                {showUniversalChatPopup && (
                    <div className="relative">
                        {/* Chat List */}
                        <div className="absolute bottom-20 right-5 w-56 h-fit max-h-[500px] bg-secondary border rounded-sm border-secondary py-4 px-4 overflow-y-scroll hide-scrollbar">
                            <div className='flex flex-col gap-2'>
                                {chatList.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className="px-4 flex items-center py-1 bg-primary rounded-sm w-full cursor-pointer"
                                        onClick={() => openChat(chat)}
                                    >
                                        <img src="/defaultprofile.png" alt="profile" className="w-6 h-6 rounded-full object-cover mr-4" />
                                        <div className='text-left'>
                                            <p className="text-sm text-secondary font-semibold">{chat.name}</p>
                                            <p className="text-xs text-secondary">{chat.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Open Chat Windows */}
                        <div className="fixed z-50 bottom-20 right-64 flex gap-2">
                            {openChats.map((chat) => {
                                if (!chatRefs.current[chat.id]) {
                                    chatRefs.current[chat.id] = React.createRef();
                                }
                                return (
                                    <Draggable key={chat.id} nodeRef={chatRefs.current[chat.id]}>
                                        <div ref={chatRefs.current[chat.id]} className="z-50 w-64 h-80 bg-[#fffdfc] border border-secondary rounded-sm py-2 px-4 shadow-lg relative">
                                            <button
                                                className="absolute top-2 right-2 text-primary hover:text-secondary"
                                                onClick={() => closeChat(chat.id)}
                                            >
                                                ✖
                                            </button>
                                            <div className='flex gap-5 items-center h-[10%]'>
                                                <div>
                                                    <img src="/defaultprofile.png" alt="profile" className="w-6 h-6 rounded-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-left text-secondary">{chat.name}</p>
                                                </div>
                                            </div>
                                            {/* <p className='text-left '>{chat.message}</p> */}
                                            <div className='flex flex-col gap-2 h-[75%] overflow-scroll hide-scrollbar py-4'>
                                                {messagess.find(m => m.id === chat.id)?.messages?.map((msg, index) => (
                                                    <div className={`w-full flex ${msg.sentBy === 'user' ? 'justify-start' : 'justify-end'}`}>
                                                        <div
                                                            key={msg.id + index}
                                                            className={`p-2 max-w-[80%] text-sm  flex flex-col gap-5
                                                             ${msg.sentBy === 'user' ? 'bg-primary text-left text-black rounded-tl-lg rounded-tr-lg rounded-br-lg ' : 'bg-gray-300 text-black text-right rounded-tl-lg rounded-tr-lg rounded-bl-lg '}`}
                                                        >
                                                            {msg.text}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="absolute flex items-center bottom-0  border-primary h-[15%] w-full justify-start gap-2">
                                                <input type="text" value={message} onChange={handleInputChange} placeholder="Type a message..." className="py-1 text-xs px-3 border border-secondary outline-none" />
                                                <button onClick={handleSendMessage} className="px-3 py-1 bg-secondary hover:bg-[#393939] text-xs text-primary">Send</button>
                                            </div>
                                        </div>
                                    </Draggable>
                                );
                            })}
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default UniversalChats