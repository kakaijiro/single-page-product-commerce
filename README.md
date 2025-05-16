# Fast React Pizza Co.

A modern pizza ordering web application built with React and Vite.

## Features

- Browse a menu of pizzas
- Add, update, and remove items from your cart
- Place orders with address and phone validation
- View order status and details
- Responsive design

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/fast-react-pizza.git
   cd fast-react-pizza
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Project Structure

```
.
├── public/         # Static assets (images, icons)
├── data/           # Mock data (e.g., cities.json)
├── src/
│   ├── components/ # Reusable UI components
│   ├── contexts/   # React context providers
│   ├── hooks/      # Custom React hooks
│   ├── pages/      # Page components (routing targets)
│   ├── utils/      # Utility functions
│   ├── App.jsx     # Main app component
│   └── main.jsx    # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## Linting & Formatting

- Lint code: `npm run lint`
- Formatting is handled by Prettier and Tailwind CSS plugin.

## License

MIT
