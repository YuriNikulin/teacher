<?php
// src/Block.php

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="blocks")
 */
class Block
{
    /** 
     * @ORM\Id
     * @ORM\Column(type="string") 
     */
    protected $id;

    /** 
     * @ORM\ManyToOne(targetEntity="Page", inversedBy="blocks")
     */
    protected $parent;

    /** 
     * @ORM\Column(type="text") 
     */
    protected $layout;

    /** 
     * @ORM\Column(type="string", nullable=true)
     */
    protected $title;

    /** 
     * @ORM\Column(type="string", nullable=true)
     */
    protected $styles;

    /** 
     * @ORM\Column(type="text", nullable=true)
     */
    protected $name;

    /** 
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $order_in_page;

    /** 
     * @ORM\Column(type="boolean")
     */
    protected $is_hidden;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getParent()
    {
        return $this->parent;
    }

    public function setParent($parent)
    {
        $this->parent = $parent;
    }

    public function getLayout()
    {
        return $this->layout;
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
    }

    public function getStyles()
    {
        return $this->styles;
    }

    public function setStyles($styles)
    {
        $this->styles = $styles;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getOrder()
    {
        return $this->order_in_page;
    }

    public function setOrder($order_in_page)
    {
        $this->order_in_page = $order_in_page;
    }

    public function getIsHidden()
    {
        return $this->is_hidden;
    }

    public function setIsHidden($is_hidden)
    {
        $this->is_hidden = $is_hidden;
    }
}
?>