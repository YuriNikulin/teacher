<?php
  $base_path = "/teacher";
  $db_conn = array(
    "isDevMode" => true,
    'proxyDir' => null,
    'cache' => null,
    'useSimpleAnnotationReader' => false,
    'conn' => array(
      'driver' => 'pdo_pgsql',
      'dbname' => 'teacher',
      'host' => '127.0.0.1',
      'port' => '5432',
      'user' => 'postgres',
      'password' => 'db_password'
    ),
  );
  $secret = 'secret';
  $api_version_base = 'api/v1';
  $auth_expiration_time = 60 * 60;
?>