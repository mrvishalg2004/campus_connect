import ChatWindow from "@/components/chat/ChatWindow";
import { mockChatMessages, mockUsers } from "@/lib/mock-data";

export default function ChatRoomPage({ params }: { params: { roomId: string } }) {
  // In a real app, you'd fetch room details and messages based on params.roomId
  const roomName = "General Doubts"; // Mocked
  const currentUser = mockUsers.find(u => u.role === 'student'); // Mocked

  if (!currentUser) {
    return <div>User not found.</div>
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <ChatWindow
        roomName={roomName}
        messages={mockChatMessages}
        currentUser={currentUser}
      />
    </div>
  );
}
