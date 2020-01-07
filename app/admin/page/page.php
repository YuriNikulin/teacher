<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Doctrine\ORM\Query;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  use Controller\_Block;
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

      self::$router::addRoute(array(
        "method" => "DELETE",
        "path" => "[*]$api_version_base/page/[i:id]",
        "controller" => function($body, $params, $user) {
          $this->handleDeletePage($params, $user);
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
        "url" => 'getUrl',
        "id" => 'getId'
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

      if (isset($body['url'])) {
        $pageWithSameUrl = CustomEntityManager::$entityManager
          ->getRepository('Page')
          ->findBy(['url' => $body['url']]);
        
        if ($pageWithSameUrl) {
          foreach ($pageWithSameUrl as $item) {
            if ($item->getId() !== $page->getId()) {
              CustomResponse::ajaxError(400, array('url' => 'Страница с таким url уже существует'));
              return;
            }
          }
        }
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
        "url" => 'getUrl',
        "id" => 'getId'
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

      if (!$page) {
        CustomResponse::ajaxError(400, 'Страница не найдена');
        return;
      }

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
            "layout" => "getLayout",
            "title" => "getTitle",
            "styles" => "getStyles"
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

      $resultBlocksIds = array();
      foreach($body['data'] as $index=>$block) {
        if (isset($block['isNew'])) {
          $_block = _Block::handleCreateBlock($block, $page->getId());
          array_push($resultBlocksIds, $_block->getId());
        } else if (isset($block['isDeleted']) && $block['isDeleted']) {
          _Block::handleDeleteBlock($block['id']);
        } else if (isset($block['isTouched']) && $block['isTouched']) {
          $_block = _Block::handleChangeBlock($block['id'], $block);
          array_push($resultBlocksIds, $_block->getId());
        }
      }

      $page->rearrangeBlocks($resultBlocksIds);
      CustomEntityManager::$entityManager->flush();
      // sleep(2);
      // $page = CustomEntityManager::$entityManager->find('Page', $body['id']);
      $blocks = $page->getBlocks();

      // $blocks = $blocks->map(function($block) {
      //   return CustomEntityManager::getEntityArray($block, array(
      //     "id" => "getId",
      //     "name" => "getName",
      //     "title" => "getTitle",
      //     "styles" => "getStyles",
      //     "layout" => "getLayout"
      //   ));
      // })->toArray();

      CustomResponse::ajaxResponse($blocks);
      return;
    }

    private function handleGetPagesList($user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      $pages = CustomEntityManager::$entityManager
        ->getRepository("Page")
        ->findBy(array(), array('id' => 'ASC'));

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

    private function handleDeletePage($params, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($params['id'])) {
        CustomResponse::ajaxError(400, 'Необходимо указать id страницы');
        return;
      }

      $page = CustomEntityManager::$entityManager->find('Page', $params['id']);
      if (!$page) {
        CustomResponse::ajaxError(400, 'Страница не найдена');
        return;
      }

      $id = $page->getId();

      CustomEntityManager::$entityManager->remove($page);
      CustomEntityManager::$entityManager->flush();
      CustomResponse::ajaxResponse($id);
      return;
    }
  }

  new _Page($api_version_base);
?>