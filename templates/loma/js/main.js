$(function() {

	var anim_bulle;
    var panel_scroll = null;   
    
	resizes();                     // resize pagina
    $(window).scroll(resizes);     // calcula au défilement de la page
    $(window).resize(resizes);     // calcul au redimensionnement de la page
	
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

    // NAV MOBILE
    $('#btn_nav').click(function(){
        $('#main_header nav').toggle();
    });


    // MENU PROYECTO
	$('#menu_proyecto a.sli').click(function(){
		//stop_carousel_hp();
		//tourne_carousel_hp();	
	
		$('.slide:visible').hide();
		$('#slide_' + $(this).attr('data-target')).fadeIn(400);
		
		$('.cir_banner').animate({
			left:'100%',
			opacity:0
		}, 0);
		$('.cir_banner').animate({
			left:'53%',
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
	

    function resizes(){
            height_dispo = getWindowHeight() - ($('#main_header').height()) - ($('.item-page').height()) - ($('#main_footer').height());
            width_dispo = getWindowWidth() - getScrollerWidth();

            //$('#main').height(height_dispo).width(width_dispo);
            $('#slider .slide').height(height_dispo).width(width_dispo);

            ratio_dispo = width_dispo / height_dispo;
            width_original = 1680;
            height_original = 900;
            ratio_original = width_original / height_original;

            if(ratio_dispo > ratio_original){
                    $('#slider .illus').width(width_dispo);
                    $('#slider .illus').height(width_dispo/ratio_original);
                    marge_neg = Math.round(((width_dispo/ratio_original) - height_dispo ) / 2);
                    $('#slider .illus').css('top', '-' + marge_neg + 'px');
                    $('#slider .illus').css('left', 0);		
            } else {
                    $('#slider .illus').height(height_dispo);
                    $('#slider .illus').width(height_dispo*ratio_original);
                    marge_neg = Math.round(((height_dispo*ratio_original) - width_dispo ) / 2);
                    $('#slider .illus').css('left', '-' + marge_neg + 'px');
                    $('#slider .illus').css('top', 0);
            }



        if($('html').hasClass('ie8')){
                largeur_dispo = getWindowWidth() - ($('#main .columna').width());
        } else {
                largeur_dispo = getWindowWidth() - ($('#main .columna').width()) - getScrollerWidth();
        }

        if(getWindowWidth() > 760){
            // desktop
            $('#main .columna').height(height_dispo).width('420px');
            $('#main .plan').width(largeur_dispo);
            $('#main .map').height(height_dispo - ($('#main .info-top').height())).width(largeur_dispo);
            $('#main .mapa-proyecto').height(height_dispo - ($('#main .info-top').height())).width(largeur_dispo);
            
            $('.columna').mCustomScrollbar("update");
           
           
        } else {
            // mobile            
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

    $(".close").on('click',function(e){
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



function getWindowHeight() {
    var windowHeight=0;
    if (typeof(window.innerHeight)=='number') {
        windowHeight=window.innerHeight;
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight;
        } else {
            if (document.body && document.body.clientHeight) {
                windowHeight=document.body.clientHeight;
            }
        }
    }
    return windowHeight;
}

function getWindowWidth() {
    var windowWidth=0;
    if (typeof(window.innerWidth)=='number') {
        windowWidth=window.innerWidth;
    } else {
        if (document.documentElement && document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        } else {
            if (document.body && document.body.clientWidth) {
                windowWidth=document.body.clientWidth;
            }
        }
    }
    return windowWidth;
}

function getScrollerWidth() {
    var scr = null;
    var inn = null;
    var wNoScroll = 0;
    var wScroll = 0;

    // Outer scrolling div
    scr = document.createElement('div');
    scr.style.position = 'absolute';
    scr.style.top = '-1000px';
    scr.style.left = '-1000px';
    scr.style.width = '100px';
    scr.style.height = '50px';
    // Start with no scrollbar
    scr.style.overflow = 'hidden';

    // Inner content div
    inn = document.createElement('div');
    inn.style.width = '100%';
    inn.style.height = '200px';

    // Put the inner div in the scrolling div
    scr.appendChild(inn);
    // Append the scrolling div to the doc
    document.body.appendChild(scr);

    // Width of the inner div sans scrollbar
    wNoScroll = inn.offsetWidth;
    // Add the scrollbar
    scr.style.overflow = 'auto';
    // Width of the inner div width scrollbar
    wScroll = inn.offsetWidth;

    // Remove the scrolling div from the doc
    document.body.removeChild(
        document.body.lastChild);

    // Pixel width of the scroller
    return (wNoScroll - wScroll);
}

