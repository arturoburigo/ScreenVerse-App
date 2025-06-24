# ScreenVerse 🎬

A modern React Native mobile application for discovering, tracking, and rating movies and TV series. Built with Expo, TypeScript, and Clerk authentication.

![ScreenVerse](https://img.shields.io/badge/React%20Native-0.79.2-blue)
![Expo](https://img.shields.io/badge/Expo-53.0.9-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Clerk](https://img.shields.io/badge/Clerk-Auth-green)

## 📱 Features

### 🎯 Core Features
- **Movie & TV Series Discovery**: Browse through curated collections of movies and TV series
- **Personalized Recommendations**: AI-powered recommendations based on your preferences
- **Watchlist Management**: Save and organize titles you want to watch
- **Rating System**: Rate and review movies and TV series
- **Search Functionality**: Find titles by name, genre, or other criteria
- **User Authentication**: Secure login with Clerk authentication
- **Cross-Platform**: Works on iOS, Android, and Web

### 🎨 User Interface
- **Dark Theme**: Modern dark UI optimized for media consumption
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Navigation**: Intuitive tab-based navigation
- **Custom Fonts**: Poppins font family for better readability
- **Loading States**: Smooth loading indicators and transitions

### 🔐 Authentication & Security
- **Clerk Integration**: Professional authentication system
- **Token Management**: Automatic token refresh and secure storage
- **Session Persistence**: Stay logged in across app sessions
- **Secure Storage**: Encrypted token storage with Expo SecureStore

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Authentication**: Clerk
- **State Management**: React Hooks
- **Navigation**: Expo Router
- **HTTP Client**: Axios
- **Storage**: AsyncStorage & SecureStore
- **Icons**: Expo Vector Icons

### Project Structure
```
src/
├── app/                    # App screens and navigation
│   ├── auth/              # Authentication screens
│   ├── home/              # Home screen with recommendations
│   ├── search/            # Search functionality
│   ├── movie-details/     # Movie/TV series details
│   ├── myspace/           # User's personal space
│   ├── profile/           # User profile management
│   ├── rate/              # Rating interface
│   ├── public/            # Public landing page
│   └── storage/           # Token storage utilities
├── components/            # Reusable UI components
│   ├── Button/           # Custom button component
│   ├── Card/             # Movie/TV series card
│   ├── Header/           # App header component
│   ├── Navbar/           # Bottom navigation
│   └── SearchBar/        # Search input component
├── services/             # API services and business logic
│   ├── api.ts           # Base API configuration
│   ├── authService.ts   # Authentication service
│   ├── searchService.ts # Search functionality
│   ├── userService.ts   # User management
│   ├── watchlistService.ts # Watchlist operations
│   └── ratedService.ts  # Rating operations
├── hooks/               # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and data
    ├── movies.json     # Movie database
    ├── series.json     # TV series database
    └── recommended.json # Recommendations data
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/screenverse.git
   cd screenverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🔧 Configuration

### Clerk Authentication Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key
4. Add it to your `.env` file

### Backend API Configuration
The app connects to a backend API. Update the base URL in `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'http://localhost:8080', // Change to your API URL
  // ...
});
```

## 📱 App Screens

### 🏠 Home Screen
- Displays recommended content
- Shows curated movie and TV series collections
- Horizontal scrolling carousels
- Quick access to trending content

### 🔍 Search Screen
- Search movies and TV series by title
- Filter by genre, year, or type
- Real-time search results
- Advanced search options

### 🎬 Movie Details Screen
- Comprehensive movie/TV series information
- Plot overview, cast, and ratings
- Watchlist and rating functionality
- Streaming platform information
- Similar content recommendations

### 👤 MySpace Screen
- Personal watchlist management
- Rated content history
- User preferences and settings
- Activity feed

### 👤 Profile Screen
- User account management
- Authentication settings
- App preferences
- Account statistics

## 🔌 API Services

### Authentication Service (`authService.ts`)
- User registration and login
- Token management
- Session handling
- Password reset functionality

### Search Service (`searchService.ts`)
- Movie and TV series search
- Advanced filtering
- Search history
- Trending content

### Watchlist Service (`watchlistService.ts`)
- Add/remove from watchlist
- Watchlist management
- Mark as watched
- Watchlist synchronization

### Rating Service (`ratedService.ts`)
- Rate movies and TV series
- Review management
- Rating history
- Average ratings calculation

## 🎨 UI Components

### Card Component
Reusable card component for displaying movie/TV series information:
```typescript
<Card
  image={{ uri: movie.posterMedium }}
  title={movie.title}
  type="vertical"
  onPress={() => handlePress(movie.id)}
/>
```

### Button Component
Custom button component with various styles:
```typescript
<Button
  title="Add to Watchlist"
  onPress={handleWatchlist}
  variant="primary"
/>
```

### SearchBar Component
Search input with real-time functionality:
```typescript
<SearchBar
  placeholder="Search movies and TV series..."
  onSearch={handleSearch}
/>
```

## 🔐 Security Features

### Token Management
- Automatic token refresh
- Secure token storage
- Request/response interceptors
- Session persistence

### Authentication Flow
1. User signs in with Clerk
2. Access token is stored securely
3. API requests include authentication headers
4. Automatic token refresh on expiration
5. Secure logout with token cleanup

## 📊 Data Management

### Local Data
- `movies.json`: Curated movie database
- `series.json`: TV series database
- `recommended.json`: AI-powered recommendations

### API Integration
- RESTful API communication
- Real-time data synchronization
- Offline capability with local storage
- Error handling and retry logic

## 🧪 Testing

Run tests with Jest:
```bash
npm test
```

## 📦 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### Web
```bash
expo build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Clerk](https://clerk.com/) for authentication services
- [React Native](https://reactnative.dev/) for the mobile framework
- [TypeScript](https://www.typescriptlang.org/) for type safety

## 📞 Support

For support, email support@screenverse.com or join our Slack channel.

---

**ScreenVerse** - Your ultimate movie and TV series companion 📱🎬 