FROM node:20-alpine

WORKDIR /app

# Copy package files first (layer caching)
COPY package.json package-lock.json* ./

# Install all dependencies
RUN npm install --legacy-peer-deps

# react & react-dom are peerDependencies, install them explicitly
RUN npm install react@18.3.1 react-dom@18.3.1 --save --legacy-peer-deps

# Copy application code (overridden by volume mount in dev)
COPY . .

EXPOSE 5173

# Dev-friendly: Vite on 0.0.0.0 for Docker access + hot reload
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]
