<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class Keycloak
{

    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['error' => 'Unauthorized: Token ausente'], 401);
        }

        $token = substr($authHeader, 7);

        try {
            $decoded = $this->decodeToken($token);

            // Injeta o payload decodificado na request
            $request->merge(['jwt_payload' => (array) $decoded]);

            return $next($request);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Token inválido',
                'message' => $e->getMessage()
            ], 401);
        }
    }


    protected function decodeToken(string $jwt)
    {
        $keycloakUrl = config('services.keycloak.base_url');
        $realm = config('services.keycloak.realm');

        $jwkUrl = "{$keycloakUrl}/realms/{$realm}/protocol/openid-connect/certs";

        $response = Http::get($jwkUrl);
        if (!$response->ok()) {
            throw new \Exception("Não foi possível buscar as chaves públicas do Keycloak");
        }

        $jwk = $response->json();

        return JWT::decode($jwt, JWK::parseKeySet($jwk));
    }
}
