// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/Input";
// import { Send } from "lucide-react";
// import { io } from "socket.io-client";

// // Define types for the props
// interface GroupChatProps {
//   currentUser: { _id: string; email: string }; // Current user information
//   groupId: string; // ID of the group chat
// }

// interface Message {
//   sender: string;
//   message: string;
// }

// const socket = io("http://localhost:5000");

// export default function GroupChat({ currentUser, groupId }: GroupChatProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   useEffect(() => {
//     // Join the group room for real-time communication
//     socket.emit("joinRoom", groupId);

//     // Listen for incoming group messages
//     socket.on("receiveGroupMessage", (messageData: Message) => {
//       setMessages((prevMessages) => [...prevMessages, messageData]);
//     });

//     return () => {
//       socket.off("receiveGroupMessage");
//     };
//   }, [groupId]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData: Message = {
//       sender: currentUser._id,
//       message: newMessage,
//     };

//     // Emit message to the group chat
//     socket.emit("sendMessage", messageData);

//     setMessages((prevMessages) => [...prevMessages, messageData]);
//     setNewMessage("");
//   };

//   return (
//     <div className="group-chat-container">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.sender === currentUser._id ? "sent" : "received"}`}
//           >
//             <span>{msg.sender === currentUser._id ? "You" : "Group Member"}: {msg.message}</span>
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
