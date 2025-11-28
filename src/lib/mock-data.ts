
import type { User, Attendance, Mark, ChatMessage, Notification, LibraryResource } from '@/types';

// Mock users are now only for initial reference, auth is handled by Firebase
export const mockUsers: User[] = [];

export const mockStudentDashboard = {
  attendance: [
    { month: 'Jan', value: 92 },
    { month: 'Feb', value: 88 },
    { month: 'Mar', value: 95 },
    { month: 'Apr', value: 91 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 93 },
  ] as Attendance[],
  marks: [
    { assessment: 'Quiz 1', score: 8, total: 10 },
    { assessment: 'Mid-Term', score: 78, total: 100 },
    { assessment: 'Assignment 1', score: 18, total: 20 },
    { assessment: 'Quiz 2', score: 9, total: 10 },
    { assessment: 'Final Exam', score: 85, total: 100 },
  ] as Mark[],
};

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    author: { id: '5', name: 'Anonymous', role: 'student', avatarUrl: 'https://picsum.photos/seed/anon/100/100', anonymous: true },
    text: "Can someone explain the difference between pass-by-value and pass-by-reference in JavaScript? I'm a bit confused.",
    attachments: [],
    upvotes: 5,
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    replies: [
        {
            id: 'reply1',
            author: { id: '2', name: 'Dr. Evelyn Reed', role: 'teacher', avatarUrl: 'https://picsum.photos/seed/teacher1/100/100', anonymous: false },
            text: "Great question! In JavaScript, primitive types (like numbers, strings, booleans) are passed by value, meaning a copy is made. Objects and arrays are passed by reference, so you're working with a pointer to the original object.",
            attachments: [],
            upvotes: 8,
            timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
            replies: []
        }
    ]
  },
  {
    id: 'msg2',
    author: { id: '1', name: 'Alex Johnson', role: 'student', avatarUrl: 'https://picsum.photos/seed/student1/100/100', anonymous: false },
    text: "Here's a screenshot of the error I'm getting with the latest assignment. Any ideas?",
    attachments: [{ name: 'error-screenshot.png', url: 'https://picsum.photos/seed/error/400/200', type: 'image' }],
    upvotes: 2,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    replies: []
  },
  {
    id: 'msg3',
    author: { id: '5', name: 'Anonymous', role: 'student', avatarUrl: 'https://picsum.photos/seed/anon2/100/100', anonymous: true },
    text: "Is the deadline for the physics lab report extended? I saw a note on the portal.",
    attachments: [],
    upvotes: 11,
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    replies: []
  }
];

export const mockNotifications: Notification[] = [
    { id: 'n1', text: 'Your assignment "Quantum Physics Intro" has been graded.', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), read: false },
    { id: 'n2', text: 'New materials have been uploaded for "Advanced Algorithms".', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), read: false },
    { id: 'n3', text: 'Reminder: Mid-term exams start next week.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), read: true },
    { id: 'n4', text: 'A new message was posted in the "General Doubts" chat.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), read: true },
];

export const mockLibraryResources: LibraryResource[] = [
    { id: 'res1', title: 'Introduction to Quantum Computing', author: 'Dr. Evelyn Reed', type: 'pdf', tags: ['physics', 'quantum', 'notes'], url: '#' },
    { id: 'res2', title: 'Data Structures and Algorithms', author: 'Prof. John Smith', type: 'video', tags: ['cs', 'dsa', 'lecture'], url: '#' },
    { id: 'res3', title: 'A Brief History of Time', author: 'Stephen Hawking', type: 'paper', tags: ['cosmology', 'physics'], url: '#' },
    { id: 'res4', title: 'Machine Learning Yearning', author: 'Andrew Ng', type: 'pdf', tags: ['cs', 'ml', 'ai'], url: '#' },
    { id: 'res5', title: 'Organic Chemistry Fundamentals', author: 'Dr. Evelyn Reed', type: 'pdf', tags: ['chemistry', 'organic'], url: '#' },
    { id: 'res6', title: 'The Art of Computer Programming', author: 'Donald Knuth', type: 'paper', tags: ['cs', 'algorithms', 'classic'], url: '#' }
];
