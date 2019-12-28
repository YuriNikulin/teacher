<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Doctrine\ORM\Query;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/Page.php');
  require_once(__DIR__.'/../../../config.php');

  class _Page
  {
    private static $router;

    function __construct($api_version_base) {
      self::$router = new Router();
      self::$router::addRoute(array(
        "method" => "PUT",
        "path" => "@$api_version_base/page",
        "controller" => function($body, $params, $user) {
          $this->handleCreatePage($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "PATCH",
        "path" => "@$api_version_base/page",
        "controller" => function($body, $params, $user) {
          $this->handleChangePage($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "[*]$api_version_base/page/[i:id]",
        "controller" => function($body, $params, $user) {
          $this->handleGetPage($body, $params, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "[*]$api_version_base/page_list",
        "controller" => function($body, $params, $user) {
          // print_r($user);
          $this->handleGetPagesList($user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "POST",
        "path" => "@$api_version_base/page_layout",
        "controller" => function($body, $params, $user) {
          $this->handlePageLayoutChange($body, $user);
        }
      ));
    }

    private function handleCreatePage($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($body['name'])) {
        CustomResponse::ajaxError(400, array('name' => 'Необходимо указать название страницы'));
        return;
      }

      if (!isset($body['url'])) {
        CustomResponse::ajaxError(400, array('url' => 'Необходимо указать url страницы'));
        return;
      }

      $oldPage = CustomEntityManager::$entityManager
        ->getRepository('Page')
        ->findBy(['url' => $body['url']]);

      if ($oldPage) {
        CustomResponse::ajaxError(400, array('url' => 'Страница с таким url уже существует'));
        return;
      }
      
      $page = CustomEntityManager::updateEntity(new Page(), $body, array(
        "name" => 'setName',
        "title" => 'setTitle',
        "styles" => 'setStyles',
        "url" => 'setUrl'
      ));
      CustomEntityManager::$entityManager->persist($page);
      CustomEntityManager::$entityManager->flush();

      CustomResponse::ajaxResponse(CustomEntityManager::getEntityArray($page, array(
        "name" => 'getName',
        "title" => 'getTitle',
        "styles" => 'getStyles',
        "url" => 'getUrl'
      )));
      return;
    }

    private function handleChangePage($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($body['id'])) {
        CustomResponse::ajaxError(400, 'Необходимо указать id');
        return;
      }
      
      $page = CustomEntityManager::$entityManager->find('Page', $body['id']);
      if (!$page) {
        CustomResponse::ajaxError(400, 'Страница не найдена');
        return;
      }
      
      $page = CustomEntityManager::updateEntity($page, $body, array(
        "name" => 'setName',
        "title" => 'setTitle',
        "styles" => 'setStyles',
        "url" => 'setUrl'
      ));
      CustomEntityManager::$entityManager->flush();

      CustomResponse::ajaxResponse(CustomEntityManager::getEntityArray($page, array(
        "name" => 'getName',
        "title" => 'getTitle',
        "styles" => 'getStyles',
        "url" => 'getUrl'
      )));
      return;
    }

    private function handleGetPage($body, $params, $user)
    {
      
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($params['id'])) {
        CustomResponse::ajaxError(400, 'Необходимо указать id');
        return;
      }

      $page = CustomEntityManager::$entityManager->find('Page', $params['id']);
      $blocks = $page->getBlocks();
      $page = CustomEntityManager::getEntityArray($page, array(
        "id" => "getId",
        "name" => "getName",
        "title" => "getTitle",
        "styles" => "getStyles",
        "url" => "getUrl",
      ));
      $page['blocks'] = $blocks->map(function($block) {
          return CustomEntityManager::getEntityArray($block, array(
            "id" => "getId",
            "name" => "getName",
            "layout" => "getLayout"
          ));
        })->toArray();

      CustomResponse::ajaxResponse($page);
      return;
    }

    private function handlePageLayoutChange($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($body['id'])) {
        CustomResponse::ajaxError(400, 'Необходимо указать id');
        return;
      }

      $page = CustomEntityManager::$entityManager->find('Page', $body['id']);
      if (!$page) {
        CustomResponse::ajaxError(400, 'Страница не найдена');
        return;
      }

      if (!isset($body['data'])) {
        CustomResponse::ajaxError(400, 'Необходимо указать данные');
        return;
      }

      $page->rearrangeBlocks($body['data']);
      CustomEntityManager::$entityManager->flush();

      $blocks = $page->getBlocks();
      $blocks = $blocks->map(function($block) {
        return CustomEntityManager::getEntityArray($block, array(
          "id" => "getId",
          "name" => "getName",
          "layout" => "getLayout"
        ));
      })->toArray();

      CustomResponse::ajaxResponse($blocks);
      return;
    }

    private function handleGetPagesList($user)
    {
      // print_r($user);
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      $pages = CustomEntityManager::$entityManager
        ->getRepository("Page")
        ->findAll();

      $_pages = array();
      foreach($pages as $item) {
        array_push($_pages, CustomEntityManager::getEntityArray($item, array(
          "id" => "getId",
          "name" => "getName",
          "url" => "getUrl",
          "styles" => "getStyles",
          "title" => "getTitle"
        )));
      }
      CustomResponse::ajaxResponse($_pages);
    }
  }

  new _Page($api_version_base);
?>