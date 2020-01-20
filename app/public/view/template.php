<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <title>
   <?= $page['title'] ?>
  </title>
  <style>
    <?= $page['styles'] ?>
  </style>
</head>
<body>
  <?= $page['layout'] ?>
  <!-- <script type="module" src="/teacher/front/public_src/index.js"></script> -->
  <script src="/teacher/front/public/dist/bundle.js"></script>
</body>
</html>