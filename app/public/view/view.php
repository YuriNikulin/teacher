<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Doctrine\ORM\Query;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/Page.php');

  class PublicView
  {
    private static $router = array();
    function __construct() {
      self::$router = new Router();
      $allPages = CustomEntityManager::$entityManager->getRepository('Page')->createQueryBuilder('c')->getQuery()->getResult(Query::HYDRATE_ARRAY);
      foreach($allPages as $page) {
        self::$router::addRoute(array(
          "method" => "GET",
          "path" => $page['url'],
          "controller" => function($body, $params) use ($page) {
            $this->handleView($page);
          }
        ));
      }
    }

    private function handleView($page)
    {
      // echo $layout;
    // print_r($page);
      $title = $page['title'];
      $pageStyles = $page['styles'];
      include('template.php');
      return;
    }
  }

  new PublicView();
?>