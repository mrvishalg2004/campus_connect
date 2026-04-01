'use client';

import ChatWindow from "@/components/chat/ChatWindow";
import { mockChatMessages } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";

export default function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const { user, loading } = useAuth();
  
  // In a real app, you'd fetch room details and messages based on params.roomId
  const roomName = "General Doubts"; // Mocked
  
  if (loading) {
    return <div className="flex h-full items-center justify-center p-8">Loading chat...</div>;
  }

  if (!user) {
    return <div className="flex h-full items-center justify-center p-8 text-muted-foreground">User not found. Please log in again.</div>;
  }

  // Format the authenticated user for the ChatWindow component
  const currentUser = {
    id: user.id || (user as any)._id || 'unknown',
    name: user.name,
    email: user.email || 'student@example.com',
    role: user.role,
    avatarUrl: user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
  };

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
