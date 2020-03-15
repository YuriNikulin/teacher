<?php
  use CustomRouter\Router;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  use Database\CustomEntityManager;
  require_once(__DIR__.'/../../../config.php');
  require_once(__DIR__.'/../../entities/Settings.php');

  class _Settings
  {
    private static $router = array();
    private static $auth_expiration_time;
    function __construct($api_version_base, $auth_expiration_time) {
      self::$router = new Router();
      self::$auth_expiration_time = $auth_expiration_time;
      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "[*]$api_version_base/settings",
        "controller" => function($body, $params, $user) {
          $this->handleGetSettings($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "PATCH",
        "path" => "[*]$api_version_base/settings",
        "controller" => function($body, $params, $user) {
          $this->handleChangeSettings($body, $user);
        }
      ));
    }

    private function handleGetSettings($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      
      $settings = Settings::getEntity();

      $_settings = $settings->getSettings();

      CustomResponse::ajaxResponse($_settings);
    }

    private function handleChangeSettings($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      
      if (!$body) {
        CustomResponse::ajaxError(400, 'Необходимо указать настройки');
        return;
      }

      $settings = Settings::getEntity();

      $_settings = $settings->setSettings($body);

      CustomResponse::ajaxResponse($_settings);
    }
  }

  new _Settings($api_version_base, $auth_expiration_time);
?>