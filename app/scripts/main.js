$( document ).ready(function() {

  // Navigation
  // -------------------------------------------------------
  var collapseItems = $(".collapse-item"),
    collapseToggles = $(".collapse-toggle");

  collapseToggles.on("click", function(event) {
    var colcaller = $(this),
      coltarget = collapseItems.filter('[data-target="'+ colcaller.data("toggle") +'"]');

    var clinkStateActive = coltarget.hasClass("active") ? true : false;
    collapseItems.removeClass("active");
    collapseToggles.removeClass("active");
    if(!clinkStateActive) {
      colcaller.addClass("active");
      coltarget.addClass("active");
    } else {
      coltarget.removeClass("active");
    }
    event.preventDefault();
  });

  // Slider code
  // -------------------------------------------------------

  var sliderData = {
    sliderList:
      [{
        id: "frontpage-slider",
        aspectratio: 7 / 3,
        slides: [{
          name: "test1",
          description: "hello world its one two three four five!",
          image: "http://q3030.com/q3030/wp-content/uploads/2014/11/LADA-Raven-concept-car-1-840x360.jpg"
        }, {
          name: "test2",
          description: "hello world its one two three four five!",
          image: "http://q3030.com/q3030/wp-content/uploads/2014/09/2013-Hennessey-Venom-GT-2-840x360.jpg"
        }, {
          name: "test3",
          description: "hello world its one two three four five!",
          image: "http://q3030.com/q3030/wp-content/uploads/2014/09/2013-Hennessey-Venom-GT-2-840x360.jpg"
        }]
      }]
  },
    sliderElements = $(".slider"),
    sliders = [];

  var Slider = function (sliderInfo, sliderElement) {
    this.sheight = Math.floor(sliderElement.width()/sliderInfo.aspectratio);
    this.swidth = this.sheight * sliderInfo.aspectratio;
    this.hwidth = this.swidth * sliderInfo.slides.length;

    this.sliderInfo = sliderInfo;
    this.sliderElement = sliderElement;
  };
  Slider.prototype.init = function() {
    this.sliderElement.css({
      width: this.swidth,
      height: this.sheight
    });

    this.elementUl = sliderElement.find(".slider-holder");
    this.elementUl.css({
      width: this.hwidth,
      height: this.sheight,
      marginLeft: -this.swidth
    });

    var crumbUl = sliderElement.find(".crumb-list ul");
    for(var i = 0; i < this.sliderInfo.slides.length; i++) {
      var newSlide = $('<li></li>');
      newSlide.attr("data-slide", i);
      newSlide.css({
        backgroundImage: 'url(' + this.sliderInfo.slides[i].image + ')',
        width: this.swidth,
        height: this.sheight
      });
      var newSContent = $('<div class="slide-content"></div>');
      newSContent.append($('<h2></h2>').html(this.sliderInfo.slides[i].name));
      newSContent.append($('<div></div>').html(this.sliderInfo.slides[i].description));
      newSlide.append(newSContent);
      this.elementUl.append(newSlide);

      var newCrumbLi = $('<li></li>');
      var newCrumb = $('<a data-crumb="'+ i +'" class="crumb"></div>');
      newCrumb.click(function(){
        console("Hello world");
      });
      crumbUl.append(newCrumbLi.append(newCrumb));
    }

    this.sliderElement.find(".control").data("slider", this.sliderIndex);
  };
  Slider.prototype.moveLeft = function() {
    this.elementUl.animate({
      left: + this.swidth
    }, 200, this.moveFinish(true));
  };
  Slider.prototype.moveRight = function() {
    this.elementUl.animate({
      left: - this.swidth
    }, 200, this.moveFinish(false));
  };
  Slider.prototype.moveFinish = function(moveleft) {
    if(moveleft == true) {
      this.sliderElement.find("ul li:last-child" ).prependTo(this.elementUl);
    } else {
      this.sliderElement.find("ul li:first-child").appendTo(this.elementUl);
    }
    this.elementUl.css('left', '');
  };
  $(".control").on("click", function(event) {
    var thisElement = $(this);
    if(thisElement.hasClass("control_prev")) {
      sliders[thisElement.data("slider")].moveLeft();
    } else if(thisElement.hasClass("control_next")) {
      sliders[thisElement.data("slider")].moveRight();
    }
    event.preventDefault();
  });
  for (var i = 0; i < sliderData.sliderList.length; i ++) {
    var sliderElement = sliderElements.filter('[data-target="'+ sliderData.sliderList[i].id +'"]');
    if(sliderElement.length) {
      var newSlider = new Slider(sliderData.sliderList[i], sliderElement);
      newSlider.sliderIndex = sliders.push(newSlider) -1;
      newSlider.init();
    }
  }
});
