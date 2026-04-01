'use client';

import { useState } from 'react';
import { Paperclip, CornerDownLeft, ThumbsUp, User, Shield, MessageSquare } from 'lucide-react';
import type { ChatMessage, User as UserType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const Message = ({ msg, currentUser }: { msg: ChatMessage; currentUser: UserType }) => {
    const isCurrentUser = msg.author.id === currentUser.id;
    const authorName = msg.author.anonymous ? 'Anonymous' : msg.author.name;

    return (
        <div className={cn("flex items-start gap-3", isCurrentUser && "justify-end")}>
            {!isCurrentUser && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.author.avatarUrl} alt={authorName} />
                    <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
            )}
            <div className={cn("flex flex-col gap-1", isCurrentUser ? 'items-end' : 'items-start')}>
                <div className={cn(
                    "max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 text-sm",
                    isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{authorName}</span>
                        {msg.author.role === 'teacher' && <Badge variant="secondary" className="bg-accent/20 text-accent"><Shield className="h-3 w-3 mr-1" />Teacher</Badge>}
                        {msg.author.anonymous && <Badge variant="outline"><User className="h-3 w-3 mr-1" />Anonymous</Badge>}
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <span>{msg.upvotes}</span>
                </div>
            </div>
            {isCurrentUser && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
            )}
        </div>
    )
}

export default function ChatWindow({
  roomName,
  messages,
  currentUser,
}: {
  roomName: string;
  messages: ChatMessage[];
  currentUser: UserType;
}) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><MessageSquare /> {roomName}</CardTitle>
      </CardHeader>
      <Separator/>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-22rem)] p-6">
          <div className="space-y-6">
            {messages.map(msg => (
                <Message key={msg.id} msg={msg} currentUser={currentUser} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 border-t bg-background p-4">
        <form className="relative w-full">
          <Input placeholder="Type your message..." />
          <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2">
            <Paperclip className="h-5 w-5" />
          </Button>
        </form>
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
                <Switch id="anonymous-mode" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                <Label htmlFor="anonymous-mode">Post Anonymously</Label>
            </div>
            <Button size="sm">
                Send <CornerDownLeft className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
