<?php
use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Database\CustomEntityManager;

require_once 'index.php';

return ConsoleRunner::createHelperSet(CustomEntityManager::$entityManager);
