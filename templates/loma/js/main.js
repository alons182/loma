$(function() {

	            var anim_bulle;
                var panel_scroll = null; 

                
/*
|--------------------------------------------------------------------------
| Menu Proyecto
|--------------------------------------------------------------------------
*/
                var $ac_background  = $('#ac_background'),
                $ac_bgimage     = $ac_background.find('.ac_bgimage'),
                $ac_loading     = $ac_background.find('.ac_loading'),
                
                
                $menuItems      = $('#menu_proyecto ul').children('li.sli'),
                totalItems      = $menuItems.length,
                $ItemImages     = new Array();
               
                /* 
                for this menu, we will preload all the images. 
                let's add all the image sources to an array,
                including the bg image
                */
                $menuItems.each(function(i) {
                    console.log($(this).children('a').attr('data-bg'));
                    $ItemImages.push($(this).children('a').attr('data-bg'));
                });
                $ItemImages.push($ac_bgimage.attr('src'));
                      
                
                
                var MenuProyecto            = (function(){
                    var init                = function() {
                        loadPage();
                        initWindowEvent();
                    },
                    loadPage            = function() {
                        /*
                            1- loads the bg image and all the item images;
                            2- shows the bg image;
                            3- shows / slides out the menu;
                            4- shows the menu items;
                            5- initializes the menu items events
                         */
                        $ac_loading.show();//show loading status image
                        $.when(loadImages()).done(function(){
                              //  $.when(showBGImage()).done(function(){ 
                                //hide the loading status image
                                $ac_loading.hide();

                              
                                //MUESTRA EL MENU PROYECTO
                                $('#menu_proyecto').slideDown(600);

                                initEventsMenu();
                                // ACTIVACION DEL MENU PROYECTO
                                $('#menu_proyecto a:first').click();
                               
                           // });
                        });
                    },
                    showBGImage         = function() {
                        return $.Deferred(
                        function(dfd) {
                            //adjusts the dimensions of the image to fit the screen
                            adjustImageSize($ac_bgimage);
                            $ac_bgimage.fadeIn(1000, dfd.resolve);
                        }
                    ).promise();
                    },
                   
                      
                    initEventsMenu   = function() {
                        
                        $menuItems.each(function(i) {
                            
                            var $item       = $(this), // the <li>
                            $el_title   = $item.children('a:first'),
                            el_image    = $el_title.attr('data-bg');
                           
                           
                           /* user clicks one item : appetizers | main course | desserts | wines | specials */
                            $el_title.bind('click.Menu', function(e) {
                                  
                               $('.slide:visible').hide();
                              // if($(this).attr('data-target')== 2)
                                   // showItemImage($(this).attr('data-bg'));
                                $('#slide_' + $(this).attr('data-target')).fadeIn(400);
                                
                                $('.cir_banner').animate({
                                    left:'100%',
                                    opacity:0
                                }, 0);
                                $('.cir_banner').animate({
                                    left:'75%',
                                    opacity:1       
                                }, 800);
                                
                                clearInterval(anim_bulle);
                                $('.cir_banner .logo, .cir_banner h2, .cir_banner p').hide();
                                anim_bulle = setTimeout(function(){
                                    $('.cir_banner .cir_banner, .cir_banner h2, .cir_banner p').slideDown(600);
                                }, 800);
                                
                                $('#menu_proyecto a').removeClass('on');
                                $(this).addClass('on');
                                current = $(this).attr('data-target');
                                showItemImage(el_image);
                                return false;
                            });
                            /* closes the submenu */
                           
                           
                        });
                    },
                    
                        /* changes the background image */
                    showItemImage       = function(source) {
                            //if its the current one return
                        if($ac_bgimage.attr('src') === source)
                            return false;
                                
                        var $itemImage = $('<img src="'+source+'" alt="Background" class="ac_bgimage"/>');
                        $itemImage.insertBefore($ac_bgimage);
                        adjustImageSize($itemImage);
                        $ac_bgimage.fadeOut(1500, function() {
                            $(this).remove();
                            $ac_bgimage = $itemImage;
                        });
                        $itemImage.fadeIn(1500);
                    },
                   
                        /*
                        on window resize, ajust the bg image dimentions,
                        and recalculate the menus width
                        */
                    initWindowEvent     = function() {
                        /* on window resize set the width for the menu */
                        $(window).bind('resize.Menu' , function(e) {
                            adjustImageSize($ac_bgimage);
                            /* calculate new width for the menu */
                           
                        });
                    },
                        /* makes an image "fullscreen" and centered */
                    adjustImageSize     = function($img) {
                        var w_w = $(window).width(),
                        w_h = $(window).height(),
                        r_w = w_h / w_w,
                        i_w = $img.width(),
                        i_h = $img.height(),
                        r_i = i_h / i_w,
                        new_w,new_h,
                        new_left,new_top;
                            
                        if(r_w > r_i){
                            new_h   = w_h;
                            new_w   = w_h / r_i;
                        }
                        else{
                            new_h   = w_w * r_i;
                            new_w   = w_w;
                        }
                            
                        $img.css({
                            width   : new_w + 'px',
                            height  : new_h + 'px',
                            left    : (w_w - new_w) / 2 + 'px',
                            top     : (w_h - new_h) / 2 + 'px'
                        });
                    },
                        /* preloads a set of images */
                    loadImages          = function() {
                        return $.Deferred(
                        function(dfd) {
                            var total_images    = $ItemImages.length,
                            loaded          = 0;
                            for(var i = 0; i < total_images; ++i){
                                $('<img/>').load(function() {
                                    ++loaded;
                                    if(loaded === total_images)
                                        dfd.resolve();
                                }).attr('src' , $ItemImages[i]);
                            }
                        }
                    ).promise();
                    };
                        
                    return {
                        init : init
                    };
                })();


               
                
/*
|--------------------------------------------------------------------------
| Plano Maestro
|--------------------------------------------------------------------------
*/

                $planoItems      = $('.mapa-proyecto').children('div.lote'),
                $overlay         = $('.overlay-proyecto');

                var PlanoMaestro            = (function(){
                    var init                = function() {
                        //loadLotes();
                        initPlanoEvent();
                    },
         
                    initPlanoEvent   = function() {
                        
                        $planoItems.each(function(i) {
                           
                            var $item       = $(this); // the <div>
                                
                           
                           /* user clicks one item : appetizers | main course | desserts | wines | specials */
                            $item.bind('click.Plano', function(e) {
                                   
                                e.preventDefault();
                               //console.log($('#'+e.currentTarget.id));
                               $overlay.fadeToggle("fast");

                                return false;
                            });
                            
                            $item.hover(function(e){

                
                                var title = $('#'+e.currentTarget.id + ' .info-item').find('.title-item h3').text();
                                var description = $('#'+e.currentTarget.id + ' .info-item').find('.description-item').html();
                                

                                $('.info-top h2').text(title);
                                $('.info-lotes .title').html('<h3>'+title+'</h3>');
                                $('.info-lotes .description').html(description);

                               

                            });

                           
                           
                           
                        });

                         $plano_close    = $('#mapa').find('.close');
                         $plano_close.bind('click.Close', function(e) {
                                 
                                e.preventDefault();
                              $("div.overlay-proyecto").fadeToggle("fast");

                               return false;
                            });


                         //SLIDESHOW IMG LOTES

                        $('#slideshow').before('<div id="slideshow-nav">').cycle({ 
                            fx:     'fade',
                            //easing: 'easeOutBack',
                            speed:  'fast',
                            prev:   '#prev', 
                            next:   '#next', 

                            timeout: 0,
                            slideResize: 0
                            //pager:  '#slideshow-nav'

                         });
                        
                        };
                    
                   
                        
                    return {
                        init : init
                    };
                })();
            
            

/*
|--------------------------------------------------------------------------
| Menu Principal
|--------------------------------------------------------------------------
*/
            $menu = $('#menu');
            $dialog = $('.window')
            $menu.find('.menu > .item-107 a').prepend('<span class="icon icon-user"></span>');$menu.find('.menu > .item-107 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-108 a').prepend('<span class="icon icon-stack"></span>');$menu.find('.menu > .item-108 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-109 a').prepend('<span class="icon icon-images"></span>');$menu.find('.menu > .item-109 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-110 a').prepend('<span class="icon icon-cog"></span>');$menu.find('.menu > .item-110 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-111 a').prepend('<span class="icon icon-phone"></span>');$menu.find('.menu > .item-111 ').append('<div class="border-item yellow"></div>');

            $menu.find('.menu > .item-107 .separator').prepend('<span class="icon icon-user"></span>');//$menu.find('.menu > .item-107 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-108 .separator').prepend('<span class="icon icon-stack"></span>');//$menu.find('.menu > .item-108 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-109 .separator').prepend('<span class="icon icon-images"></span>');//$menu.find('.menu > .item-109 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-110 .separator').prepend('<span class="icon icon-cog"></span>');//$menu.find('.menu > .item-110 ').append('<div class="border-item yellow"></div>');
            $menu.find('.menu > .item-111 .separator').prepend('<span class="icon icon-phone"></span>');//$menu.find('.menu > .item-111 ').append('<div class="border-item yellow"></div>');

            $menu.find('.menu > .item-112 a').prepend('<span class="icon icon-user"></span>');
            $menu.find('.menu > .item-113 a').prepend('<span class="icon icon-stack"></span>');
            $menu.find('.menu > .item-114 a').prepend('<span class="icon icon-images"></span>');
            $menu.find('.menu > .item-115 a').prepend('<span class="icon icon-cog"></span>');
            $menu.find('.menu > .item-116 a').prepend('<span class="icon icon-phone"></span>');

             $menu.find('.menu .item-116 span').on('click',function(){
       
                if($("#contactbox #dialog").css("display")=="none") 
                    {
                        $('.window').fadeOut(200);//hide();
                        $('#contactbox #dialog').fadeIn(200)//show();
                    }
            });

            $menu.find('.menu .item-111 span').on('click',function(){
               
                if($("#contactbox #dialog").css("display")=="none") 
                    {
                        $('.window').fadeOut(200);//hide();
                        $('#contactbox #dialog').fadeIn(200)//show();
                    }
            });

            $dialog.find('.close').on('click',function(e){
                            
                 e.preventDefault();
                    

                $dialog.fadeOut(200)//hide();
               
                limpiaForm($('#contactForm'));
                
            });

            //FORM SUBMIT CONTACT
            
             $("#contactForm").validate({

                messages:
                {
                    name:{
                        required:'*'
                    },
                    email:{
                        required:'*',
                        email:'Invalid'
                    },
                    comments:{
                        required:'*'
                    }
                    
                },
                rules: {
                    
                    comments:{
                        required: true
                    }

                  },

                  submitHandler: function(form) {

                    var formInput =  $('#contactForm').serializeArray();
                    var url = "/helpers/contact.php";
                
                    $.post(url, formInput, function(data){
                                console.log(data);
                                limpiaForm($("#contactForm"));

                                if(data=="ok")
                                    $('.mensaje').html('<span class="ok">Enviado</span>');
                                else
                                    $('.mensaje').html('<span class="error">Error</span>');


                                setTimeout(function(){  
                                    $('.mensaje').fadeOut(200,function() {

                                        $('.mensaje span').remove();
                                        $('.mensaje').show();
                                        
                                      });}, 2000);  
                            });
                   // form.submit();

                  }

                 });

            // NAV MOBILE
            $('#btn_nav').click(function(){
                $('#main_header nav').toggle();
            });
/*
|--------------------------------------------------------------------------
| Generales
|--------------------------------------------------------------------------
*/
            MenuProyecto.init();
            PlanoMaestro.init();

            // SCROLL PANEL A COLUMNA
            panel_scroll = $(".columna").mCustomScrollbar({
                theme:"dark",
                scrollButtons:{
                  enable:true
                }

            });
            // SCROLL PANEL A COLUMNA
            mapa_scroll = $(".mapa-proyecto").mCustomScrollbar({
                theme:"dark",
                scrollButtons:{
                  enable:true
                }

            });

             //SLIDESHOW IMG LOTES

            $('.cir_banner').cycle({ 
                fx:     'fade',
                //easing: 'easeOutBack',
                speed:  'fast',
                
                timeout: 5000,
                slideResize: 0
                //pager:  '#slideshow-nav'

             });
            
           
                    

            

            resizes();                     // resize pagina
            $(window).scroll(resizes);     // calcula au défilement de la page
            $(window).resize(resizes);     // calcul au redimensionnement de la page

             function resizes(){

                    height_dispo = getWindowHeight() - ($('#main_header').height()) - ($('.item-page').height()) - ($('#main_footer').height());
                    height_dispo_slider = getWindowHeight(); //- ($('#main_footer').height()); //- ($('#main_header').height()); - ($('.item-page').height()) - ($('#main_footer').height());
                    width_dispo = getWindowWidth() - getScrollerWidth();

                    $('#main').height(height_dispo).width(width_dispo);
                    $('#slider .slide').height(height_dispo).width(width_dispo);
                    //adjustImageSize($ac_bgimage);
                    ratio_dispo = width_dispo / height_dispo;
                    width_original = 1680;
                    height_original = 900;
                    ratio_original = width_original / height_original;

                /* if(ratio_dispo > ratio_original){
                        $('#slider .illus').width(width_dispo);
                        $('#slider .illus').height(width_dispo/ratio_original);
                        marge_neg = Math.round(((width_dispo/ratio_original) - height_dispo ) / 2);
                        $('#slider .illus').css('top', '-' + marge_neg + 'px');
                        //$('#slider .illus').css('top', '2000px');
                        $('#slider .illus').css('left', 0);     
                } else {
                        $('#slider .illus').height(height_dispo);
                        $('#slider .illus').width(height_dispo*ratio_original);
                        marge_neg = Math.round(((height_dispo*ratio_original) - width_dispo ) / 2);
                        $('#slider .illus').css('left', '-' + marge_neg + 'px');
                        //$('#slider .illus').css('top', '2000px');
                        $('#slider .illus').css('top', 0);
                }*/ 



                if($('html').hasClass('ie8')){
                        largeur_dispo = getWindowWidth() - ($('#main .columna').width());
                } else {
                        largeur_dispo = getWindowWidth() - ($('#main .columna').width()) - getScrollerWidth();
                }

                if(getWindowWidth() > 800){
                    // desktop
                    $('#main .columna').height(height_dispo).width('420px');
                    $('#main .plan').width(largeur_dispo);
                    $('#main .map').height(height_dispo - ($('#main .info-top').height())).width(largeur_dispo);
                    $('#main .mapa-proyecto').height(height_dispo - ($('#main .info-top').height())).width(largeur_dispo);
                    
                    $('.columna').mCustomScrollbar("update");
                    $('.mapa-proyecto').mCustomScrollbar("update");
                   
                   
                } else {
                    // mobile            
                    $('#main').height('auto');
                    $('#main .columna').height('auto').width('auto');
                    $('#main .plan').width('100%');
                    $('#main .map').height('250px').width('100%');
                    
                    
                    $('.columna').mCustomScrollbar("disable",true);
                   
                }


            };


           

            

          

            

	

});



