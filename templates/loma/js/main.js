$(function() {

	var anim_bulle;
    var panel_scroll = null; 
    var $ac_background  = $('#ac_background'),
        $ac_bgimage     = $ac_background.find('.ac_bgimage');
    
	resizes();                     // resize pagina
    $(window).scroll(resizes);     // calcula au défilement de la page
    $(window).resize(resizes);     // calcul au redimensionnement de la page
	//adjustImageSize($ac_bgimage);
    //$ac_bgimage.fadeIn(1000);
    //ICONOS EN EL MENU JOOMLA
    $menu = $('#menu');
    $dialog = $('.window')
    $menu.find('.menu > .item-107 ').prepend('<span class="icon icon-user"></span>');$menu.find('.menu > .item-107 ').append('<div class="border-item orange"></div>');
    $menu.find('.menu > .item-108 ').prepend('<span class="icon icon-stack"></span>');$menu.find('.menu > .item-108 ').append('<div class="border-item green"></div>');
    $menu.find('.menu > .item-109 ').prepend('<span class="icon icon-images"></span>');$menu.find('.menu > .item-109 ').append('<div class="border-item yellow"></div>');
    $menu.find('.menu > .item-110 ').prepend('<span class="icon icon-cog"></span>');$menu.find('.menu > .item-110 ').append('<div class="border-item brown"></div>');
    $menu.find('.menu > .item-111 ').prepend('<span class="icon icon-phone"></span>');$menu.find('.menu > .item-111 ').append('<div class="border-item orange"></div>');

    $menu.find('.menu > .item-112 ').prepend('<span class="icon icon-user"></span>');
    $menu.find('.menu > .item-113 ').prepend('<span class="icon icon-stack"></span>');
    $menu.find('.menu > .item-114 ').prepend('<span class="icon icon-images"></span>');
    $menu.find('.menu > .item-115 ').prepend('<span class="icon icon-cog"></span>');
    $menu.find('.menu > .item-116 ').prepend('<span class="icon icon-phone"></span>');

   /* $menu.find('.menu > .item-107 ').prepend('<span class="icon-user"></span>');
    $menu.find('.menu > .item-108 ').prepend('<span class="icon-stack"></span>');
    $menu.find('.menu > .item-109 ').prepend('<span class="icon-images"></span>');
    $menu.find('.menu > .item-110 ').prepend('<span class="icon-cog"></span>');
    $menu.find('.menu > .item-111 ').prepend('<span class="icon-phone"></span>');

    $menu.find('.menu > .item-112 ').prepend('<span class="icon-user"></span>');
    $menu.find('.menu > .item-113 ').prepend('<span class="icon-stack"></span>');
    $menu.find('.menu > .item-114 ').prepend('<span class="icon-images"></span>');
    $menu.find('.menu > .item-115 ').prepend('<span class="icon-cog"></span>');
    $menu.find('.menu > .item-116 ').prepend('<span class="icon-phone"></span>');*/

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
    
    
	// EFFECTO FRANJA HOME
	$('.franja').hide();
	$('.franja').slideDown(600);

	// EFECTO MENU PROYECTO
	$('#menu_proyecto').hide();
	$('#menu_proyecto').slideDown(600);
	
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

    // NAV MOBILE
    $('#btn_nav').click(function(){
        $('#main_header nav').toggle();
    });


    // MENU PROYECTO
	$('#menu_proyecto a.sli').click(function(){
		//stop_carousel_hp();
		//tourne_carousel_hp();	
	
		$('.slide:visible').hide();
      // if($(this).attr('data-target')== 2)
            showItemImage($(this).attr('data-bg'));
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
	});
	
	// ACTIVACION DEL MENU PROYECTO
	$('#menu_proyecto a:first').click();

    function showItemImage (source) {
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
                    }

    function adjustImageSize ($img) {
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
                    }
	

    function resizes(){
            height_dispo = getWindowHeight() - ($('#main_header').height()) - ($('.item-page').height()) - ($('#main_footer').height());
            height_dispo_slider = getWindowHeight(); //- ($('#main_footer').height()); //- ($('#main_header').height()); - ($('.item-page').height()) - ($('#main_footer').height());
            width_dispo = getWindowWidth() - getScrollerWidth();

            $('#main').height(height_dispo).width(width_dispo);
            //$('#slider .slide').height(height_dispo).width(width_dispo);
            adjustImageSize($ac_bgimage);
           /* ratio_dispo = width_dispo / height_dispo;
            width_original = 1680;
            height_original = 900;
            ratio_original = width_original / height_original;

            if(ratio_dispo > ratio_original){
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


    // APP PLANO Y LOTES
    $('.lote').hover(function(e){

        
        var title = $('#'+e.currentTarget.id + ' .info-item').find('.title-item h3').text();
        var description = $('#'+e.currentTarget.id + ' .info-item').find('.description-item').html();
        

        $('.info-top h2').text(title);
        $('.info-lotes .title').html('<h3>'+title+'</h3>');
        $('.info-lotes .description').html(description);

       

    });
	
    $('.lote').on('click',function(e){
        e.preventDefault();
       //console.log($('#'+e.currentTarget.id));
       $("div.overlay-proyecto").fadeToggle("fast");

    });

    $("#mapa .close").on('click',function(e){
        event.preventDefault();
        $("div.overlay-proyecto").fadeToggle("fast");
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

	

});



