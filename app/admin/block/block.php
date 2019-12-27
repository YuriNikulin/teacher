<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/Block.php');
  require_once(__DIR__.'/../../../config.php');

  class _Block
  {
    private static $router;

    function __construct($api_version_base) {
      self::$router = new Router();
      self::$router::addRoute(array(
        "method" => "PUT",
        "path" => "@$api_version_base/blocks",
        "controller" => function($body, $params, $user) {
          $this->handleCreateBlock($body, $user);
        }
      ));
    }

    private function handleCreateBlock($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (isset($body['parent_id'])) {
        $page = CustomEntityManager::$entityManager->find('Page', $body['parent_id']);
        if (!$page) {
          CustomResponse::ajaxError(400, 'Страница не найдена');
          return;
        }
      }

      
      if (!isset($body['layout']) || !strlen(trim($body['layout']))) {
        $layout = '<div></div>';
      } else {
        $layout = $body['layout'];
      }
      
      // print Bool(strlen(trim($body['layout'])));
      // echo $layout;

      $block = CustomEntityManager::updateEntity(new Block(), $body, array(
        "name" => 'setName',
        "title" => 'setTitle',
        "styles" => 'setStyles'
      ));

      if ($page) {
        $block->setParent($page);
      }
      
      $block->setLayout($body['layout']);
      $time = time();
      $suffix = isset($body['parent_id']) ? $body['parent_id'] : 'common';
      $random = rand(0, 10000);
      $block->setId("$time" . "_$random" . "_$suffix");
      CustomEntityManager::$entityManager->persist($block);
      CustomEntityManager::$entityManager->flush();
    }
  }

  new _Block($api_version_base);
?>