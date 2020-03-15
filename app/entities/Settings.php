<?php
use Doctrine\ORM\Mapping as ORM;
use Database\CustomEntityManager;

/**
 * @ORM\Entity
 * @ORM\Table(name="settings")
 */
class Settings
{
    /** 
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /** 
     * @ORM\Column(type="string", nullable=true) 
     */
    protected $favicon;

    /** 
     * @ORM\Column(type="string", nullable=true) 
     */
    protected $logo;

    /** 
     * @ORM\Column(type="string", nullable=true) 
     */
    protected $site_background;

    /** 
     * @ORM\Column(type="string", nullable=true) 
     */
    protected $site_background_image;

    /** 
     * @ORM\Column(type="string", nullable=true)
     */
    protected $content_background;


    public function getFavicon()
    {
        return $this->favicon;
    }

    public function setFavicon($favicon)
    {
        $this->favicon = $favicon;
    }

    public function getLogo()
    {
        return $this->logo;
    }

    public function setLogo($logo)
    {
        $this->logo = $logo;
    }

    public function getSiteBackground()
    {
        return $this->site_background;
    }

    public function setSiteBackground($site_background)
    {
        $this->site_background = $site_background;
    }

    public function getSiteBackgroundImage()
    {
        return $this->site_background_image;
    }

    public function setSiteBackgroundImage($site_background_image)
    {
        $this->site_background_image = $site_background_image;
    }

    public function getContentBackground()
    {
        return $this->content_background;
    }

    public function setContentBackground($content_background)
    {
        $this->content_background = $content_background;
    }

    public function getSettings()
    {
        return array(
            'favicon' => $this->getFavicon(),
            'logo' => $this->getLogo(),
            'site_background' => $this->getSiteBackground(),
            'site_background_image' => $this->getSiteBackgroundImage(),
            'content_background' => $this->getContentBackground()
        );
    }

    public function setSettings($settings)
    {
        $columns = CustomEntityManager::$entityManager->getClassMetadata(Settings::class)->getColumnNames();
        // foreach($settings as $key=>$value) {
        //     $setter = "set".ucfirst($key);
        //     if (method_exists($this, $setter)) {
        //         $this->$setter($value);
        //     }
        // }
        CustomEntityManager::updateEntity($this, $settings, array(
            "favicon" => 'setFavicon',
            "logo" => 'setLogo',
            "site_background" => 'setSiteBackground',
            "site_background_image" => 'setSiteBackgroundImage',
            "content_background" => 'setContentBackground'
        ));
        CustomEntityManager::$entityManager->flush();
    }

    public static function getEntity()
    {
        return CustomEntityManager::$entityManager
        ->find('Settings', 0);
    }
}
?>