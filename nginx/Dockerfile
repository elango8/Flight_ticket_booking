# =============================================================================
#  Nginx Dockerfile — Production
#  Multi-stage: Builds frontend, then serves static + reverse proxy
# =============================================================================

# ── Stage 1: Build Frontend ──────────────────────────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY Frontend/package.json Frontend/package-lock.json* ./
RUN npm install --legacy-peer-deps


COPY Frontend/ .
RUN npm run build

# ── Stage 2: Nginx ───────────────────────────────────────────────────────────
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build output
COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
