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

// Provider Portal
import ProviderDashboard from './pages/provider/Dashboard'
import ProviderIngredients from './pages/provider/Ingredients'
import ProviderProducts from './pages/provider/Products'
import ProviderChallenges from './pages/provider/Challenges'
import ProviderRecipes from './pages/provider/Recipes'
import ProviderMissions from './pages/provider/Missions'
import ProviderContent from './pages/provider/Content'
import ProviderTenants from './pages/provider/Tenants'
import ProviderEmployees from './pages/provider/Employees'
import ProviderAnalytics from './pages/provider/Analytics'

// HR Portal
import HRDashboard from './pages/hr/Dashboard'
import HRChallenges from './pages/hr/Challenges'
import HRHealth from './pages/hr/Health'
import HRNotifications from './pages/hr/Notifications'
import HRUsers from './pages/hr/Users'
import HRSubsidy from './pages/hr/Subsidy'
import HRAnnouncements from './pages/hr/Announcements'

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
        
        {/* Provider Portal Routes */}
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/ingredients" element={<ProviderIngredients />} />
        <Route path="/provider/products" element={<ProviderProducts />} />
        <Route path="/provider/challenges" element={<ProviderChallenges />} />
        <Route path="/provider/recipes" element={<ProviderRecipes />} />
        <Route path="/provider/missions" element={<ProviderMissions />} />
        <Route path="/provider/content" element={<ProviderContent />} />
        <Route path="/provider/tenants" element={<ProviderTenants />} />
        <Route path="/provider/employees" element={<ProviderEmployees />} />
        <Route path="/provider/analytics" element={<ProviderAnalytics />} />
        
        {/* HR Portal Routes */}
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/challenges" element={<HRChallenges />} />
        <Route path="/hr/health" element={<HRHealth />} />
        <Route path="/hr/notifications" element={<HRNotifications />} />
        <Route path="/hr/users" element={<HRUsers />} />
        <Route path="/hr/subsidy" element={<HRSubsidy />} />
        <Route path="/hr/announcements" element={<HRAnnouncements />} />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

