<?php

namespace App\Generic\Auth;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class JWT
{
    private string $appSecret;
    private RequestStack $requestStack;
    private int $expirationTime = 7*24 * 60 * 60; 

    public function __construct(RequestStack $requestStack, string $appSecret)
    {
        $this->appSecret = $appSecret;
        $this->requestStack = $requestStack;
    }

    public function encode(array $data)
    {
        $currentTime = time();
        $expirationTime = $currentTime + $this->expirationTime;

        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = base64_encode(json_encode(array_merge($data, ['exp' => $expirationTime])));
        $signature = hash_hmac('sha256', "$header.$payload", $this->appSecret, true);
        $signature = base64_encode($signature);

        return "$header.$payload.$signature";
    }

    public function decode(string $token)
    {
        list($header, $payload, $signature) = explode('.', $token);
        $data = json_decode(base64_decode($payload), true);

        if (isset($data['exp']) && $data['exp'] < time()) {
            throw new \Exception('Token has expired');
        }

        $expectedSignature = hash_hmac('sha256', "$header.$payload", $this->appSecret, true);
        $expectedSignature = base64_encode($expectedSignature);

        if ($signature !== $expectedSignature) {
            throw new \Exception('Invalid token signature');
        }

        return $data;
    }

    public function getJWTFromHeader(): ?string
    {
        $request = $this->requestStack->getCurrentRequest();

        if ($request instanceof Request) {
            $authorizationHeader = $request->headers->get('Authorization');

            if (0 === strpos($authorizationHeader, 'Bearer ')) {
                return substr($authorizationHeader, 7);
            }
        }

        return null;
    }
}
