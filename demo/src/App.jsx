import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Questionnaire from './pages/Questionnaire'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Challenge from './pages/Challenge'
import ChallengeDetail from './pages/ChallengeDetail'
import Todo from './pages/Todo'
import Supply from './pages/Supply'
import RecipeAll from './pages/RecipeAll'
import TimelineList from './pages/TimelineList'
import TimelineDetail from './pages/TimelineDetail'
import TimelineTop from './pages/TimelineTop'
import TimelineServiceCard from './pages/TimelineServiceCard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login.html" element={<Navigate to="/login" replace />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/questionnaire.html" element={<Navigate to="/questionnaire" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home.html" element={<Navigate to="/home" replace />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/mission.html" element={<Navigate to="/mission" replace />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/challenge.html" element={<Navigate to="/challenge" replace />} />
        <Route path="/challenge/:id" element={<ChallengeDetail />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo.html" element={<Navigate to="/todo" replace />} />
        <Route path="/supply" element={<Supply />} />
        <Route path="/supply.html" element={<Navigate to="/supply" replace />} />
        <Route path="/recipe" element={<RecipeAll />} />
        <Route path="/recipe.html" element={<Navigate to="/recipe" replace />} />
        <Route path="/timeline" element={<TimelineList />} />
        <Route path="/timeline.html" element={<Navigate to="/timeline" replace />} />
        <Route path="/timeline/detail" element={<TimelineDetail />} />
        <Route path="/timeline/top" element={<TimelineTop />} />
        <Route path="/timeline/service" element={<TimelineServiceCard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

