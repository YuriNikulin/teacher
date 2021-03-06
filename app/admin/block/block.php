<?php
  namespace Controller;
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
    }

    public static function handleCreateBlock($body, $parent_id)
    {
      if ($parent_id) {
        $page = CustomEntityManager::$entityManager->find('Page', $parent_id);
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

      $block = CustomEntityManager::updateEntity(new \Block(), $body, array(
        "name" => 'setName',
        "title" => 'setTitle',
        "styles" => 'setStyles',
        "is_hidden" => 'setIsHidden',
        "attachments" => 'setAttachments'
      ));

      if ($page) {
        $block->setParent($page);
      }
      
      $block->setLayout($layout);
      $time = time();
      $suffix = $parent_id ? $parent_id : 'common';
      $random = rand(0, 10000);
      $block->setId("$suffix" . "_$time" . "_$random");
      CustomEntityManager::$entityManager->persist($block);
      return $block;
    }

    public static function handleChangeBlock($blockId, $data)
    {
      $block = CustomEntityManager::$entityManager->find('Block', $blockId);
      if (!$block) {
        return;
      }
      $block = CustomEntityManager::updateEntity($block, $data, array(
        "name" => 'setName',
        "title" => 'setTitle',
        "styles" => 'setStyles',
        "layout" => 'setLayout',
        "is_hidden" => 'setIsHidden',
        "attachments" => 'setAttachments'
      ));
      return $block;
    }

    public static function handleDeleteBlock($blockId)
    {
      $block = CustomEntityManager::$entityManager->find('Block', $blockId);
      if (!$block) {
        return;
      }
      CustomEntityManager::$entityManager->remove($block);
    }
  }

  new _Block($api_version_base);
?>