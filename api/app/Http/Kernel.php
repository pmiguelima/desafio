<?php

namespace App\Http;

use App\Http\Middleware\Keycloak;
use Illuminate\Foundation\Http\Kernel as HttpKernel;


class Kernel extends HttpKernel
{
    protected $routMiddleware = [
        'auth.keycloak' => Keycloak::class,
    ];
}
