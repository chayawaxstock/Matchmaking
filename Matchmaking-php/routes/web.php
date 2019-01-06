<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  *');
header('Access-Control-Allow-Headers:  *');
Route::get('/', function () {
    return view('welcome');
});
Route::get('/allUsers', 'UserController@index');
Route::get('/allTypes', 'UserController@getAllType');
Route::get('/allHassids', 'UserController@getAllHassids');
Route::post('/login','AuthController@login');

Route::group([
    'middleware' => 'Cors',

], function () {

    Route::post('foo11', function () {
        return response()->json('hhhh',200);
    });
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

Route::post
('/test', function(){ return 'ooo'; });
