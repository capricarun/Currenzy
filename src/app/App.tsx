import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { SplashScreen } from './components/screens/SplashScreen';
import { ConvertScreen } from './components/screens/ConvertScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { AddPairScreen } from './components/screens/AddPairScreen';
import { AlertsScreen } from './components/screens/AlertsScreen';
import { CreateAlertScreen } from './components/screens/CreateAlertScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { RatesScreen } from './components/screens/RatesScreen';
import { MultiCurrencyScreen } from './components/screens/MultiCurrencyScreen';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter basename="/Currenzy">
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/convert" replace />} />
            <Route path="convert" element={<ConvertScreen />} />
            <Route path="favorites" element={<FavoritesScreen />} />
            <Route path="favorites/add" element={<AddPairScreen />} />
            <Route path="alerts" element={<AlertsScreen />} />
            <Route path="alerts/create" element={<CreateAlertScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="rates/:from/:to" element={<RatesScreen />} />
            <Route path="multi-currency" element={<MultiCurrencyScreen />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
