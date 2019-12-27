<?php
  namespace Auth;

  use ReallySimpleJWT\Token;

  require_once 'vendor/autoload.php';
  require_once 'config.php';

  class CustomAuth {
    private static $secret;
    function __construct(
      $secret
    )
    {
      self::$secret = $secret;
    }

    public static function createToken($id, $payload = array(), $expTime = null)
    {
      if (!$expTime) {
        $expTime = time() + 5;
      }
      $token = Token::customPayload($payload, self::$secret, $expTime);
      return $token;
    }

    public static function validateToken($token)
    {
      $isValid = Token::validate($token, self::$secret);
      return $isValid;
    }

    public static function getPayloadToken($token) {
      $payload = Token::getPayload($token, self::$secret);
      return $payload;
    }
  }

  new CustomAuth($secret);
?>