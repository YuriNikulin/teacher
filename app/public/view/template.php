<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link href="/teacher/front/public/dist/main.css" rel="stylesheet">
  <title>
   <?= $page['title'] ?>
  </title>
  <?php 
    if ($favicon) {
      echo("<link rel='icon' type='image/png' sizes='16x16' href='$favicon'>");
    }
  ?>
  <style>
    <?= $styles ?>
  </style>
</head>
<body>
  <?= $header ?>
  <?= $page['layout'] ?>
  <!-- <script type="module" src="/teacher/front/public_src/index.js"></script> -->
  <script src="/teacher/front/public/dist/bundle.js"></script>
</body>
</html>