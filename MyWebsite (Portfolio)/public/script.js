function redirect(URL){
   window.open(URL);
   return false;
}

$( document ).ready(function() {
	function resizing () {

      var headerHeight = $("#header").height();
      // $("#content").css({"margin-top":headerHeight})

      if ($("#sponsored_footer").is(':visible')){
        $("#footer").css({"margin-bottom": $("#sponsored_footer").outerHeight(true) });
      } else {
        $("#footer").css({"margin-bottom":0});
      }


  }
  window.changesOnFooter = resizing;
  resizing();
  $(window).resize(resizing);

    $("#header ul.dropdown-menu").hide()
    $("#header li.root>a").click(function(e){
        e.preventDefault()
        $(this).next().toggle();
        var subMenu = $(this).siblings("ul");
          if(subMenu.is(':visible')) {
              $(this).click(function(e){
              window.open(this.href, '_self');
            })
          }
     });
	

	$("#response_msg").fadeOut(5000);

  var scrollData = {
     scrollss: $("*[data-focus=section]"),
     jdocument: $(document),
     ojscrolls: [],
     offset:  $("#header").css("position") == "fixed" ? $('#header').height() + 5 : + 5,
     lastSelected: ""
   };

   for (var i=0; i<scrollData.scrollss.length; i++)
     scrollData.ojscrolls.push(scrollData.scrollss.eq(i));

   var scroller = function() {
     var top = scrollData.jdocument.scrollTop();
     var previous = scrollData.ojscrolls[0];
     for (var i=0; i<scrollData.ojscrolls.length; i++) {
       var ojscroll = scrollData.ojscrolls[i];
       var offset = ojscroll.offset();
       if (offset.top > top + scrollData.offset)
         break;
       var previous = ojscroll;
     }
     if (previous) {
       var id = previous.attr("id");
       if (id != scrollData.lastSelected) {
         var link = $(".bm-mainmenu-hook a[href='#"+id+"']");
         $(".bm-mainmenu-hook .active").removeClass("active");
         link.parents("li").first().addClass("active");
         scrollData.lastSelected = id;
       }
     }
   }

   $(window).on("scroll", scroller);
   scroller();

   jQuery('body > #content').on('touchend click', function() { if ( jQuery('.navbar-collapse.collapse.in').length > 0 ) {jQuery('.navbar-toggle').click();} })

  if (!(BM.Editor && BM.Editor.Core)) {
    $("nav.navbar-collapse li:not(.root) > a").on("click touchend", function(e) {
      var el = $(this);
      var link = el.attr("href");
      var blank = el.attr("target");
      if (blank) {
        window.open(link, blank);
      } else {
        window.location = link;
      }
    });
  }


});