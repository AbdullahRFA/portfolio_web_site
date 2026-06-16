import { IGuestbookEntry } from '../types/guestbook';

export const mockGuestbookEntries: IGuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Sarah Jenkins',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    message: 'Impressed by your clean MERN architecture and your Bento grid layout choice! Let’s set up a call next Tuesday.',
    date: 'June 14, 2026'
  },
  {
    id: 'gb-2',
    name: 'Abdullah Nazmus-Sakib',
    avatar: '/profile_pic_2.jpg',
    message: 'Thanks for stopping by, Sarah! Appreciate the feedback. Looking forward to connecting.',
    date: 'June 14, 2026',
    isOwner: true
  },
  {
    id: 'gb-3',
    name: 'Alex Rivera',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    message: 'The ScrollSpy navigation transitions are incredibly smooth. Solid full-stack portfolio baseline!',
    date: 'May 30, 2026'
  }
];