<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response) {
            if (shouldRenderCustomErrorPages() && in_array($response->getStatusCode(), [403, 404])) {
                return Inertia::render('Error', ['status' => $response->getStatusCode()]);
            }

            return $response;
        });
    })->create();

function shouldRenderCustomErrorPages(): bool
{
    // if (app()->environment(['testing', 'local'])) {
    //     return false;
    // }

    return config('app.custom_error_pages_enabled');
}
