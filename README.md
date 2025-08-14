# Aura - Calm Project Tracker

A minimalist, focused project management tool designed for solo creative professionals who value focus over features.

## 🌟 Features

### Core Philosophy: Calm Technology
- **Minimal attention required**: Clean, uncluttered interface
- **Creates calm**: Muted colors, generous whitespace, gentle interactions
- **Subtle notifications**: No aggressive alerts, just gentle nudges
- **Human-focused**: Amplifies creativity and deep work

### Key Features
1. **Focus Dashboard** - See today's priority, up next tasks, and week ahead
2. **Project Streams** - Organize work into flowing, chronological streams
3. **Clarity View** - Global overview of all upcoming deadlines
4. **Gentle Nudges** - Calm notifications and weekly digests

## 🛠 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI Library**: Shadcn/ui with custom calm styling
- **Database**: Prisma ORM with SQLite
- **Authentication**: Clerk (custom styled to match Aura aesthetic)
- **Styling**: Tailwind CSS with custom calm design system
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   cd aura
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Clerk authentication keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── dashboard/         # Protected dashboard routes
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/            # React components
│   ├── ui/               # Base UI components (Shadcn)
│   ├── focus-dashboard.tsx
│   ├── streams-view.tsx
│   ├── clarity-view.tsx
│   └── ...
├── lib/                  # Utilities and configurations
│   ├── db.ts            # Prisma client
│   ├── actions.ts       # Server actions
│   └── utils.ts
└── prisma/
    └── schema.prisma     # Database schema
```

## 🎨 Design System

### Colors (Calm Palette)
- **Primary**: Stone/Gray tones (#1c1917, #78716c, #f5f5f4)
- **Backgrounds**: Warm whites and light grays
- **Accents**: Subtle colors for streams and status

### Typography
- **Font**: Inter (clean, readable)
- **Hierarchy**: Light weights, generous spacing
- **Contrast**: Sufficient but not harsh

### Interactions
- **Animations**: Gentle, fade-in effects
- **Hover states**: Subtle elevation and color changes
- **Transitions**: Smooth, 300ms ease timing

## 🗄 Database Schema

### Core Models
- **User**: Clerk integration, basic profile
- **Stream**: Project containers with custom colors
- **Task**: Simple 3-state system (TODO, IN_PROGRESS, DONE)

### Key Relationships
- User → Multiple Streams
- Stream → Multiple Tasks
- Task → Optional Stream association

## 🔧 Development

### Adding New Features
1. Follow the calm technology principles
2. Prioritize subtraction over addition
3. Test for minimal cognitive load
4. Ensure mobile responsiveness

### Database Changes
```bash
# After modifying prisma/schema.prisma
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

### Building for Production
```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production
```env
DATABASE_URL="your_production_database_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

## 🎯 Usage Guide

### Creating Your First Stream
1. Navigate to "Streams" in the dashboard
2. Click "New Stream"
3. Choose a name, description, and color
4. Start adding tasks

### Managing Tasks
- **Simple states**: Todo → In Progress → Done
- **Due dates**: Optional, shown with gentle indicators
- **Notes**: Add context without clutter
- **Priority**: Automatic ordering by due date and creation time

### Focus Dashboard
- **Today's Priority**: One main task to focus on
- **Up Next**: Your immediate queue (5 tasks max)
- **Week Ahead**: Upcoming deadlines in calendar format

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core CRUD functionality
- ✅ Authentication with Clerk
- ✅ Basic calm design system
- ✅ Responsive layout

### Phase 2 (Next)
- [ ] Gentle notifications system
- [ ] Weekly email digest
- [ ] Drag & drop task reordering
- [ ] Stream templates

### Phase 3 (Future)
- [ ] Gentle analytics (focus metrics)
- [ ] Mobile app (React Native)
- [ ] Calm API for integrations
- [ ] Premium calm features

## 🤝 Contributing

This project follows calm technology principles. When contributing:

1. **Subtract before adding**: Can this be simplified?
2. **Attention-conscious**: Does this demand unnecessary attention?
3. **Calm-first**: Does this create or reduce anxiety?
4. **Focus-preserving**: Does this support deep work?

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Inspired by Cal Newport's "Digital Minimalism"
- Calm Technology principles by Mark Weiser
- Designed for the solo creative professional community

---

*Aura: Where productivity meets peace of mind* ✨
