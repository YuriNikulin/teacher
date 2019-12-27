<?php
namespace Database;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
require_once 'config.php';

class CustomEntityManager
{
    public static $entityManager;

    function __construct($db_conn) {
        $config = Setup::createAnnotationMetadataConfiguration(
            array(__DIR__."/app/entities"),
            $db_conn['isDevMode'],
            $db_conn['proxyDir'],
            $db_conn['cache'],
            $db_conn['useSimpleAnnotationReader']
        );
        self::$entityManager = EntityManager::create($db_conn['conn'], $config);
    }

    public static function updateEntity($entity, $body, $mappings)
    {
        foreach($mappings as $paramKey=>$updator) {
            if (isset($body[$paramKey])) {
                $entity->$updator($body[$paramKey]);
            }
        }
        return $entity;
    }

    public static function getEntityArray($entity, $mappings)
    {
        $array = array();
        foreach($mappings as $paramKey=>$getter) {
            $array[$paramKey] = $entity->$getter();
        }
        return $array;
    }
}

new CustomEntityManager($db_conn);
?>