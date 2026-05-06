import React, { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import HomeScreen from './components/HomeScreen'

export default function App() {
  const [showHome, setShowHome] = useState(false)

  const handleSplashComplete = () => {
    setShowHome(true)
  }

  return (
    <div className="app">
      {!showHome ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <HomeScreen />
      )}
    </div>
  )
}
