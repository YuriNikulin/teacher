<?php
  use CustomRouter\Router;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  use Database\CustomEntityManager;
  require_once(__DIR__.'/../../../config.php');
  require_once(__DIR__.'/../auth/auth.php');

  class _User
  {
    private static $router = array();
    private static $auth_expiration_time;
    function __construct($api_version_base, $auth_expiration_time) {
      self::$router = new Router();
      self::$auth_expiration_time = $auth_expiration_time;
      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "[*]$api_version_base/me",
        "controller" => function($body, $params, $user) {
          $this->handleMe($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "GET",
        "path" => "@$api_version_base/users",
        "controller" => function($body, $params, $user) {
          $this->handleGetUsers($user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "PATCH",
        "path" => "[*]$api_version_base/users/[*:login]",
        "controller" => function($body, $params, $user) {
          $this->handleChangeUser($body, $params, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "DELETE",
        "path" => "[*]$api_version_base/users/[*:login]",
        "controller" => function($body, $params, $user) {
          $this->handleDeleteUser($body, $params, $user);
        }
      ));
    }

    private function handleMe($body, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      CustomResponse::ajaxResponse($user);
    }

    private function handleGetUsers($user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      $requestingUser = CustomEntityManager::$entityManager->find('User', $user['login']);
      if (!$requestingUser) {
        CustomResponse::ajaxError(400, 'Пользователь не найден');
        return;
      }
      if (!$requestingUser->getIsAdmin()) {
        CustomResponse::ajaxError(403, 'Недостаточно прав для выполнения операции');
        return;
      }
      
      $users = CustomEntityManager::$entityManager
        ->getRepository("User")
        ->findBy(array());

      $_users = array();
      foreach($users as $item) {
        array_push($_users, CustomEntityManager::getEntityArray($item, array(
          "login" => "getLogin",
        )));
      }

      CustomResponse::ajaxResponse($_users);
    }

    private function handleChangeUser($body, $params, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      $userToBeUpdated = CustomEntityManager::$entityManager->find('User', $params['login']);
      $requestingUser = CustomEntityManager::$entityManager->find('User', $user['login']);
      if (!$userToBeUpdated || !$requestingUser) {
        CustomResponse::ajaxError(400, 'Пользователь не найден');
        return;
      }
      if (!$requestingUser->getIsAdmin() && $user['login'] !== $params['login']) {
        CustomResponse::ajaxError(403, 'Недостаточно прав для выполнения операции');
        return;
      }

      if (!isset($body['currentPassword'])) {
        CustomResponse::ajaxError(400, 'Необходимо указать пароль');
      }

      $errors = array();

      $currentPassword = base64_decode($body['currentPassword']);
      if (isset($body['newPassword'])) {
        $newPassword = base64_decode($body['newPassword']);
      }
      $isPasswordCorrect = password_verify($currentPassword, $requestingUser->getPassword());
      if (!$isPasswordCorrect) {
        $errors['currentPassword'] = 'Введён неверный пароль';
      }

      if (isset($body['login'])) {
        if ($body['login'] !== $userToBeUpdated->getLogin() && CustomEntityManager::$entityManager->find('User', $body['login'])) {
          $errors['login'] = 'Пользователь с таким логином уже существует';
        }
      }

      if (!empty($errors)) {
        CustomResponse::ajaxError(400, $errors);
        return;
      }

      if (isset($body['login'])) {
        $userToBeUpdated->setLogin($body['login']);
      }

      if (isset($newPassword)) {
        $userToBeUpdated->setPassword(password_hash($newPassword, PASSWORD_DEFAULT));
      }

      CustomEntityManager::$entityManager->flush();
      if ($userToBeUpdated === $requestingUser) {
        $token = CustomAuth::createToken($userToBeUpdated->getLogin(), array(
          'login' => $userToBeUpdated->getLogin(),
          'is_admin' => $userToBeUpdated->getIsAdmin()
        ), time() + self::$auth_expiration_time);
  
        setcookie('auth_token', $token, time() + self::$auth_expiration_time, '/');
      }
      CustomResponse::ajaxResponse(array(
        'login' => $userToBeUpdated->getLogin()
      ));

    }

    private function handleDeleteUser($body, $params, $user)
    {
      if (!$user) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      }
      $userToBeDeleted = CustomEntityManager::$entityManager->find('User', $params['login']);
      $requestingUser = CustomEntityManager::$entityManager->find('User', $user['login']);
      if (!$userToBeDeleted || !$requestingUser) {
        CustomResponse::ajaxError(400, 'Пользователь не найден');
        return;
      }

      if (!$requestingUser->getIsAdmin()) {
        CustomResponse::ajaxError(403, 'Недостаточно прав для выполнения операции');
        return;
      }

      CustomEntityManager::$entityManager->remove($userToBeDeleted);
      CustomEntityManager::$entityManager->flush();
      CustomResponse::ajaxResponse($params['login']);
    }
  }

  new _User($api_version_base, $auth_expiration_time);
?>