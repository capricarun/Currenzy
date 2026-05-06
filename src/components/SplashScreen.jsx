import React, { useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="splash-logo-wrapper">
          <svg
            className="splash-logo"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="58" fill="white" />
            <path
              d="M45 50L55 60L45 70M65 50L75 60L65 70"
              stroke="#0066ff"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="splash-title">Currenzy</h1>
      </div>
      <div className="splash-progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  )
}
