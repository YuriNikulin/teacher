<?php
use Doctrine\ORM\Mapping as ORM;
// src/Image.php

/**
 * @ORM\Entity
 * @ORM\Table(name="images")
 */
class Image
{
    /** 
     * @ORM\Id
     * @ORM\Column(type="string") 
     */
    protected $id;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $url;

    /** 
     * @ORM\ManyToOne(targetEntity="Page", inversedBy="images")
     */
    protected $parent;

    /** 
     * @ORM\Column(type="string", nullable=true)
     */
    protected $alt;


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

    public function getUrl()
    {
        return $this->url;
    }

    public function setUrl($url)
    {
        $this->url = $url;
    }

    public function getAlt()
    {
        return $this->alt;
    }

    public function setAlt($alt)
    {
        $this->alt = $alt;
    }
}
?>