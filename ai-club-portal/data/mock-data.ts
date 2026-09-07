import type {
  User,
  ClubEvent,
  Registration,
  AttendanceRecord,
  Announcement,
  Project,
  Certificate,
  GalleryItem,
  Resource,
  Activity,
  Report,
} from '@/types'

export const users: User[] = [
  {
    id: 'u1',
    name: 'Dr. Priya Ramesh',
    email: 'priya.ramesh@ckcet.edu',
    role: 'staff',
    department: 'Computer Science',
    designation: 'Faculty Coordinator',
    joinedAt: '2023-06-01',
  },
  {
    id: 'u2',
    name: 'Nithyasri M',
    email: 'arjun.k@ckcet.edu',
    role: 'coordinator',
    department: 'AI & Data Science',
    year: 'IV Year',
    rollNo: 'AI21042',
    joinedAt: '2023-08-12',
    points: 480,
  },
  {
    id: 'u3',
    name: 'Thiraviya P',
    email: 'meera.s@ckcet.edu',
    role: 'member',
    department: 'AI & Data Science',
    year: 'III Year',
    rollNo: 'AI22118',
    joinedAt: '2024-01-20',
    points: 320,
  },
  {
    id: 'u4',
    name: 'Ravi Teja',
    email: 'ravi.t@ckcet.edu',
    role: 'member',
    department: 'Computer Science',
    year: 'II Year',
    rollNo: 'CS22056',
    joinedAt: '2024-02-05',
    points: 210,
  },
  {
    id: 'u5',
    name: 'Nisha Fathima',
    email: 'nisha.f@ckcet.edu',
    role: 'coordinator',
    department: 'Information Technology',
    year: 'III Year',
    rollNo: 'IT21030',
    joinedAt: '2023-09-01',
    points: 510,
  },
  {
    id: 'u6',
    name: 'Karan Vel',
    email: 'karan.v@ckcet.edu',
    role: 'member',
    department: 'AI & Data Science',
    year: 'I Year',
    rollNo: 'AI23090',
    joinedAt: '2024-08-15',
    points: 90,
  },
]

export const events: ClubEvent[] = [
  {
    id: 'e1',
    title: 'Intro to Neural Networks',
    description:
      'Hands-on workshop covering perceptrons, backpropagation and building your first neural net with PyTorch.',
    category: 'workshop',
    status: 'upcoming',
    date: '2026-09-12',
    time: '10:00 AM',
    venue: 'AI Lab, Block C',
    coordinatorId: 'u2',
    capacity: 60,
    registered: 42,
    points: 50,
  },
  {
    id: 'e2',
    title: 'CK AI Hackathon 2026',
    description:
      '24-hour hackathon to build AI solutions for real-world campus problems. Prizes worth 50k.',
    category: 'hackathon',
    status: 'upcoming',
    date: '2026-09-28',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    coordinatorId: 'u5',
    capacity: 120,
    registered: 98,
    points: 150,
  },
  {
    id: 'e3',
    title: 'LLMs & Prompt Engineering',
    description:
      'Seminar on large language models, prompt design patterns and building with the AI SDK.',
    category: 'seminar',
    status: 'ongoing',
    date: '2026-08-28',
    time: '02:00 PM',
    venue: 'Seminar Hall 2',
    coordinatorId: 'u2',
    capacity: 80,
    registered: 76,
    points: 40,
  },
  {
    id: 'e4',
    title: 'Computer Vision Bootcamp',
    description:
      'Three-day bootcamp on image classification, object detection and deploying CV models.',
    category: 'bootcamp',
    status: 'completed',
    date: '2026-07-15',
    time: '10:00 AM',
    venue: 'AI Lab, Block C',
    coordinatorId: 'u5',
    capacity: 50,
    registered: 50,
    points: 100,
  },
  {
    id: 'e5',
    title: 'Ethics in AI — Guest Talk',
    description:
      'Industry guest talk on responsible AI, bias mitigation and the future of regulation.',
    category: 'talk',
    status: 'completed',
    date: '2026-06-30',
    time: '03:30 PM',
    venue: 'Seminar Hall 1',
    coordinatorId: 'u2',
    capacity: 150,
    registered: 132,
    points: 30,
  },
  {
    id: 'e6', title: 'Web Development Workshop', description: 'Practical workshop on building responsive web experiences.',
    category: 'workshop', status: 'completed', date: '2026-08-08', time: '10:00 AM', venue: 'Computer Lab 2',
    coordinatorId: 'u2', capacity: 60, registered: 54, points: 50,
  },
  {
    id: 'e7', title: 'Machine Learning Workshop', description: 'Hands-on introduction to practical machine learning workflows.',
    category: 'workshop', status: 'completed', date: '2026-07-20', time: '10:00 AM', venue: 'AI Lab, Block C',
    coordinatorId: 'u5', capacity: 50, registered: 47, points: 50,
  },
]

export const registrations: Registration[] = [
  { id: 'r1', eventId: 'e1', userId: 'u3', status: 'confirmed', registeredAt: '2026-08-20' },
  { id: 'r2', eventId: 'e2', userId: 'u3', status: 'pending', registeredAt: '2026-08-22' },
  { id: 'r3', eventId: 'e1', userId: 'u4', status: 'confirmed', registeredAt: '2026-08-21' },
  { id: 'r4', eventId: 'e3', userId: 'u3', status: 'confirmed', registeredAt: '2026-08-25' },
  { id: 'r5', eventId: 'e2', userId: 'u6', status: 'waitlisted', registeredAt: '2026-08-26' },
  { id: 'r6', eventId: 'e4', userId: 'u3', status: 'confirmed', registeredAt: '2026-07-01' },
]

export const attendance: AttendanceRecord[] = [
  { id: 'a1', eventId: 'e4', userId: 'u3', present: true, markedAt: '2026-07-15' },
  { id: 'a2', eventId: 'e5', userId: 'u3', present: true, markedAt: '2026-06-30' },
  { id: 'a3', eventId: 'e3', userId: 'u3', present: true, markedAt: '2026-08-28' },
  { id: 'a4', eventId: 'e4', userId: 'u4', present: false, markedAt: '2026-07-15' },
]

export const announcements: Announcement[] = [
  {
    id: 'an1',
    title: 'Hackathon registrations closing soon',
    body: 'Only 22 slots left for CK AI Hackathon 2026. Register before Sept 20 to secure your spot.',
    author: 'Dr. Priya Ramesh',
    priority: 'high',
    createdAt: '2026-08-27',
    audience: 'all',
  },
  {
    id: 'an2',
    title: 'New GPU cluster access for members',
    body: 'Club members can now request GPU compute for approved projects. Submit via the Projects tab.',
    author: 'Nithyasri M',
    priority: 'normal',
    createdAt: '2026-08-24',
    audience: ['member', 'coordinator'],
  },
  {
    id: 'an3',
    title: 'Weekly paper reading — Fridays 5 PM',
    body: 'Join us every Friday to discuss a trending ML paper. This week: Diffusion Transformers.',
    author: 'Nisha Fathima',
    priority: 'low',
    createdAt: '2026-08-21',
    audience: 'all',
  },
]

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Campus Navigator AI',
    description: 'An assistant that answers campus queries using a RAG pipeline over college data.',
    members: ['u3', 'u4'],
    techStack: ['Next.js', 'Python', 'FAISS'],
    status: 'in-review',
    submittedAt: '2026-08-18',
    repoUrl: 'https://github.com/ck-ai/campus-navigator',
  },
  {
    id: 'p2',
    title: 'Attendance via Face Recognition',
    description: 'Automated attendance system using a lightweight CV model on edge devices.',
    members: ['u6'],
    techStack: ['OpenCV', 'TensorFlow Lite'],
    status: 'approved',
    submittedAt: '2026-07-30',
  },
  {
    id: 'p3',
    title: 'Crop Disease Classifier',
    description: 'Mobile-first classifier for local crop diseases from leaf images.',
    members: ['u3'],
    techStack: ['PyTorch', 'Flutter'],
    status: 'submitted',
    submittedAt: '2026-08-26',
  },
]

const legacyCertificates = [
  {
    id: 'c1',
    title: 'Computer Vision Bootcamp — Completion',
    eventId: 'e4',
    userId: 'u3',
    issuedAt: '2026-07-18',
    credentialId: 'CK-AI-CVB-0031',
  },
  {
    id: 'c2',
    title: 'Ethics in AI — Participation',
    eventId: 'e5',
    userId: 'u3',
    issuedAt: '2026-07-02',
    credentialId: 'CK-AI-ETH-0112',
  },
]

export const certificates: Certificate[] = [
  {
    id: 'c1', studentId: 'u3', studentName: 'Thiraviya P', studentYear: 'III Year',
    eventId: 'e2', eventName: 'AI Hackathon 2026', certificateType: 'Prize Winner', rank: '1st Prize',
    certificateTitle: 'Certificate of Excellence', issueDate: '2026-08-20', status: 'Issued', credentialId: 'CK-AI-HACK-0031',
  },
  {
    id: 'c2', studentId: 'u2', studentName: 'Nithyasri M', studentYear: 'IV Year',
    eventId: 'e6', eventName: 'Web Development Workshop', certificateType: 'Participant',
    certificateTitle: 'Certificate of Participation', issueDate: '2026-08-12', status: 'Issued', credentialId: 'CK-AI-WEB-0112',
  },
  {
    id: 'c3', studentId: 'u3', studentName: 'Thiraviya P', studentYear: 'III Year',
    eventId: 'e7', eventName: 'Machine Learning Workshop', certificateType: 'Participant',
    certificateTitle: 'Certificate of Participation', issueDate: '2026-07-25', status: 'Issued', credentialId: 'CK-AI-MLW-0078',
  },
]

export const gallery: GalleryItem[] = [
  { id: 'g1', title: 'CV Bootcamp Day 1', eventId: 'e4', image: '/gallery/cv-bootcamp.png', date: '2026-07-15' },
  { id: 'g2', title: 'Ethics Guest Talk', eventId: 'e5', image: '/gallery/ethics-talk.png', date: '2026-06-30' },
  { id: 'g3', title: 'Team Project Showcase', image: '/gallery/showcase.png', date: '2026-05-20' },
  { id: 'g4', title: 'Prompt Engineering Session', eventId: 'e3', image: '/gallery/prompt-session.png', date: '2026-08-28' },
]

export const resources: Resource[] = [
  { id: 'res1', title: 'Deep Learning Specialization Notes', type: 'pdf', url: '#', addedAt: '2026-08-10', tags: ['deep-learning', 'notes'] },
  { id: 'res2', title: 'Intro to Transformers (Video)', type: 'video', url: '#', addedAt: '2026-08-05', tags: ['nlp', 'transformers'] },
  { id: 'res3', title: 'Kaggle Titanic Starter Notebook', type: 'notebook', url: '#', addedAt: '2026-07-28', tags: ['ml', 'starter'] },
  { id: 'res4', title: 'PyTorch Official Docs', type: 'link', url: '#', addedAt: '2026-07-20', tags: ['pytorch', 'docs'] },
]

export const activities: Activity[] = [
  { id: 'act1', actor: 'Thiraviya P', action: 'registered for', target: 'CK AI Hackathon 2026', timestamp: '2 hours ago' },
  { id: 'act2', actor: 'Nithyasri M', action: 'published', target: 'Intro to Neural Networks', timestamp: '5 hours ago' },
  { id: 'act3', actor: 'Karan Vel', action: 'submitted project', target: 'Attendance via Face Recognition', timestamp: '1 day ago' },
  { id: 'act4', actor: 'Dr. Priya Ramesh', action: 'approved', target: 'Crop Disease Classifier', timestamp: '2 days ago' },
  { id: 'act5', actor: 'Nisha Fathima', action: 'posted announcement', target: 'Weekly paper reading', timestamp: '3 days ago' },
]

export const reports: Report[] = [
  { id: 'rep1', title: 'Monthly Engagement Report', period: 'August 2026', generatedAt: '2026-08-27', summary: 'Member engagement up 18% driven by hackathon buzz.', metric: '+18%' },
  { id: 'rep2', title: 'Event Attendance Summary', period: 'Q2 2026', generatedAt: '2026-07-05', summary: 'Average attendance rate across 6 events.', metric: '87%' },
  { id: 'rep3', title: 'Project Submissions', period: 'August 2026', generatedAt: '2026-08-27', summary: 'New AI projects submitted this month.', metric: '12' },
]
