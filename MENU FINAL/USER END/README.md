# Spice Route - QR-Based Digital Restaurant Menu

A comprehensive digital menu and ordering system built with React, TypeScript, and Firebase.

## Features

- **Table-based ordering**: Customers scan QR codes or enter table numbers
- **Digital menu**: Organized by categories with beautiful food images
- **Real-time cart**: Floating cart with quantity controls and animations
- **Order tracking**: Live status updates with ETA countdown
- **Firebase integration**: Real-time order management
- **Mobile-first design**: Optimized for all devices
- **Indian cuisine theme**: Beautiful dark theme with cultural elements

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Update `src/config/firebase.ts` with your Firebase configuration
4. Set up Firestore security rules for the `orders` collection

## Menu Management

The menu is stored in `src/data/menu.json` and can be easily updated by designers or restaurant staff. Each item includes:

- Name and description
- Price in INR
- Food image URL
- Category assignment
- Dietary indicators (vegetarian, spicy)

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Kitchen Dashboard

This customer-facing app works with a separate kitchen dashboard that can:
- View incoming orders in real-time
- Set preparation times (ETA)
- Update order status (pending → preparing → ready → served)

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS for styling
- Firebase Firestore for real-time data
- Vite for development and building
- React Hot Toast for notifications