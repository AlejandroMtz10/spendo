<div align="center">
    <h1>
        Spendo
    </h1>
    <p>
        <strong>Full-stack application for personal finance management.</strong>
    </p>
    <p>
        <a href="#en-english">English</a> | <a href="#es-español">Español</a>
    </p>
</div>

<a name="en-english"></a>
<h2>English version</h2>

<p>Spendo is a comprehensive solution to track personal balances, income, and expenses across multiple currencies. This repository hosts both the <strong>Laravel API</strong> and the <strong>React Frontend</strong>, orchestrated with Docker for a seamless development experience.</p>

<h4>🛠️ Tech Stack</h4>
<ul>
    <li><strong>Database:</strong> PostgreSQL (via Supabase)</li>
    <li><strong>Backend:</strong> PHP (Laravel 12.x), Laravel Sanctum</li>
    <li><strong>Frontend:</strong> React JS, Tailwind CSS, Recharts</li>
    <li><strong>Proxy & Server:</strong> Nginx (Reverse Proxy for Monorepo)</li>
    <li><strong>Containerization:</strong> Docker & Docker Compose</li>
    <li><strong>Package Manager:</strong> PNPM</li>
</ul>

<h4>⚙️ Project Structure</h4>
<pre>
spendo/
├── backend/   # Laravel API (Container: spendo-api)
├── frontend/  # React Client (Container: spendo-frontend)
├── nginx/     # Nginx Configuration (Container: spendo-proxy)
└── database/  # Diagrams & scripts
</pre>

<h4>🚀 Quick Setup (Docker - Recommended)</h4>
<ol>
    <li><strong>Environment:</strong> Copy <code>.env.example</code> to <code>.env</code> in both <code>backend/</code> and <code>frontend/</code> folders.</li>
    <li><strong>Build & Run:</strong> From the root directory, execute:
        <pre>docker-compose up -d --build</pre>
    </li>
    <li><strong>Database:</strong> Run migrations inside the container:
        <pre>docker exec spendo-backend php artisan migrate</pre>
    </li>
    <li><strong>Optimization:</strong> If you change <code>.env</code> variables, clear the cache:
        <pre>docker exec spendo-backend php artisan optimize:clear</pre>
    </li>
</ol>

<hr>

<a name="es-español"></a>

<h2>Versión en español</h2>

<p>Spendo es una solución integral para rastrear balances personales, ingresos y gastos en múltiples divisas. Este repositorio alberga tanto la <strong>API en Laravel</strong> como el <strong>Frontend en React</strong>, orquestados con Docker para una experiencia de desarrollo fluida.</p>

<h4>🛠️ Stack Tecnológico</h4>
<ul>
    <li><strong>Base de Datos:</strong> PostgreSQL (vía Supabase)</li>
    <li><strong>Backend:</strong> PHP (Laravel 12.x), Laravel Sanctum</li>
    <li><strong>Frontend:</strong> React JS, Tailwind CSS, Recharts</li>
    <li><strong>Proxy y Servidor:</strong> Nginx (Proxy Inverso para el Monorepo)</li>
    <li><strong>Contenedores:</strong> Docker y Docker Compose</li>
    <li><strong>Gestor de Paquetes:</strong> PNPM</li>
</ul>

<h4>⚙️ Estructura del Proyecto</h4>
<pre>
spendo/
├── backend/   # API en Laravel (Contenedor: spendo-api)
├── frontend/  # Cliente en React (Contenedor: spendo-frontend)
├── nginx/     # Configuración de Nginx (Contenedor: spendo-proxy)
└── database/  # Diagramas y scripts
</pre>

<h4>🚀 Configuración Rápida (Docker - Recomendado)</h4>
<ol>
    <li><strong>Entorno:</strong> Copia <code>.env.example</code> a <code>.env</code> en las carpetas <code>backend/</code> y <code>frontend/</code>.</li>
    <li><strong>Construir y Correr:</strong> Desde el directorio raíz, ejecuta:
        <pre>docker-compose up -d --build</pre>
    </li>
    <li><strong>Base de Datos:</strong> Ejecuta las migraciones dentro del contenedor:
        <pre>docker exec spendo-backend php artisan migrate</pre>
    </li>
    <li><strong>Optimización:</strong> Si cambias variables del <code>.env</code>, limpia la caché:
        <pre>docker exec spendo-backend php artisan optimize:clear</pre>
    </li>
</ol>

<hr>

<h2 align="center">
    Screenshots
</h2>

<div align="center">
    <img src="/Images/login.png" />
    <img src="/Images/signup.png" />
    <img src="/Images/Dashboard_dark_mode.png" />
    <img src="/Images/Dashboard_light_mode.png" />
    <img src="/Images/currencies.png" />
    <img src="/Images/Transactions.png" />
</div>

<hr>

<div align="center">
    <p>Developed by <strong>Eng. Alejandro Martínez</strong></p>
    <p><code>v1.2.0</code></p>
</div>
