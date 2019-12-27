<?php
namespace Response;

class CustomResponse
{
  public static function ajaxResponse($data)
  {
    echo json_encode(array(
      'data' => $data,
      'success' => true
    ), JSON_UNESCAPED_UNICODE);
    return;
  }

  public static function ajaxError($status = 400, $errors)
  {
    http_response_code($status);
    echo json_encode(array(
      'data' => $errors,
      'success' => false
    ), JSON_UNESCAPED_UNICODE);
    return;
  }
}
?>