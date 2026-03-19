<div align="center">
    <h1>
        💰 Spendo Monorepo
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

<p>Spendo is a comprehensive solution to track personal balances, income, and expenses across multiple currencies. This repository hosts both the <strong>Laravel API</strong> and the <strong>React Frontend</strong>.</p>

<h4>🛠️ Tech Stack</h4>
<ul>
    <li><strong>Database:</strong> PostgreSQL (via Supabase)</li>
    <li><strong>Backend:</strong> PHP 12.50.0 (Laravel 12.x), Laravel Sanctum</li>
    <li><strong>Frontend:</strong> React JS, Tailwind CSS, Recharts</li>
    <li><strong>Package Manager:</strong> PNPM</li>
    <li><strong>Tools:</strong> VS Code, Git, Draw.io, Postman</li>
</ul>

<h4>⚙️ Project Structure</h4>
<pre>
spendo/
├── database/  # Diagrams & scripts
├── backend/   # Laravel API
└── frontend/  # React Client
</pre>

<h4>🚀 Quick Setup</h4>
<ol>
    <li><strong>Environment:</strong> Configure <code>.env</code> files in both directories based on their respective <code>.env.example</code>.</li>
    <li><strong>Database:</strong> Run <code>php artisan migrate</code> in the backend.</li>
    <li><strong>Essential Data:</strong> After registering, ensure you create:
        <ul>
            <li>Your preferred Currencies (USD, MXN).</li>
            <li>Your Accounts.</li>
            <li><strong>Required Categories:</strong> To handle internal transfers, create <code>Transfer (Out)</code> and <code>Transfer (In)</code> categories.</li>
        </ul>
    </li>
</ol>

<hr>

<a name="es-español"></a>

<h2>Versión en español</h2>

<p>Spendo es una solución integral para rastrear balances personales, ingresos y gastos en múltiples divisas. Este repositorio alberga tanto la <strong>API en Laravel</strong> como el <strong>Frontend en React</strong>.</p>

<h4>🛠️ Stack Tecnológico</h4>
<ul>
    <li><strong>Base de Datos:</strong> PostgreSQL (vía Supabase)</li>
    <li><strong>Backend:</strong> PHP 12.50.0 (Laravel 12.x), Laravel Sanctum</li>
    <li><strong>Frontend:</strong> React JS, Tailwind CSS, Recharts</li>
    <li><strong>Gestor de Paquetes:</strong> PNPM</li>
    <li><strong>Herramientas:</strong> VS Code, Git, Draw.io, Postman</li>
</ul>

<h4>⚙️ Estructura del Proyecto</h4>
<pre>
spendo/
├── database/ # Diagramas y scripts
├── backend/  # API en Laravel
└── frontend/ # Cliente en React
</pre>

<h4>🚀 Configuración Rápida</h4>
<ol>
    <li><strong>Entorno:</strong> Configura los archivos <code>.env</code> en ambos directorios basándote en sus respectivos <code>.env.example</code>.</li>
    <li><strong>Base de Datos:</strong> Ejecuta <code>php artisan migrate</code> en el backend.</li>
    <li><strong>Datos Esenciales:</strong> Después de registrarte, asegúrate de crear:
        <ul>
            <li>Tus Divisas (USD, MXN).</li>
            <li>Tus Cuentas.</li>
            <li><strong>Categorías Requeridas:</strong> Para gestionar transferencias internas, crea las categorías <code>Transfer (Out)</code> y <code>Transfer (In)</code>.</li>
        </ul>
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