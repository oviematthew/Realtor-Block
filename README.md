# Realtor Block

A modern, full-stack real estate platform built with Next.js that allows users to browse, search, and manage property listings with interactive maps and comprehensive filtering options.

## ✨ Features

- **User Authentication**: Secure sign-up/sign-in with Clerk
- **Property Management**: Add, edit, and view real estate listings
- **Interactive Maps**: Google Maps integration for property locations
- **Advanced Search**: Address-based search with Google Places API
- **Property Filtering**: Filter by bedrooms, bathrooms, parking, property type
- **Image Upload**: Upload and manage property photos
- **Agent Profiles**: View and manage real estate agent information
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live notifications and data updates

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 
- **Styling**: Tailwind CSS
- **UI Components**: ShadCn
- **Icons**: Lucide React
- **Forms**: Formik
- **Notifications**: Sonner
- **Maps**: Google Maps API

### Backend & Services
- **Authentication**: Clerk
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **APIs**: Google Maps API, Google Places API

### Development Tools
- **Language**: JavaScript/TypeScript
- **Linting**: ESLint
- **Package Manager**: npm

## 📋 Prerequisites

You'll also need accounts for:
- [Clerk](https://clerk.com) - Authentication
- [Supabase](https://supabase.com) - Database and Storage
- [Google Cloud Platform](https://cloud.google.com) - Maps and Places APIs

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google APIs
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key
```


## 🔐 Authentication (Clerk)

This project uses Clerk for user authentication, providing:

### Features
- Email/password authentication
- Social login options
- User profile management
- Session management
- Protected routes

### Setup
1. Create a [Clerk account](https://clerk.com)
2. Create a new application
3. Get your publishable key and secret key from the dashboard
4. Add the keys to your `.env.local` file
5. Configure redirect URLs in Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-out URL: `/sign-in`

### Implementation
- Middleware protection for routes
- User context available throughout the app
- Automatic redirects for unauthenticated users

## 🗄️ Database (Supabase PostgreSQL)

The application uses Supabase PostgreSQL for data storage with the following structure:

### Database Schema

#### `listing` Table
```sql
CREATE TABLE listing (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  coordinates JSONB,
  createdBy TEXT NOT NULL,
  bedroom INTEGER DEFAULT 0,
  bathroom INTEGER DEFAULT 0,
  parking INTEGER DEFAULT 0,
  propertyType TEXT,
  type TEXT,
  active BOOLEAN DEFAULT true,
  agentName TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  utilities JSONB
);
```

#### `listingImages` Table
```sql
CREATE TABLE listingImages (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES listing(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Setup
1. Create a [Supabase account](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from the dashboard
4. Add the credentials to your `.env.local` file
5. Run the SQL commands above in the Supabase SQL editor
6. Set up Row Level Security (RLS) policies as needed


## 📁 Storage (Supabase Storage)

Supabase Storage is used for managing property images:

### Setup
1. In your Supabase dashboard, go to Storage
2. Create a bucket named `listingimages`
3. Configure bucket policies for public access to images
4. Set up appropriate upload restrictions (file size, file types)

### Storage Policies
```sql
-- Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'listingimages');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'listingimages' AND auth.role() = 'authenticated');
```

### Features
- Image upload with unique filenames
- Public URL generation
- Automatic image optimization
- Secure file management

## 🗺️ Google APIs Integration

The application integrates with Google APIs for location services:

### Google Maps API
- Interactive map display
- Property markers
- Map controls and styling
- Responsive map containers

### Google Places API
- Address autocomplete
- Geocoding services
- Place details
- Country restrictions (Canada)

### Setup
1. Create a [Google Cloud Platform](https://cloud.google.com) account
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. Create API credentials
4. Add your API key to `.env.local`
5. Configure API key restrictions in GCP console


## 📂 Project Structure

```
realtor-block/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── add-new-listing/      # Add property page
│   │   ├── edit-listing/         # Edit property pages
│   │   ├── view-listing/         # Property details pages
│   │   ├── agent/                # Agent profile pages
│   │   └── agents/               # Agents listing page
│   ├── _components/              # Shared components
│   │   ├── GoogleAddressSearch.jsx
│   │   ├── GoogleMapView.jsx
│   │   ├── Header.jsx
│   │   ├── Listing.jsx
│   │   └── MarkerItem.jsx
│   ├── sign-in/                  # Authentication pages
│   ├── sign-up/
│   ├── globals.css               # Global styles
│   ├── layout.jsx                # Root layout
│   ├── page.jsx                  # Home page
│   └── Provider.jsx              # App providers
├── @/                            # Alias for components/ui
├── components/                   # UI components
├── lib/                          # Utility functions
├── utils/                        # Utility files
│   └── supabase/
│       └── client.js             # Supabase client
├── public/                       # Static assets
├── middleware.js                 # Clerk middleware
└── package.json
```




## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Added feature'`)
4. Push to the branch (`git push origin feature`)
5. Open a Pull Request


