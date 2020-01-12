<?php
// src/Page.php

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity
 * @ORM\Table(name="pages")
 */
class Page
{
    /** 
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /** 
     * @ORM\Column(type="string")
     */
    protected $url;

    /** 
     * @ORM\Column(type="text", nullable = true)
     */
    protected $layout;

    /**
     * @ORM\OneToMany(targetEntity="Block", mappedBy="parent", cascade={"remove"})
     */
    protected $blocks;

    /** 
     * @ORM\Column(type="string", nullable=true)
     * @ORM\OrderBy({"order_in_page"="DESC"})
     */
    protected $title;

    /** 
     * @ORM\OneToMany(targetEntity="Image", mappedBy="parent", cascade={"remove"})
     */
    protected $images;

    /** 
     * @ORM\Column(type="string", nullable=true)
     */
    protected $styles;

    /** 
     * @ORM\Column(type="text")
     */
    protected $name;

    public function __construct()
    {
        $this->blocks = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getLayout()
    {
        return $this->layout;
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function setUrl($url)
    {
        $this->url = $url;
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

    public function getBlocks(): Collection
    {
        $iterator = $this->blocks->getIterator();
        $iterator->uasort(function ($a, $b) {
            return $a->getOrder() <=> $b->getOrder();
        });

        return new ArrayCollection(iterator_to_array($iterator));
    }

    public function rearrangeBlocks($reorderedBlocksIds)
    {  
        $blocks = $this->blocks;
        foreach ($reorderedBlocksIds as $index=>$blockId) {
            $currentThisBlock = $blocks->filter(function($item) use ($blockId) {
                return $item->getId() === $blockId;
            })->first();
            if ($currentThisBlock) {
                $currentThisBlock->setOrder($index);
            }
        }
    }

    public function updateLayout()
    {
        function replaceImages(&$layout) {
            preg_match_all('/<img[^>]+>/i', $layout, $images);
            foreach ($images[0] as $image) {
                $secureImg = str_replace('src', 'data-src', $image);
                $layout = str_replace($image, $secureImg, $layout);
            }
            return $layout;
        }

        $blocks = $this->getBlocks();
        $layout = '';
        $blocks->map(function($item) use (&$layout) {
            if (!$item->getIsHidden()) {
                $layout = $layout . $item->getLayout();
            }
        });
        $this->setLayout(replaceImages($layout));
    }
}
?>