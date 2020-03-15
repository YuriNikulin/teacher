<?php
use Doctrine\ORM\Mapping as ORM;
// src/Image.php

/**
 * @ORM\Entity
 * @ORM\Table(name="menus")
 */
class Menu
{
    /** 
     * @ORM\Id
     * @ORM\Column(type="string")
     * @ORM\GeneratedValue
     */
    protected $id;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $url;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $title;

    /** 
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $menu_order;


    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function setUrl($url)
    {
        $this->url = $url;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getOrder()
    {
        return $this->menu_order;
    }

    public function setOrder($order)
    {
        $this->menu_order = $order;
    }
}
?>