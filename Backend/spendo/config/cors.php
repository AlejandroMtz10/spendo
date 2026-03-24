<?php

return [
    'paths' => ['api/*','dashboard/*', 'register', 'login', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173','http://localhost:8080', 'http://localhost:8000','http://localhost'], // URL frontend React Vite
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];