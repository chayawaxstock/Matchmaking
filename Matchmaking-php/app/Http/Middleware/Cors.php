<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
       // $response = $next($request)->header('Access-Control-Allow-Headers', '*')->header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE')
      //  ->header('Access-Control-Allow-Origin', '*');
       // $response->header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
      //  $response->header('Access-Control-Allow-Headers', '*'));
       // $response->header('Access-Control-Allow-Origin', '*');
        return $next($request);
    }
}
