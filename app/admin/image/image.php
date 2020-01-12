<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/Image.php');
  require_once(__DIR__.'/../../../config.php');

  class _Image
  {
    private static $router;
    private static $public_url;

    function __construct($api_version_base, $public_url) {
      self::$public_url = $public_url;
      self::$router = new Router();
      self::$router::addRoute(array(
        "method" => "post",
        "path" => "@$api_version_base/image",
        "controller" => function($body, $params, $user) {
          $this->handleImageUpload($body, $user);
        }
      ));
    }

    public static function handleImageUpload($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }

      if (!isset($_FILES['image'])) {
        CustomResponse::ajaxError(400, 'Необходимо прикрепить изображение');
        return;
      }

      $page = null;
      if (isset($_POST['page_id'])) {
        $page = CustomEntityManager::$entityManager->find('Page', $_POST['page_id']);
        if (!$page) {
          CustomResponse::ajaxError(400, 'Страница не найдена');
          return;
        }
      }

      $image = $_FILES['image'];

      $folder = realpath(__DIR__.'/../../../front/public/images/');
      if (!$folder) {
        mkdir(__DIR__.'/../../../front/public/images', 0777, true);
        $folder = realpath(__DIR__.'/../../../front/public/images/');
      }
      $target = $folder.'/'.$image["name"];
      if(file_exists($target)) {
        $count = 1;
        while (file_exists($target)) {
          $target = $folder.'/'."($count)".$image["name"];
          $count += 1;
        }
      }
      move_uploaded_file($_FILES['image']['tmp_name'], $target);

      $image = new Image();
      $image->setId($target);
      preg_match("/\/teacher\/front\/public\/images\/.+/", $target, $name);
      $image->setUrl(self::$public_url.$name[0]);
      if ($page) {
        $image->setParent($page);
      }
      CustomEntityManager::$entityManager->persist($image);
      CustomEntityManager::$entityManager->flush();
      CustomResponse::ajaxResponse(array("url" => $image->getUrl()));
    }
  }

  new _Image($api_version_base, $public_url);
?>