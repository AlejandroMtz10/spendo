<div align="center">
    <h1>
        Spendo Web - Frontend
    </h1>
    <p>
        <strong><a href="#en-english">English</a> | <a href="#es-español">Español</a></strong>
    </p>
</div>

<a name="en-english"></a>
<h2>English version</h2>

<p>The client-side application for Spendo, designed to provide a seamless and intuitive financial management experience. Built with React and styled with Tailwind CSS, it consumes the Spendo API to visualize balances, expenses, and savings trends.</p>

<h4>🚀 Features</h4>
    <ul>
        <li>
            <strong>Dynamic Dashboard:</strong> Real-time visualization of multi-currency balances and monthly cash flow.
        </li>
        <li>
            <strong>Dark Mode Support:</strong> Full interface adaptation for light and dark environments.
        </li>
        <li>
            <strong>Interactive Charts:</strong> Visual analysis of expenses by category and savings trends using Recharts.
        </li>
        <li>
            <strong>Responsive Design:</strong> Fully adapted for mobile, tablet, and desktop views.
        </li>
        <li>
            <strong>Dockerized Production:</strong> Served via Nginx with a reverse proxy configuration to handle API authentication headers (Sanctum).
        </li>
    </ul>

<h4>🛠️ Tech Stack</h4>
    <ul>
        <li><strong>Library:</strong> React.js</li>
        <li><strong>Styling:</strong> Tailwind CSS</li>
        <li><strong>Icons:</strong> React Icons</li>
        <li><strong>HTTP Client:</strong> Axios</li>
        <li><strong>Build Tool:</strong> Vite</li>
        <li><strong>Infrastructure:</strong> Docker & Nginx</li>
    </ul>

<h4>⚙️ Setup & Installation</h4>
    <ul>
        <li><strong>Option A (Docker - Recommended):</strong> 
            <code>docker-compose up -d --build spendo-frontend</code>
        </li>
        <li><strong>Option B (Local Development):</strong>
            <ul>
                <li>Install dependencies: <code>pnpm install</code></li>
                <li>Configure Environment: Create a <code>.env</code> file with <code>VITE_API_URL=http://localhost:8000/api</code></li>
                <li>Run Development: <code>pnpm run dev</code></li>
            </ul>
        </li>
        <li><strong>Build for Production:</strong> <code>pnpm run build</code></li>
    </ul>

<hr>

<a name="es-español"></a>

<h2>Versión en español</h2>

<p>
    La aplicación cliente de Spendo, diseñada para ofrecer una experiencia de gestión financiera fluida e intuitiva. Construida con React y Tailwind CSS, consume la API de Spendo para visualizar balances, gastos y tendencias de ahorro.
</p>

<h4>🚀 Características</h4>
    <ul>
        <li>
            <strong>Dashboard Dinámico:</strong> Visualización en tiempo real de balances multimoneda y flujo de caja mensual.
        </li>
        <li>
            <strong>Soporte para Modo Oscuro:</strong> Adaptación completa de la interfaz para entornos claros y oscuros.
        </li>
        <li>
            <strong>Gráficos Interactivos:</strong> Análisis visual de gastos por categoría y tendencias de ahorro mediante Recharts.
        </li>
        <li>
            <strong>Diseño Responsivo:</strong> Totalmente adaptado para vistas de móviles, tablets y escritorio.
        </li>
        <li>
            <strong>Producción con Docker:</strong> Servido mediante Nginx con configuración de proxy inverso para manejar encabezados de autenticación (Sanctum).
        </li>
    </ul>

<h4>🛠️ Stack Tecnológico</h4>
    <ul>
        <li><strong>Librería:</strong> React.js</li>
        <li><strong>Estilos:</strong> Tailwind CSS</li>
        <li><strong>Iconos:</strong> React Icons</li>
        <li><strong>Cliente HTTP:</strong> Axios</li>
        <li><strong>Herramienta de Construcción:</strong> Vite</li>
        <li><strong>Infraestructura:</strong> Docker y Nginx</li>
    </ul>

<h4>⚙️ Configuración e Instalación</h4>
    <ul>
        <li><strong>Opción A (Docker - Recomendado):</strong> 
            <code>docker-compose up -d --build spendo-frontend</code>
        </li>
        <li><strong>Opción B (Desarrollo Local):</strong>
            <ul>
                <li>Instalar dependencias: <code>pnpm install</code></li>
                <li>Configurar Entorno: Crear un archivo <code>.env</code> con <code>VITE_API_URL=http://localhost:8000/api</code></li>
                <li>Ejecutar Desarrollo: <code>pnpm run dev</code></li>
            </ul>
        </li>
        <li><strong>Construcción para Producción:</strong> <code>pnpm run build</code></li>
    </ul>

<hr>

<div align="center">
    <p>Developed by <strong>Eng. Alejandro Martínez</strong></p>
    <p><code>v1.2.0</code></p>
</div>
