<?php
  $base_path = "/teacher";
  $public_url = "http://localhost";
  $db_conn = array(
    "isDevMode" => true,
    'proxyDir' => null,
    'cache' => null,
    'useSimpleAnnotationReader' => false,
    'conn' => array(
      'driver' => 'pdo_pgsql',
      'dbname' => 'dbname',
      'host' => '127.0.0.1',
      'port' => '5432',
      'user' => 'user',
      'password' => 'password'
    ),
  );
  $secret = 'secret';
  $api_version_base = 'api/v1';
  $auth_expiration_time = 60 * 60;
?>