<?php
  use CustomRouter\Router;
  use Database\CustomEntityManager;
  use Auth\CustomAuth;
  use Response\CustomResponse;
  require_once(__DIR__.'/../../entities/User.php');
  require_once(__DIR__.'/../../../config.php');

  class Auth
  {
    private static $router;
    private $handleLogin;
    private static $auth_expiration_time;

    function __construct($api_version_base, $auth_expiration_time) {
      self::$router = new Router();
      self::$auth_expiration_time = $auth_expiration_time;
      self::$router::addRoute(array(
        "method" => "POST",
        "path" => "@$api_version_base/login",
        "controller" => function($body, $params) {
          $this->handleLogin($body, $params);
        }
      ));

      self::$router::addRoute(array(
        "method" => "POST",
        "path" => "@$api_version_base/register",
        "controller" => function($body, $params, $user) {
          $this->handleRegister($body, $user);
        }
      ));

      self::$router::addRoute(array(
        "method" => "POST",
        "path" => "@$api_version_base/logout",
        "controller" => function($body, $params, $user) {
          $this->handleLogout($user);
        }
      ));
    }

    public function handleLogin($body) {
      $errors = array();
      $login = isset($body['login']) ? $body['login'] : null;
      $password = isset($body['password']) ? base64_decode($body['password']) : null;

      if (!$login) {
        $errors['login'] = 'Необходимо указать логин';
      } else {
        $user = CustomEntityManager::$entityManager->find('User', $login);
        if (!$user) {
          $errors['login'] = 'Пользователя с таким логином не существует';
        }
      }

      if (!$password) {
        $errors['password'] = 'Необходимо указать пароль';
      }

      if (!isset($user) || !$password) {
        CustomResponse::ajaxError(400, $errors);
        return;
      }

      $userPassword = $user->getPassword();
      $userLogin = $user->getLogin();
      $userIsAdmin = $user->getIsAdmin();
      $isPasswordCorrect = password_verify($password, $userPassword);

      if (!$isPasswordCorrect) {
        $errors['password'] = 'Введён неверный пароль';
      }

      if (!empty($errors)) {
        CustomResponse::ajaxError(400, $errors);
        return;
      }

      $token = CustomAuth::createToken($user->getLogin(), array(
        'login' => $userLogin,
        'is_admin' => $userIsAdmin
      ), time() + self::$auth_expiration_time);

      setcookie('auth_token', $token, time() + self::$auth_expiration_time, '/');

      CustomResponse::ajaxResponse(null);
      return;
    }

    private function handleRegister($body, $user) {
      $_user = CustomEntityManager::$entityManager->find('User', $user['login']);
      if (!$_user || !$_user->getIsAdmin()) {
        CustomResponse::ajaxError(403, 'Недостаточно прав для выполнения операции');
        return;
      }
      $errors = array();

      $login = isset($body['login']) ? $body['login'] : null;
      $password = isset($body['password']) ? base64_decode($body['password']) : null;
      if (!$login) {
        $errors['login'] = 'Необходимо указать логин';
      } else {
        if (strlen($login) < 3) {
          $errors['login'] = 'Длина логина должна составлять не менее 3 символов';
        }

        $existingUser = CustomEntityManager::$entityManager->find('User', $login);
        if ($existingUser) {
          $errors['login'] = 'Пользователь с таким логином уже существует';
        }
      }

      if (!$password) {
        $errors['password'] = 'Необходимо указать пароль';
      } else {
        if (strlen($password) < 6) {
          $errors['password'] = 'Длина пароля должна составлять не менее 6 символов';
        }
      }

      if (!empty($errors)) {
        CustomResponse::ajaxError(400, $errors);
        return;
      }
      
      try {
        $password = password_hash($password, PASSWORD_DEFAULT);
        $user = new User();
        $user->setLogin($login);
        $user->setPassword($password);
        CustomEntityManager::$entityManager->persist($user);
        CustomEntityManager::$entityManager->flush();
        $user = CustomEntityManager::$entityManager->find('User', $login);
        $response = array(
          'login' => $user->getLogin()
        );
        CustomResponse::ajaxResponse($response);
      } catch(Error $error) {
        CustomResponse::ajaxError(400, $error);
      }
      
    }

    private function handleLogout($user)
    {
      if (!$user || !isset($_COOKIE['auth_token'])) {
        CustomResponse::ajaxError(403, 'Необходимо войти в учётную запись');
        return;
      } else {
        unset($_COOKIE['auth_token']);
        setcookie('auth_token', '', time() - 3600, '/');
        CustomResponse::ajaxResponse(null);
      }
    }
  }

  $__auth = new Auth($api_version_base, $auth_expiration_time);
?>