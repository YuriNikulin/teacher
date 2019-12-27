<?php
namespace CustomRouter;
// require_once 'db.php';

use AltoRouter;
use Auth\CustomAuth;

$router = new AltoRouter();
$router->setBasePath($base_path);

class Router
{
  public static $routes = array();

  public static function addRoute($route)
  {
    array_push(self::$routes, $route);
  }

  public static function getRoutes()
  {
    return self::$routes;
  }
}

require_once './app/index.php';

// var_dump(Router::g/etRoutes());

$allRoutes = Router::getRoutes();
foreach($allRoutes as $routeObject) {
  // print_r($routeObject);
  $router->map(
    $routeObject['method'],
    $routeObject['path'],
    $routeObject['controller']
  );
}


$match = $router->match();
if ($match && $match['target'] && is_callable($match['target'])) {
  $rawContent = file_get_contents('php://input');
  $user = null;
  $requestBody = null;
  if ($rawContent) {
    $requestBody = json_decode($rawContent, true);
  }
  // print_r($match);

  if (isset($_COOKIE['auth_token'])) {
    if (!CustomAuth::validateToken($_COOKIE['auth_token'])) {
      echo 'token is not valid btw';
    } else {
      $user = CustomAuth::getPayloadToken($_COOKIE['auth_token']);
    }
  }
  $match['target']($requestBody, $match['params'], $user, $_REQUEST);
} else {
  print('not found');
  // die();
}
?>