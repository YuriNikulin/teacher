<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Doctrine\ORM\Query;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/Page.php');
  require_once(__DIR__.'/../../entities/Settings.php');

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

    private function getHeader($settings)
    {
      $settings = Settings::getEntity();
      $header = '<header class="header"><div class="header-content container">';
      $logo = $settings->getLogo();
      $menus = CustomEntityManager::$entityManager
        ->getRepository("Menu")
        ->findBy(array(), array('menu_order' => 'ASC'));
      if (!$logo && !$menus) {
        return '';
      }

      if ($logo) {
        $header = $header . "<div class='header__logo'><img src='$logo' /></div>";
      }

      
      if ($menus) {
        $header = $header . '<nav class="header-menu"><ul>';
        foreach($menus as $item) {
          $url = $item->getUrl();
          $title = $item->getTitle();
          $header = $header . "<li class='header-menu__item'><a href='$url'>$title</a></li>";
        };
        $header = $header . '</ul></nav>';
      }

      $header = $header . '</div></header>';
      return $header;
    }

    private function getSettingsStyles($styles, $settings)
    {
      $siteBackground = $settings->getSiteBackground();
      $siteBackgroundImage = $settings->getSiteBackgroundImage();
      $contentBackground = $settings->getContentBackground();
      if (!$siteBackground && !$siteBackgroundImage && !$contentBackground) {
        return $styles;
      }

      $styles = $styles . '';
      if ($siteBackgroundImage) {
        $styles = $styles . "body {  background: url('$siteBackgroundImage'); }";
      } 
      if ($siteBackground) {
        $styles = $styles . "body { $siteBackground; }";
      }

      if ($contentBackground) {
        $styles = $styles . ".block-wrapper { background: $contentBackground }";
      }
      return $styles;
    }

    private function handleView($page)
    {
      $title = $page['title'];
      $styles = $page['styles'];
      $settings = Settings::getEntity();
      $styles = $this->getSettingsStyles($styles, $settings);
      $header = $this->getHeader($settings);
      $favicon = $settings->getFavicon();
      include('template.php');
      return;
    }
  }

  new PublicView();
?>