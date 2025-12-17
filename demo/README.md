# Health Picks React App

React application converted from HTML/CSS/JS to a modern React app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Ensure images are in the public folder:
```bash
# Images should be in public/images/ directory
# This is already set up if you see public/images/ folder
```

3. Start development server:
```bash
npm run dev
```

The app will open at http://localhost:3000

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
demo/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MissionModal.jsx
│   │   └── QuestionnaireModal.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Mission.jsx
│   │   ├── Questionnaire.jsx
│   │   ├── Challenge.jsx
│   │   └── ...
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── css/                 # CSS files (imported in components)
├── images/              # Image assets
├── package.json
└── vite.config.js       # Vite configuration
```

## Features

- React Router for navigation
- Component-based architecture
- State management with React hooks
- Responsive design maintained from original CSS
- Modal components converted to React

## Routes

- `/login` - Login page
- `/questionnaire` - Initial questionnaire
- `/home` - Home dashboard
- `/mission` - Mission cards
- `/challenge` - Challenge list
- `/challenge/:id` - Challenge detail
- `/todo` - Todo list
- `/supply` - Supply management
- `/recipe` - Recipe list
- `/timeline` - Timeline views

