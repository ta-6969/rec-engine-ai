# PM Internship Recommendation Engine

A full-stack web application module that integrates with the PM Internship Scheme website to provide AI-based internship recommendations.

## 🏛️ Government Integration Features

- **Seamless Integration**: Designed to integrate with existing PM scheme website
- **Database Connectivity**: Connects to existing PM scheme MongoDB database
- **User Tracking**: Uses existing `userId` from PM scheme for user monitoring
- **Government Styling**: Matches official PM scheme design (Navy Blue, Saffron, Government branding)

## 🚀 Tech Stack

### Frontend (Current - Lovable)
- React 18 + TypeScript
- Tailwind CSS with Government theme
- Shadcn/ui components
- Responsive design

### Backend (To be implemented outside Lovable)
- Node.js + Express + TypeScript
- Prisma ORM for database management
- MongoDB connection to existing PM scheme DB
- RESTful API with proper error handling

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Shadcn UI components
│   ├── Navigation.tsx          # Government-styled header
│   ├── HeroSection.tsx         # Landing page hero
│   ├── ProfileForm.tsx         # Candidate profile form
│   ├── RecommendationResults.tsx # Results display
│   ├── AuthForm.tsx            # Authentication (if needed)
│   └── AdminDashboard.tsx      # Admin analytics
├── pages/
│   ├── Index.tsx               # Landing page
│   ├── Dashboard.tsx           # User dashboard
│   └── NotFound.tsx            # 404 page
├── services/
│   └── api.ts                  # API service layer
├── types/
│   └── api.ts                  # TypeScript interfaces
└── App.tsx                     # Main app component
```

## 🎨 Design System

### Government Theme Colors
- **Primary**: Navy Blue (#1e3a8a) - Official government blue
- **Accent**: Saffron (#ff8f00) - Government accent color
- **Background**: White/Light Gray
- **Typography**: Roboto font family

### Component Styling
- Clean, professional government website aesthetic
- Accessible color contrasts
- Mobile-responsive design
- Consistent spacing and typography

## 🔧 Backend Implementation Guide

### 1. Database Schema (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @unique // From existing PM scheme DB
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  profiles  UserProfile[]
  
  @@map("users")
}

model UserProfile {
  id                String   @id @default(auto()) @map("_id") @db.ObjectId
  userId            String   
  education         String
  skills            String[]
  preferredLocation String
  interests         String[]
  cgpa              Float?
  experience        String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  user              User     @relation(fields: [userId], references: [userId])
  
  @@map("user_profiles")
}

model InternshipSubmission {
  id                String   @id @default(auto()) @map("_id") @db.ObjectId
  userId            String
  profileData       Json
  recommendations   Json
  submittedAt       DateTime @default(now())
  
  @@map("internship_submissions")
}
```

### 2. Environment Variables

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/pm_scheme_db"

# API Configuration
PORT=3001
NODE_ENV=production

# ML Service
ML_SERVICE_URL="http://localhost:5000"
ML_SERVICE_API_KEY="your-ml-api-key"

# CORS
FRONTEND_URL="https://your-pm-scheme-website.gov.in"
```

### 3. Express Server Setup

```typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { recommendationRoutes } from './routes/recommendations';
import { adminRoutes } from './routes/admin';
import { userRoutes } from './routes/users';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
```

### 4. ML Integration Service

```typescript
// src/services/mlService.ts
import axios from 'axios';

interface MLRequest {
  education: string;
  skills: string[];
  location: string;
  interests: string[];
  cgpa?: number;
}

export class MLService {
  private baseURL = process.env.ML_SERVICE_URL;
  private apiKey = process.env.ML_SERVICE_API_KEY;

  async getRecommendations(request: MLRequest) {
    try {
      const response = await axios.post(
        `${this.baseURL}/recommend`,
        request,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 seconds
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('ML Service Error:', error);
      throw new Error('Failed to get recommendations from ML service');
    }
  }
}
```

## 🔌 Integration Steps

### 1. Connect to Existing PM Scheme Database
- Use existing MongoDB connection string
- Map existing user IDs to new recommendation system
- Ensure data privacy and security compliance

### 2. Deploy Backend Service
```bash
# Install dependencies
npm install express prisma @prisma/client cors helmet

# Setup Prisma
npx prisma generate
npx prisma db push

# Start server
npm run start
```

### 3. Frontend Integration
- Update API base URL in `src/services/api.ts`
- Configure CORS for your domain
- Test API connectivity

### 4. ML Service Integration
- Deploy Python Flask/FastAPI service
- Configure API endpoints
- Test recommendation pipeline

## 📊 API Endpoints

### User Endpoints
- `POST /api/recommendations` - Get internship recommendations
- `GET /api/users/:userId/history` - Get user submission history
- `POST /api/users/profile` - Save user profile

### Admin Endpoints
- `GET /api/admin/dashboard` - Get dashboard analytics
- `GET /api/admin/submissions` - Get all submissions (paginated)
- `GET /api/admin/export` - Export data as CSV

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] ML service integration tested
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Health checks working

### Hosting Recommendations
- **Backend**: AWS EC2, Google Cloud Run, or Heroku
- **Database**: MongoDB Atlas or existing PM scheme infrastructure
- **Frontend**: Integrate with existing PM scheme website
- **ML Service**: Separate containerized service

## 🔒 Security Considerations

- Input validation and sanitization
- Rate limiting on API endpoints
- Secure database connections
- Data encryption at rest and in transit
- Regular security audits
- Compliance with government data policies

## 📈 Monitoring & Analytics

- User interaction tracking
- API performance monitoring
- Error logging and alerting
- Database performance metrics
- ML service response times

## 🤝 Contributing

1. Follow government coding standards
2. Test all integrations thoroughly
3. Document API changes
4. Ensure accessibility compliance
5. Maintain security best practices

## 📄 License

This project is developed for the Government of India PM Internship Scheme and follows applicable government software policies.

---

**Note**: This frontend is built with Lovable (React + TypeScript). For the complete full-stack implementation with Node.js + Express backend, deploy the backend service separately and integrate with this frontend through the API service layer.