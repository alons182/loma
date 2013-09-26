<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.3monkiescr
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;



$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$this->language = $doc->language;


$itemid   = $app->input->getCmd('Itemid', '');

// Add JavaScript Frameworks
//JHtml::_('bootstrap.framework');

// Add Stylesheets
$doc->addStyleSheet('templates/'.$this->template.'/css/normalize.min.css');
$doc->addStyleSheet('templates/'.$this->template.'/css/main.css');



?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" >
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<jdoc:include type="head" />
     <link rel="icon" type="image/png" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/img/favicon_32x32.ico">
	 
     <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/vendor/modernizr-2.6.2.min.js"></script>
     
     
</head>

<body class="<?php echo ($itemid ? ' bgid-' . $itemid : '')?>">
	
	<header id="main_header">
            <a id="logo" href="<?php echo $this->baseurl ?>"><img src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/img/logo.jpg" alt="Loma Liberiana" /></a>
            <div id="btn_nav">Menu</div>
            <nav id="menu">
                <jdoc:include type="modules" name="menu" style="none" />
                
            </nav>
            <div class="idiomas">
                <jdoc:include type="modules" name="idiomas" style="none" />
            </div>
        </header>
        <div id="main">
            <?php if ($this->countModules('menu_proyecto')) : ?>
            <nav id="menu_proyecto">
                <jdoc:include type="modules" name="menu_proyecto" style="none" />
            </nav>
            <?php endif; ?>
            
            
            <jdoc:include type="component" />


            
            <?php if ($this->countModules('slider')) : ?>
             <div id="slider">
                <jdoc:include type="modules" name="slider" style="none" />
            </div>
            <?php endif; ?>

                
           <?php if ($this->countModules('franja')) : ?>
            <div class="franja">
                <jdoc:include type="modules" name="franja" style="none" />
            </div>
            <?php endif; ?>
            
        </div>
        <footer id="main_footer">
            <div id="copyright">
               <jdoc:include type="modules" name="copyright" style="none" />
            </div>
            <div id="redes">
                <jdoc:include type="modules" name="redes" style="none" />
                
            </div>
        </footer>
       
        <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/vendor/jquery-1.10.1.min.js"></script>
        <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/vendor/jquery.mousewheel.min.js"></script>
        <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/vendor/jquery.mCustomScrollbar.min.js"></script>
        <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/vendor/jquery.cycle.all.js"></script>
        <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/main.js"></script>

        <script>
            /*var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));*/
        </script>


    

	<jdoc:include type="modules" name="debug" style="none" />
</body>
</html>
