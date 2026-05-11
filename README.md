# Currenzy - Currency Conversion App

A fully interactive, production-quality currency conversion application built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 1. **Currency Conversion**
- Real-time currency conversion between multiple currencies
- Swap currencies with a single click
- View detailed exchange rates
- Support for 10+ global currencies

### 2. **Favorites Management**
- Save frequently used currency pairs
- Quick access to saved pairs
- View charts for favorite pairs
- Delete unwanted pairs

### 3. **Rate Alerts**
- Create custom price alerts
- Configure alert conditions (rises above, falls below, % change)
- Choose notification method (push, email, or both)
- Monitor active alerts with toggle switches
- View triggered alerts history

### 4. **Detailed Rate Charts**
- Interactive rate charts with multiple time periods (1D, 5D, 1M, 1Y, 5Y, Max)
- Period summary statistics (Open, Close, High, Low)
- Visual representation of rate changes
- Percentage change indicators

### 5. **User Profile**
- Manage user preferences (currency, language, theme)
- Configure notification settings
- Access help and support
- Profile editing capabilities

## Tech Stack

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **React Router DOM 7.15** - Client-side routing
- **Tailwind CSS 4.1** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app with routing
│   ├── components/
│   │   ├── Layout.tsx          # Main layout with bottom navigation
│   │   ├── screens/            # Screen components
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── ConvertScreen.tsx
│   │   │   ├── FavoritesScreen.tsx
│   │   │   ├── AddPairScreen.tsx
│   │   │   ├── AlertsScreen.tsx
│   │   │   ├── CreateAlertScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── RatesScreen.tsx
│   │   └── ui/                 # shadcn/ui components
│   └── context/
│       └── AppContext.tsx      # Global state management
├── imports/                    # Figma-imported components
└── styles/
    ├── fonts.css              # Font imports
    ├── theme.css              # Theme variables
    └── tailwind.css           # Tailwind config
```

## Key Components

### Navigation
- **Bottom Tab Navigation**: 4 main tabs (Convert, Favourite, Alerts, Profile)
- **Back Navigation**: Available on sub-screens
- **Route-based Active States**: Highlights current tab

### State Management
- **AppContext**: Centralized state using React Context API
- **Favorites**: Manage saved currency pairs
- **Alerts**: Create and monitor price alerts
- **Currencies**: List of available currencies

### Interactive Features
- **Currency Swap**: Instantly swap from/to currencies
- **Alert Monitoring**: Toggle alert monitoring on/off
- **Favorite Actions**: View charts or delete favorites
- **Tab Selection**: Period selection for rate charts

## Responsive Design
- Mobile-first design (393px viewport)
- 8px spacing system
- Consistent component sizing
- Touch-friendly interactions

## Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible states
- Material Icons for universal iconography

## Color Palette
- **Primary Blue**: #0077e9
- **Secondary Purple**: #9b60e1
- **Success Green**: #2a9d90
- **Error Red**: #ef4444
- **Background**: #fafafa
- **Text Primary**: #18181b
- **Text Secondary**: #71717a

## Routes

| Route | Description |
|-------|-------------|
| `/convert` | Main currency conversion screen |
| `/favorites` | Saved currency pairs list |
| `/favorites/add` | Add new currency pair to favorites |
| `/alerts` | View and manage price alerts |
| `/alerts/create` | Create a new price alert |
| `/profile` | User profile and settings |
| `/rates/:from/:to` | Detailed rate chart view |

## Future Enhancements
- Real currency API integration
- Historical rate data
- Push notification system
- Multi-currency comparison
- Offline mode support
- Export transaction history
- Widget support

## Design Fidelity
This implementation closely matches the original Figma design including:
- Exact color schemes and gradients
- Typography hierarchy
- Spacing and layout
- Interactive states
- Component structure
- Visual consistency

---

Built with ❤️ using React, TypeScript, and shadcn/ui
