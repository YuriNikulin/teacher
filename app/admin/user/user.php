<?php
  use CustomRouter\Router;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../../config.php');

  class _User
  {
    private static $router = array();
    function __construct($api_version_base) {
      self::$router = new Router();
      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "@$api_version_base/me",
        "controller" => function($body, $params, $user) {
          $this->handleMe($body, $user);
        }
      ));
    }

    private function handleMe($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      CustomResponse::ajaxResponse($user);
    }
  }

  new _User($api_version_base);
?>