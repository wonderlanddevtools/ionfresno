# 🏨 Project Fresno - Chateau Marmont Dashboard

A modern, luxury property management dashboard inspired by the iconic Chateau Marmont hotel. Built with Next.js 13, React 18, and featuring a beautiful glassmorphism design with customizable widgets.

![Dashboard Preview](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful translucent sidebar with Apple-style aesthetics
- **Chateau Marmont Theme**: Luxury hotel background with sophisticated styling
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Dark Theme**: Elegant dark theme perfect for professional environments

### 🔧 **Widget System**
- **Draggable Widgets**: Fully interactive drag-and-drop widget positioning
- **Persistent Layout**: Widget positions saved automatically to localStorage
- **Widget Library**: Extensible widget system with multiple components
- **Real-time Updates**: Live data updates for dynamic widgets

### 📱 **Available Widgets**
- **Do Not Disturb Toggle**: Focus mode control with elegant moon icon
- **Digital Clock**: Real-time digital time display
- **Modern Analog Clock**: Beautiful analog clock with customizable styling
- **Usage Statistics**: Dashboard usage analytics and metrics

### 🏗️ **Dashboard Features**
- **Property Management**: Reservations, properties, and analytics
- **Account Management**: User settings and preferences
- **Navigation**: Intuitive sidebar navigation with keyboard shortcuts
- **Authentication**: Secure sign-in system

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wonderlanddevtools/projectfresno.git
   cd projectfresno
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## 📖 Usage Guide

### 🎛️ **Widget Management**
1. **Access Widget Panel**: Click the "Widgets" button (Grid icon) in the sidebar
2. **Add Widgets**: Select from available widgets in the panel
3. **Position Widgets**: Drag widgets to your preferred locations
4. **Remove Widgets**: Use the remove functionality on each widget

### ⌨️ **Keyboard Shortcuts**
- **⌘+Option+D** (Mac) / **Ctrl+Alt+D** (Windows): Toggle sidebar visibility

### 🔧 **Customization**
- Widget positions are automatically saved to localStorage
- Sidebar can be toggled for more screen space
- Responsive design adapts to different screen sizes

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 13.5.1**: React framework with App Router
- **React 18.2.0**: Latest React with concurrent features
- **TypeScript 5.2.2**: Type-safe development

### **Styling & UI**
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **Tailwind Animate**: Animation utilities
- **Class Variance Authority**: Type-safe component variants
- **Lucide React**: Beautiful icon library

### **UI Components**
- **Radix UI**: Headless, accessible UI primitives
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
FresnoFronted/
├── app/                    # Next.js 13 App Router
│   ├── dashboard/         # Dashboard pages and layouts
│   ├── auth/             # Authentication pages
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── dashboard/        # Dashboard-specific components
│   ├── ui/              # UI component library
│   └── WidgetPanel.tsx  # Widget management panel
├── hooks/               # Custom React hooks
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🎨 Widget Development

### Creating a New Widget

1. **Create the widget component** in `components/ui/`:
   ```tsx
   export function MyWidget() {
     return (
       <div className="p-4 bg-white/10 rounded-lg">
         {/* Your widget content */}
       </div>
     );
   }
   ```

2. **Add to WidgetPanel** in `components/WidgetPanel.tsx`:
   ```tsx
   const availableWidgets = [
     // ...existing widgets
     { type: 'MyWidget', name: 'My Widget', description: 'Description' }
   ];
   ```

3. **Add rendering logic** in `app/dashboard/page.tsx`:
   ```tsx
   case 'MyWidget':
     return <MyWidget />;
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🏨 About Chateau Marmont

The design is inspired by the legendary Chateau Marmont hotel in West Hollywood, known for its timeless elegance and sophisticated atmosphere. The dashboard captures this essence with its luxury aesthetics and premium user experience.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Built with ❤️ by Wonderland Dev Tools**
