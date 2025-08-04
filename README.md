# Keth Invoice Creator

A modern, responsive invoice creation web application built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Dashboard** - Overview of invoices with statistics and recent activity
- ✏️ **Create Invoices** - Comprehensive invoice creation with dynamic line items
- 📋 **Invoice Management** - View, filter, and manage all invoices
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** - Fully responsive design that works perfectly on all devices
- 🎭 **Smooth Animations** - Engaging animations and micro-interactions
- 💾 **Local Storage** - Data persists in browser (can be extended to backend)
- 📄 **PDF Export** - Generate PDF invoices (ready for implementation)

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation utilities
- **UUID** - Unique ID generation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd keth-invoice-creator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Dashboard
- View invoice statistics and recent activity
- Quick access to create new invoices
- Revenue tracking and status overview
- Responsive stats cards with smooth animations

### Creating Invoices
1. Navigate to "Create Invoice" from the dashboard or navigation
2. Fill in invoice details (number, dates, tax rate)
3. Add client information (name, email, address)
4. Add line items with descriptions, quantities, and prices
5. Add optional notes
6. Review the summary and save

### Managing Invoices
- View all invoices in a searchable, filterable table
- Filter by status (draft, sent, paid, overdue)
- Search by invoice number or client name
- Delete invoices with confirmation
- View invoice statistics and summaries

## Mobile Experience

### Responsive Design
- **Mobile Navigation** - Hamburger menu with smooth transitions
- **Touch-Friendly** - Optimized buttons and form fields for mobile devices
- **Adaptive Layouts** - Cards and grids that stack properly on small screens
- **Mobile Cards** - Invoice list displays as cards on mobile devices
- **Responsive Forms** - Form fields adapt to screen size

### Animations & Interactions
- **Page Transitions** - Smooth slide-up animations for page changes
- **Button Interactions** - Scale and color transitions on hover/click
- **Card Animations** - Subtle hover effects and staggered loading
- **Form Feedback** - Smooth transitions for form interactions
- **Loading States** - Animated loading indicators and transitions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx     # Navigation component with mobile menu
├── context/            # React context for state management
│   └── InvoiceContext.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx   # Dashboard page with responsive stats
│   ├── CreateInvoice.tsx # Invoice creation form (mobile-responsive)
│   └── InvoiceList.tsx # Invoice list with mobile card layout
├── types/              # TypeScript type definitions
│   └── invoice.ts      # Invoice-related types
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles, animations, and Tailwind imports
```

## Features to Add

- **PDF Generation** - Export invoices as PDF files
- **Email Integration** - Send invoices directly to clients
- **Backend Integration** - Connect to a real database
- **User Authentication** - Multi-user support
- **Invoice Templates** - Customizable invoice designs
- **Payment Integration** - Online payment processing
- **Recurring Invoices** - Automated invoice generation
- **Client Management** - Client database and history
