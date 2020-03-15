<?php
  use CustomRouter\Router;
  use Auth\CustomAuth;
  use Response\CustomResponse;

  class View
  {
    private static $router = array();
    function __construct() {
      self::$router = new Router();
      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "/teacher/admin[*]?",
        "controller" => function() {
          $this->handleIndex();
        }
      ));
    }

    private function handleIndex()
    {
      include(__DIR__.'/../../../front/admin/dist/index.html');
    }
  }

  new View();
?>