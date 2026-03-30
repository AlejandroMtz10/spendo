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

<p>This API manages the core logic of the Spendo application, connecting to a Supabase database using PostgreSQL. Built with PHP 8.2 and the Laravel 12.x framework, it focuses on security, scalability, and precise financial tracking.</p>

<h4>🚀 Features</h4>
    <ul>
        <li>
            <strong>Multi-currency Engine:</strong> Advanced logic to handle accounts and transactions in different currencies (MXN, USD).
        </li>
        <li>
            <strong>Security & Privacy:</strong> User isolation via Scopes and Policies, ensuring data is only accessible to its owner.
        </li>
        <li>
            <strong>UUID Architecture:</strong> Enhanced security using Universally Unique Identifiers for all database records.
        </li>
        <li>
            <strong>Supabase Optimization:</strong> Configured to work with transaction pooling (PgBouncer) by disabling prepared statements.
        </li>
        <li>
            <strong>Dockerized Environment:</strong> Apache-based container with automated dependency management and permissions.
        </li>
    </ul>

<h4>🛠️ Tech Stack</h4>
    <ul>
        <li><strong>Framework:</strong> Laravel 12.x</li>
        <li><strong>Database:</strong> PostgreSQL (Supabase)</li>
        <li><strong>Auth:</strong> Laravel Sanctum (Stateful & Token-based)</li>
        <li><strong>Server:</strong> PHP 8.2 (Apache)</li>
        <li><strong>Infrastructure:</strong> Docker & Composer</li>
    </ul>

<h4>⚙️ Setup & Installation</h4>
    <ul>
        <li><strong>Option A (Docker - Recommended):</strong> 
            <code>docker-compose up -d --build spendo-backend</code>
        </li>
        <li><strong>Option B (Local Development):</strong>
            <ul>
                <li>Install dependencies: <code>composer install</code></li>
                <li>Generate Key: <code>php artisan key:generate</code></li>
                <li>Migrations: <code>php artisan migrate</code></li>
            </ul>
        </li>
        <li><strong>Crucial Note:</strong> If you modify the <code>.env</code> file, clear the cache inside the container:
            <br><code>docker exec spendo-backend php artisan optimize:clear</code>
        </li>
    </ul>

<hr>

<a name="es-español"></a>

<h2>Versión en español</h2>

<p>
    Esta API gestiona la lógica central de la aplicación Spendo, conectándose a una base de datos en Supabase con PostgreSQL. Construida con PHP 8.2 y Laravel 12.x, se enfoca en la seguridad, escalabilidad y un rastreo financiero preciso.
</p>

<h4>🚀 Características</h4>
    <ul>
        <li>
            <strong>Motor Multimoneda:</strong> Lógica avanzada para gestionar cuentas y transacciones en diferentes divisas (MXN, USD).
        </li>
        <li>
            <strong>Seguridad y Privacidad:</strong> Aislamiento de usuarios mediante Scopes y Policies, garantizando que los datos solo sean accesibles por su dueño.
        </li>
        <li>
            <strong>Arquitectura UUID:</strong> Seguridad mejorada utilizando identificadores únicos universales para todos los registros.
        </li>
        <li>
            <strong>Optimización para Supabase:</strong> Configurado para trabajar con el pooling de transacciones (PgBouncer) desactivando sentencias preparadas.
        </li>
        <li>
            <strong>Entorno Dockerizado:</strong> Contenedor basado en Apache con gestión automatizada de dependencias y permisos.
        </li>
    </ul>

<h4>🛠️ Stack Tecnológico</h4>
    <ul>
        <li><strong>Framework:</strong> Laravel 12.x</li>
        <li><strong>Base de Datos:</strong> PostgreSQL (Supabase)</li>
        <li><strong>Autenticación:</strong> Laravel Sanctum</li>
        <li><strong>Servidor:</strong> PHP 8.2 (Apache)</li>
        <li><strong>Infraestructura:</strong> Docker y Composer</li>
    </ul>

<h4>⚙️ Configuración e Instalación</h4>
    <ul>
        <li><strong>Opción A (Docker - Recomendado):</strong> 
            <code>docker-compose up -d --build spendo-backend</code>
        </li>
        <li><strong>Opción B (Desarrollo Local):</strong>
            <ul>
                <li>Instalar dependencias: <code>composer install</code></li>
                <li>Generar Clave: <code>php artisan key:generate</code></li>
                <li>Migraciones: <code>php artisan migrate</code></li>
            </ul>
        </li>
        <li><strong>Nota Crucial:</strong> Si modificas el archivo <code>.env</code>, limpia la caché dentro del contenedor:
            <br><code>docker exec spendo-backend php artisan optimize:clear</code>
        </li>
    </ul>

<hr>

<div align="center">
    <p>Developed by <strong>Eng. Alejandro Martínez</strong></p>
    <p><code>v1.2.0</code></p>
</div>
