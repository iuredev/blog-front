# Iure.dev - Personal Blog

A modern, performant personal blog built with React, Vite, and Strapi CMS. This project features server-side rendering (SSR) for optimal SEO and performance.

## 🚀 Features

- ⚡️ Built with Vite for lightning-fast development and build times
- 🔍 SEO optimized with server-side rendering
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 📝 Markdown support with syntax highlighting
- 🔄 Real-time updates
- 📊 Google Analytics integration
- 🔍 Sitemap generation
- 🐳 Docker support for easy deployment

## 🛠️ Tech Stack

- **Frontend:**

  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - React Markdown
  - React Syntax Highlighter

- **Backend:**
  - Strapi CMS
  - Node.js
  - Express

## 🏗️ Project Structure

```
blog-front/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── routes/        # Route definitions
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
├── dist/             # Build output
└── scripts/          # Build and utility scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/blog-with-strapi.git
   cd blog-front
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` with your configuration.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5174`.

### Building for Production

```bash
npm run build
```

### Running in Production

```bash
npm start
```

## 🐳 Docker Support

Build and run with Docker:

```bash
docker build -t blog-front .
docker run -p 3000:3000 blog-front
```

Or use Docker Compose:

```bash
docker-compose up
```

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_PORT=5174
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Iure Silva** - [GitHub](https://github.com/iure)
- **Website** - [iure.dev](https://iure.dev)
- **LinkedIn** - [iure-silva](https://linkedin.com/in/iure-silva)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Strapi](https://strapi.io/)
- [Tailwind CSS](https://tailwindcss.com/)
