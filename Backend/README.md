<div align="center">
    <h1>
        Spendo API - Backend
    </h1>
    <p>
        <strong><a href="#en-english">English</a> | <a href="#es-español">Español</a></strong>
    </p>
</div>
<a name="en-english"></a>
<h2>English version</h2>

<p>This API connects with a Supabase database using the PostgreSQL engine to manage the logic of the Spendo application. Built with PHP 12.50.0 and the Laravel 12.x framework.</p>

<h4>🚀 Features</h4>
    <ul>
        <li>
            <strong>Multi-currency support:</strong> Manage accounts in different currencies (MXN, USD, etc.).
        </li>
        <li>
            <strong>User Isolation:</strong> Total data privacy using Scoped Validations and Policies.</li>
        <li>
            <strong>UUID Identifiers:</strong> Enhanced security using Universally Unique Identifiers instead of auto-incremental IDs.
        </li>
        <li>
            <strong>Data Sanitization:</strong> Automatic cleaning of inputs (trims, case normalization) via FormRequests.
        </li>
    </ul>

<h4>🛠️ Tech Stack</h4>
    <ul>
        <li><strong>Framework:</strong> Laravel 12.x</li>
        <li><strong>Database:</strong> PostgreSQL (Supabase)</li>
        <li><strong>Auth:</strong> Laravel Sanctum</li>
        <li><strong>Server:</strong> PHP 12.50.0+</li>
        <li><strong>Deploy API:</strong> Railway</li>
    </ul>

<h4>⚙️ Setup & Installation</h4>
    <ul>
        <li>Clone the repo: git clone https://github.com/your-user/spendo-backend.git</li>
        <li>Install dependencies: composer install</li>
        <li>Configure Environment: Create a .env file based on .env.example with your Supabase credentials.</li>
        <li>App Key: php artisan key:generate</li>
        <li>Migrations: php artisan migrate</li>
    </ul>

<hr>

<a name="es-español"></a>

<h2>Versión en español</h2>

<p>
    Esta API se conecta con una base de datos en Supabase con el motor PostgreSQL y gestiona la lógica de la aplicación Spendo. Utiliza PHP 12.50.0 con el framework Laravel 12.x.
</p>

<h4>🚀 Características</h4>
    <ul>
        <li>
            <strong>Soporte Multimoneda:</strong> Gestión de cuentas en diferentes divisas (MXN, USD, etc.).
        </li>
        <li>
            <strong>Aislamiento de Usuarios:</strong> Privacidad total de datos mediante Validaciones de Alcance (Scopes) y Políticas (Policies).
        </li>
        <li>
            <strong>Identificadores UUID:</strong> Seguridad mejorada utilizando identificadores únicos universales.
        </li>
        <li>
            <strong>Sanitización de Datos:</strong> Limpieza automática de entradas (espacios, normalización de mayúsculas) vía FormRequests.
        </li>
    </ul>

<h4>🛠️ Stack Tecnológico</h4>
    <ul>
        <li><strong>Framework:</strong> Laravel 12.x</li>
        <li><strong>Base de Datos:</strong> PostgreSQL (Supabase)</li>
        <li><strong>Autenticación:</strong> Laravel Sanctum</li>
        <li><strong>Servidor:</strong> PHP 12.50.0+</li>
        <li><strong>Despliegue de API:</strong> Railway</li>
    </ul>

<h4>⚙️ Configuración e Instalación</h4>
    <ul>
        <li>Clonar el repositorio: git clone https://github.com/tu-usuario/spendo-backend.git</li>
        <li>Instalar dependencias: composer install</li>
        <li>Configurar Entorno: Crear un archivo .env basado en .env.example con tus credenciales de Supabase.</li>
        <li>Clave de App: php artisan key:generate</li>
        <li>Migraciones: php artisan migrate</li>
    </ul>

<hr>

<div align="center">
    <p><code>v1.1.1</code></p>
</div>
