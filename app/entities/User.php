<?php
// src/Product.php

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User
{
    /** 
     * @ORM\Id
     * @ORM\Column(type="string") 
     */
    protected $login;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $password;

    /** 
     * @ORM\Column(type="boolean", nullable=true) 
     */
    protected $is_admin;

    public function getLogin()
    {
        return $this->login;
    }

    public function setLogin($login)
    {
        $this->login = $login;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getIsAdmin()
    {
        return $this->is_admin;
    }
}
?>