<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Doctrine\ORM\Query;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/Menu.php');
  require_once(__DIR__.'/../../../config.php');

  class _Menu
  {
    private static $router;

    function __construct($api_version_base) {
      self::$router = new Router();
      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "@$api_version_base/menus",
        "controller" => function($body, $params, $user) {
          $this->handleGetMenus($user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "POST",
        "path" => "@$api_version_base/menus",
        "controller" => function($body, $params, $user) {
          $this->handleAddMenu($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "PATCH",
        "path" => "@$api_version_base/menus",
        "controller" => function($body, $params, $user) {
          $this->handleChangeMenu($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "DELETE",
        "path" => "[*]$api_version_base/menus/[i:id]",
        "controller" => function($body, $params, $user) {
          $this->handleDeleteMenu($params, $user);
        }
      ));
    }

    private function handleGetMenus($user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      $menus = CustomEntityManager::$entityManager
        ->getRepository("Menu")
        ->findBy(array(), array('menu_order' => 'ASC'));

      $_menus = array();
      foreach($menus as $item) {
        array_push($_menus, CustomEntityManager::getEntityArray($item, array(
          "id" => "getId",
          "url" => "getUrl",
          "title" => "getTitle",
          "order" => "getOrder"
        )));
      }
      CustomResponse::ajaxResponse($_menus);
      return;
    }

    private function handleAddMenu($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($body['url'])) {
        CustomResponse::ajaxError(400, array('url' => 'Необходимо указать url'));
        return;
      }

      if (!isset($body['title'])) {
        CustomResponse::ajaxError(400, array('title' => 'Необходимо указать заголовок меню'));
        return;
      }

      $menu = CustomEntityManager::updateEntity(new Menu(), $body, array(
        "title" => 'setTitle',
        "url" => 'setUrl',
      ));

      if (isset($body['order'])) {
        $menu->setOrder($body['order']);
      }

      CustomEntityManager::$entityManager->persist($menu);
      CustomEntityManager::$entityManager->flush();

      CustomResponse::ajaxResponse(CustomEntityManager::getEntityArray($menu, array(
        "title" => 'getTitle',
        "url" => 'getUrl',
        "id" => 'getId',
        "order" => 'getOrder'
      )));
      return;
    }

    private function handleChangeMenu($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($body['url'])) {
        CustomResponse::ajaxError(400, array('url' => 'Необходимо указать url'));
        return;
      }

      if (!isset($body['title'])) {
        CustomResponse::ajaxError(400, array('title' => 'Необходимо указать заголовок меню'));
        return;
      }

      if (!isset($body['id'])) {
        CustomResponse::ajaxError(400, array('title' => 'Необходимо указать id меню'));
        return;
      }

      $menu = CustomEntityManager::$entityManager->find('Menu', $body['id']);
      if (!$menu) {
        CustomResponse::ajaxError(400, 'Меню не найдено');
        return;
      }

      CustomEntityManager::updateEntity($menu, $body, array(
        "title" => 'setTitle',
        "url" => 'setUrl',
      ));
      
      if (isset($body['order'])) {
        $menu->setOrder($body['order']);
      }

      CustomEntityManager::$entityManager->flush();
      CustomResponse::ajaxResponse(array());
      return;
    }

    private function handleDeleteMenu($params, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($params['id'])) {
        CustomResponse::ajaxError(400, array('url' => 'Необходимо указать id'));
        return;
      }


      $menu = CustomEntityManager::$entityManager->find('Menu', $params['id']);
      if (!$menu) {
        CustomResponse::ajaxError(400, 'Меню не найдено');
        return;
      }

      CustomEntityManager::$entityManager->remove($menu);
      CustomEntityManager::$entityManager->flush();
      CustomResponse::ajaxResponse(array());
      return;
    }
  }

  new _Menu($api_version_base);
?>