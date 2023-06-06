var pushState='';
$(function(){

    var currWidth = window.innerWidth > 900 ? 1000 : window.innerWidth;
    var currHeight = window.innerHeight;

    validatePopup();
    sendPopup();

    // for who gradient

    $('.icons .contCell a').hover(function(){
        var index=$('.icons div').index($(this).parent());
        if(index>0) $('.icons div').eq(index-1).addClass('gradientGrayPink');
        $('.icons div').eq(index+1).addClass('gradientPinkGray');
    },function(){
        $('.icons .separator').removeClass('gradientGrayPink').removeClass('gradientPinkGray');
    });

    if($('.subbanner').length > 1) { // FIX! обязательно, иначе рвёт вёрстку
        $('.subbanner').owlCarousel({
            items: 1,
            loop: true
        });
    }

    if($('#mainBanner').length > 1){ // FIX! ?
        $('#mainBanner .item').show();
        $('#mainBanner').owlCarousel({
            items:1,
            loop:true,
            pager: false
        });
    }

    $(".hide_others").on("click",function () {
        jQuery(this).next('table').slideToggle();
        jQuery(this).next('div').slideToggle();
    });

    $('.carousel').each(function(){
        var owl=$(this).owlCarousel({
            items:1,
            autoplay: true
        });
        var carousel=$(this);
        owl.on('initialized.owl.carousel changed.owl.carousel', function(event) {
            var item = event.item.index;
            setActive(carousel, item)
        });
        setActive(carousel, 0);

        var tabRow=carousel.parent().parent();
        // var items=tabRow.find('.listContainer .item');
        // items.bind('mouseenter',function(){
        //     owl.trigger('to.owl.carousel',[items.index($(this)),200]);
        // })

    });


    $("#kurs input").on('keyup', function(){
        this.value = this.value.replace(/\D/, '');
    });

    function setActive(item, number){
        //console.log(number);
        var tabRow=item.parent().parent();
        var items=tabRow.find('.listContainer .item');
        items.removeClass('active');
        items.eq(number).addClass('active');
    }


    if( $('.slider_group').length) {
        $('.slider_group').bxSlider({
            mode: 'fade',
            captions: false,
            pager: true,
            touchEnabled: false
        });
    }

    if($('.slider_banner .item').length > 1){
        $('.slider_banner').bxSlider({
            mode: 'fade',
            captions: false,
            pager: true,
            touchEnabled: false
        });
    }

    if( $(".items_projects").length){
        var slids = 3;
        var slideWidth = 330;
        var slideHeight = 330;
        if(window.innerWidth < 800){
            slids = 1;
            slideWidth = "";
            slideHeight = "";
        }

        $('.items_projects').bxSlider({
            pager: false,
            minSlides : 3,
            slideMargin: 10,
            maxSlides: 3,
            slideWidth: slideWidth,
            slideHeight: slideHeight,
            keyboardEnabled: false,
            touchEnabled: false
        });

        $('.items_projects').bxSlider({
            pager: true,
            minSlides : slids,
            slideMargin: 10,
            maxSlides: slids,
            keyboardEnabled: false,
            touchEnabled: false
        });

    }

    if( $(".items_guide").length){

        if($(".items_guide li").length > 1) {

            var slids = 3;
            if (window.innerWidth < 800) {
                slids = 1;
            }
            $('.items_guide').bxSlider({
                pager: true,
                minSlides: slids,
                slideMargin: 10,
                maxSlides: slids,
                touchEnabled: false
            });
        }
    }

    if( $(".items_guide_news").length){

        if($(".items_guide_news li").length > 1) {

            var slids = 3;
            if (window.innerWidth < 800) {
                slids = 1;
            }
            $('.items_guide_news').bxSlider({
                pager: true,
                minSlides: slids,
                slideMargin: 10,
                maxSlides: slids,
                touchEnabled: false
            });
        }
    }

    if( $(".field_name_spisok_prilozhenij").length){

        $('.field_name_spisok_prilozhenij').bxSlider({
            pager: true,
            minSlides : 3,
            slideMargin: 10,
            maxSlides: 3,
            touchEnabled: false
        });
    }

    $( "#tabs" ).tabs();

    if(window.innerWidth > 600) {
        $("a[rel^='prettyPhoto']").prettyPhoto();
    }else{
        $("a[rel^='prettyPhoto']").on("click",function () {
           return false;
        });
    }

    $("a[rel^='prettyVideo']").prettyPhoto({
        default_width: 700,
        default_height: 500
    });

    $("a[rel^='prettyProject']").on("click",function () {
        var id = $(this).data("id");
        var currId = $(this).data("current");
        getProject(id,currId);
        return false;
    });

    $("body").on("click","#full_view_model",function () {
        var id = $(this).data("id");
        var currId = $(this).data("current");
        var type = $(this).data("type");

        var width = '800';
        var height = '600';
        console.log("full_view_model");

        if(type == "link")return true;

        width = window.innerWidth < 790 ? window.innerWidth/1.1 : width;
        height = window.innerWidth < 790 ? window.innerHeight/1.5 : height;

        $(".popup_project").html("");

        $.ajax({
            url: '/udata/news/getProjectData/'+id+'/'+width+'/'+height+'/'+currId+'.json',
            success:function (data) {

                $('body').append(data);
                $('body').append('<div class="pp_default popup_project"><img class="cube" src="/templates/renga/images/round_cube.png"><div class="preview_work_ajax"><div id="loading"><img src="/templates/renga/images/ring_loader.gif"><span>Идет загрузка проекта...</span></div></div>' +
                    '<img src=""><a class="pp_close" href="#">Close</a></div>');

                var popup = jQuery('.popup_project');
                popup.width(width);
                popup.height(height);
                $(".preview_work_ajax").height(height);

                var leftPosition = (window.document.documentElement.offsetWidth - width) / 2;
                var windowHeight = window.innerHeight || window.document.documentElement.offsetHeight;
                var topPosition = jQuery(window.document.documentElement).scrollTop() || jQuery(window.document).scrollTop();
                // topPosition = topPosition + (windowHeight - height) / 2;
                topPosition = '100';
                popup.css({'left': leftPosition + 'px', 'top': topPosition+'px'});

                if(window.innerWidth < 790) {
                    var leftPosition2 = ($(".preview_work_ajax").width()-$("#loading").width())/2;
                    var tops = ($(".preview_work_ajax").height())/2.2;
                    var loader = $("#loading");
                    loader.css({'margin-left': leftPosition2 + 'px', 'margin-top': tops+'px'});
                }

                $(".pp_close").on("click",function () {
                    $(".overlay_black").remove();
                    $(".popup_project").remove();
                    return false;
                });
            }

        });
        return false;
    });

    $("a[rel^='prettyWork']").prettyPhoto({
        default_width: currHeight > 800 ? currWidth/1.5 : currWidth/1.8,
        default_height: currHeight > 800 ? currWidth/1.5 : currWidth/1.8,
        opacity: 0,
        callback: function () {
            $(".pp_pic_holder_second_over").remove();
        },
        changepicturecallback:function(){
            $(".pp_pic_holder").addClass("active_work_popup");
            if(!$('body').find(".pp_pic_holder_second_over").length) {
                $('body').append('<div class="pp_pic_holder_second_over" style="height:' + window.innerHeight + 'px"></div>');
            }

        },
    });

    $("body").on("click",".link_next_d,.link_next_prev",function () {
        // if(!$('body').find(".pp_pic_holder_second_over").length) {
        //     $('body').append('<div class="pp_pic_holder_second_over" style="height:' + window.innerHeight + 'px"></div>');
        // }
        var id = $(this).data('id');
        $('body').find(".pp_pic_holder").remove();
        $('body').find(".pp_overlay").remove();
        $('#item_'+id).trigger('click');
        return false;
    });

    $('input[type=checkbox], input[type=radio]').customRadioCheck();

    var sel = $('select');
    $(sel).each(function () {
        if($(this).attr('name') != "napravlenie" && $(this).attr('name') != "produkt"){
            if($(this).find("option").length > 5)
            {
                $(this).chosen();
            }else{
                $(this).chosen({disable_search_threshold: 10});
            }
        }
    });

    $('.imgOctaider').each(function(){
        $(this).find('img').addClass('hidden');
        var src=$(this).find('img').attr('src');
        $(this).append('<div class="bg"></div>');
        $(this).append('<div class="mask"></div>');
        $(this).find('.bg').css('background-image','url(' + src + ')');

    });

    $(".ajax_content").on("click",function () {
        return false;
    });

    $(".loginza").on("click",function () {

        var id = $(this).data('id');
        var page_id = $(this).data('page');

        if(!$(this).hasClass("is_voted")) {
            socialPopUp(id, page_id);
        }
        return false;
    });

    $(".link_data_2").on("click",function () {
        var id = $(this).data('id');
        if(id){
            $.ajax({
                url: '/webforms/quickCall/'+id,
                dataType: 'html',
                success: function (data) {
                    addPopUpForm(data);
                }
            });
            return false;
        }
    });

    $(window).resize(function(){

        $('section table').each(function(){
            $(this).width('');
            $(this).width($(this).width()+20);
        });



        $('.news .imgOctaider').each(function(){
            if($(this).width()){
                $(this).height($(this).width());
            }
            //$(this).height($(this).width());
        })

        $('body').css('overflow', 'hidden');
        var widthWithScrollBars = $(window).width();
        $('body').css('overflow', 'auto');

        if(widthWithScrollBars<640){
            $('.octaider').height('');
        }else
         $('.octaider').height($('.octaider').width()*1.08333333333);
    }).resize();

    $(document).scroll(function(){
       var linkers=$('.linker');
       var scrollPosition=$(document).scrollTop()+$(window).height()-400;
       return;
        if(scrollPosition==0){
            history.pushState(null, null, '#');
        }else{

           var setup=false;
           linkers.each(function(){
               if($(this).offset().top<scrollPosition) setup=$(this).attr('id');
           });
            if(setup && pushState!=setup){
                pushState=setup;
                history.pushState(null, null, '#'+setup);
            }
        }

    });

    // validate signup form on keyup and submit
    $("[name=form]").validate({
        rules: {
            lastname: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            lastname: "",
            email: '/ru/' == location.pathname.substring(0, 4) ? "Введите правильный Email адрес" : 'Email incorrect'
        }
    });

    $('body').on("click","#sendMess", function () {

        var id = $(this).data('id');
        $.ajax({
            url: '/webforms/quickCall/'+id,
            dataType: 'html',
            success: function (data) {
                addPopUpForm(data);
            }
        })

        return false;

    });

    /*
    *
    * Адаптивное меню
    * */
    if(currWidth < 900){
        $(".linkMenuItem").on("click",function () {
            $(this).parent().find(".submenu").toggleClass("active");
            $(this).parent().toggleClass("active");
            return false;
        });
    }

    function addPopUpForm(data) {

        $('body').append('<div class="overlay"></div>');

        $('body').append(data);
        $('#input_data_zvonka').datepicker();

        var width = $('.form_popup_call').width();
        var height = $('.form_popup_call').height();

        var popup = jQuery('.form_popup_call');
        var leftPosition = (window.document.documentElement.offsetWidth - width) / 2;
        var windowHeight = window.innerHeight || window.document.documentElement.offsetHeight;
        var topPosition = jQuery(window.document.documentElement).scrollTop() || jQuery(window.document).scrollTop();

        topPosition = topPosition + (windowHeight - height) / 7;

        popup.css({'left': leftPosition + 'px', 'top': '200px'});

        $(".close").on("click",function () {

            $(".overlay").remove();
            $(".form_popup_call").remove();

        });
    }

    function getProject($id,current)
    {
        $('body').append('<div class="overlay_black"></div>');

        var width = '800';
        var height = '600';

        width = window.innerWidth < 790 ? window.innerWidth/1.1 : width;
        height = window.innerWidth < 790 ? window.innerHeight/1.5 : height;

        $.ajax({
            url: '/udata/news/getProjectData/'+$id+'/'+width+'/'+height+'/'+current+'.json',
            success:function (data) {

                if(current == 79711) {
                    $('body').append(data);
                    $('body').append('<div class="pp_default popup_project"><img class="cube" src="/templates/renga/images/round_cube.png"><div class="preview_work_ajax"><div id="loading"><img src="/templates/renga/images/ring_loader.gif"><span>Идет загрузка проекта...</span></div></div>' +
                        '<img src=""><a class="pp_close" href="#">Close</a></div>');
                }else{
                    $('body').append(data);
                }

                var popup = jQuery('.popup_project');
                popup.width(width);
                popup.height(height);
                $(".preview_work_ajax").height(height);

                var leftPosition = (window.document.documentElement.offsetWidth - width) / 2;
                var windowHeight = window.innerHeight || window.document.documentElement.offsetHeight;
                var topPosition = jQuery(window.document.documentElement).scrollTop() || jQuery(window.document).scrollTop();
                // topPosition = topPosition + (windowHeight - height) / 2;
                topPosition = '100';
                popup.css({'left': leftPosition + 'px', 'top': topPosition+'px'});

                if(window.innerWidth < 790) {
                    var leftPosition2 = ($(".preview_work_ajax").width()-$("#loading").width())/2;
                    var tops = ($(".preview_work_ajax").height())/2.2;
                    var loader = $("#loading");
                    loader.css({'margin-left': leftPosition2 + 'px', 'margin-top': tops+'px'});
                }

                $(".pp_close").on("click",function () {
                    $(".overlay_black").remove();
                    $(".popup_project").remove();
                    return false;
                });
            }

        });

        return false;
    }

    function validatePopup() {

        $('body').on("click",".send_ahref",function () {

            var form = $(this).parent();
            var errors = false;
            $(form).find('.err_text').remove();

            $(form).find(".required").each(function () {
                $(this).removeClass('error_valid');
                if(!$(this).val()){
                    $(this).addClass('error_valid');
                    $(this).after('<span class="err_text">Заполните поле!</span>');
                    errors = true;
                }
            });

            if(errors){
                return false;
            }

            var serial = form.serialize();

            $.ajax({
               url: '/webforms/quickCallSend/',
                data:serial,
                success:function (data) {

                    form.addClass("opacity");

                   if(data != "success"){
                       alert(data);
                   }else{
                       form.hide();
                       $('.form_popup_call').append('<div class="send_success">Заявка принята!<div class="close">X</div></div>');

                   }

                }

            });

            return false;

        });

        $('body').on("click",".close",function () {
            $("body").find(".overlay").remove();
            $("body").find(".form_popup_call").remove();
        });

    }

    /*
    *
    * Окно соц сетей*/
    function socialPopUp(id,page_id) {

        $('body').append('<div class="overlay_black"></div>');

        var width = '300';
        var height = '200';

        $.ajax({
            url: '/udata/news/createAjaxSocial/'+id+'/'+page_id,
            dataType:"html",
            success:function (data) {
                $('body').append(data);
                var popup = jQuery('.popup_project');
                popup.width(width);
                popup.height(height);
                $(".preview_work_ajax").height(height);
                var leftPosition = (window.document.documentElement.offsetWidth - width) / 2;
                var windowHeight = window.innerHeight || window.document.documentElement.offsetHeight;
                topPosition = '100';
                popup.css({'left': leftPosition + 'px', 'top': topPosition+'px'});

                $(".pp_close").on("click",function () {
                    $(".overlay_black").remove();
                    $(".popup_project").remove();
                    return false;
                });
            }

        });

        return false;
    }

    $("label.checkBox").on("click",function () {
        var ins = $(this).find("input[type='checkbox']");
        $(ins).trigger("click");
    });

    $("input[type='checkbox']").on("click",function () {
        return;
        var ins = $(this);
        var parent = $(ins).parent();
        var classParent = parent.attr("class");
        if(classParent != "checkbox_input" && $(ins).attr("class") != "download_to_sch" ) {
            $(ins).trigger("click");
        }
    });

    // $("label.checkBox").on("click",function () {
    //    var inp = $(this).find("input[type='checkbox']");
    //    var checked = $(inp).prop("checked");
    //    var forName = $(inp).prop("for");
    //    var license = $(".choose_license").find("input[type='checkbox']");
    //    $(license).each(function ($index,$val) {
    //        var inputs = $($val);
    //        var check = $(inputs).prop("checked");
    //        if(check){
    //            $(inputs).prop("checked",false);
    //        }
    //    });
    //    // checked ? $(inp).prop("checked",false) : $(inp).prop("checked",true);
    // });

    $(".checkbox_input input").on("click",function () {
        var license = $(".choose_license").find("input[type='checkbox']");
        var vls = $(this).val();
        return;
        $(license).each(function ($index,$val) {
            var inputs = $($val);
            var check = $(inputs).prop("checked");
            if(check && vls != $(inputs).val()){
                $(inputs).prop("checked",false);
            }
        });
    });

    $(".ajax_request").on("click",function () {
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType:"html",
            success:function (data) {
                addPopUpForm(data);
            }

        });
    });

    function popup(data) {
        var width = '300';
        var height = '200';
        $('body').append(data);
        var popup = jQuery('.popup_view');
        popup.width(width);
        popup.height(height);
        // $(className).height(height);
        var leftPosition = (window.document.documentElement.offsetWidth - width) / 2;
        var windowHeight = window.innerHeight || window.document.documentElement.offsetHeight;
        topPosition = '100';
        popup.css({'left': leftPosition + 'px', 'top': topPosition+'px'});
        $(".pp_close").on("click",function () {
            $(".overlay_black").remove();
            $(".popup_project").remove();
            return false;
        });
    }

    function sendPopup() {

        $('body').on("click",".send_ahref_form",function () {

            var form = $(this).parent();
            var errors = false;
            $(form).find('.err_text').remove();

            var action = $(this).parent().attr("action");

            $(form).find(".required").each(function () {
                $(this).removeClass('error_valid');
                if(!$(this).val()){
                    $(this).addClass('error_valid');
                    $(this).after('<span class="err_text">Заполните поле!</span>');
                    errors = true;
                }
            });

            if(errors){
                return false;
            }

            var serial = form.serialize();

            $.ajax({
                url: action,
                data:serial,
                success:function (data) {

                    form.addClass("opacity");

                    if(data != "success"){
                        alert(data);
                    }else{
                        form.hide();
                        $('.form_popup_call').append('<div class="send_success">Запрос принят!<div class="close">X</div></div>');

                    }

                }

            });

            return false;

        });

        $('body').on("click",".close",function () {
            $("body").find(".overlay").remove();
            $("body").find(".form_popup_call").remove();
        });

    }
});
