// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/Input";
// import { Send } from "lucide-react";
// import { io } from "socket.io-client";

// // Define types for the props
// interface UserChatProps {
//   currentUser: { _id: string; email: string }; // Current user information
//   receiver: string; // ID of the receiver
// }

// interface Message {
//   sender: string;
//   receiver: string;
//   message: string;
// }

// const socket = io("http://localhost:5000");

// export default function UserChat({ currentUser, receiver }: UserChatProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   useEffect(() => {
//     // Join the socket room based on receiver's ID for real-time messages
//     socket.emit("joinRoom", receiver);

//     // Listen for new messages
//     socket.on("receiveMessage", (messageData: Message) => {
//       setMessages((prevMessages) => [...prevMessages, messageData]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [receiver]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData: Message = {
//       sender: currentUser._id,
//       receiver,
//       message: newMessage,
//     };

//     // Emit the message to the server
//     socket.emit("sendMessage", messageData);

//     setMessages((prevMessages) => [...prevMessages, messageData]);
//     setNewMessage("");
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === currentUser._id ? "sent" : "received"}`}>
//             <span>{msg.sender === currentUser._id ? "You" : "Friend"}: {msg.message}</span>
//           </div>
//         ))}
//       </div>

//       <div className="message-input">
//         <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
//         <Button onClick={sendMessage}>
//           <Send size={16} />
//         </Button>
//       </div>
//     </div>
//   );
// }
