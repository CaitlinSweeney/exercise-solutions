(function( $ ) {

  /**
   * Slide Class. Contains methods and information about
   * individual slides.
   * @param {element} el    Slide dom element
   * @param {number} index Index of this slide in the set.
   * @param {SlideShow} slideshow SlideShow parent that contains this slide
   */
  var Slide = function(el, index, slideshow){
    this.el        = el;
    this.$el       = $(el);
    this.index     = index;
    this.slideshow = slideshow;
    this.active    = false;

    this.initialize();
  };

  /**
   * Initialize the slide
   */
  Slide.prototype.initialize = function() {
    this.$el.css({
      left: this.index * this.slideshow.$el.width(),
      top: 0,
      position: 'absolute',
      width: this.slideshow.$el.width()
    });
  }

  /**
   * Activate this slide. Will deactivate siblings.
   */
  Slide.prototype.activate = function() {
    this.slideshow.slides.map(function(slide){
      slide.deactivate();
    });
    this.active = true;
    this.$el.toggleClass('active', this.active);
  }

  /**
   * Deactivate this slide.
   */
  Slide.prototype.deactivate = function() {
    this.active = false;
    this.$el.toggleClass('active', this.active);
  }

  /**
   * SlideShow Class. Contains all methods and information
   * about any given instance of a slideshow.
   * @param {jQuery} el      Element that represents the slideshow
   * @param {object} options Options to use in the slideshow
   */
  var SlideShow = function(el, options) {
    this.el           = el;
    this.$el          = $(el);
    this.options      = options;
    this.slides       = [];
    this.currentIndex = 0;

    this.initialize();  
  };

  /**
   * Initialize this instance of the slideshow
   */
  SlideShow.prototype.initialize = function(){
    this.buildSlides();
    this.constructFramework();
    this.registerEvents();

    this.slides[0].activate();
  }

  /**
   * Construct each slide in the show as an instance
   * of the Slide class and attach it to this slideshow
   */
  SlideShow.prototype.buildSlides = function() {
    var slideshow = this;
    this.$el.find('.slide').each(function(index, el){
      var slide = new Slide(el, index, slideshow);
      slideshow.slides.push(slide);
    });
  }

  /**
   * Update the HTML structure to improve usability
   * for the code itself.
   */
  SlideShow.prototype.constructFramework = function() {
    this.slideContainer = $('<div class="slide-container">');
    this.slideContainer.appendTo(this.$el);
    this.slideContainer.css({
      position: 'absolute'
    });
    this.$el.find('.slide').appendTo(this.slideContainer);

    // build navigation
    this.navigation = $('<nav class="slideshow-navigation"><ul></ul></nav>');
    this.navigationUl = this.navigation.find('ul');
    for (var i = 0; i < this.slides.length; i++) {
      this.navigationUl.append('<li><a href="#" class="slideshow-navigation-item" data-index="'+i+'">Item ' + (i + 1) + '</a></li>');
    };
    this.navigationUl.prepend('<li><a href="#" class="slideshow-navigation-prev">Previous</a></li>');
    this.navigationUl.append('<li><a href="#" class="slideshow-navigation-next">Next</a></li>');
    this.$el.append(this.navigation);    
  }

  /**
   * Register eventhandlers
   */
  SlideShow.prototype.registerEvents = function() {
    var slideshow = this;
    // handle navigation
    this.navigation.find('.slideshow-navigation-item').on('click', function(e){
      e.preventDefault();
      var targetIndex = $(this).attr('data-index');
      slideshow.gotoSlide(targetIndex);
    });

    this.navigation.find('.slideshow-navigation-next').on('click', function(e) {
      e.preventDefault();
      slideshow.nextSlide();
    });
    this.navigation.find('.slideshow-navigation-prev').on('click', function(e) {
      e.preventDefault();
      slideshow.prevSlide();
    });

  }

  /**
   * Navigate this slideshow to the given slide index
   * @param  {number} index Index of target slide
   */
  SlideShow.prototype.gotoSlide = function(index){
    console.log("index:", index);
    this.currentIndex = index;
    this.slideContainer.animate({
      left: -index * this.$el.width()
    }, this.options.speed);
  }

  /**
   * Navigate to the next slide in the set
   */
  SlideShow.prototype.nextSlide = function() {
    var nextIndex = this.currentIndex + 1;
    if(nextIndex >= this.slides.length)
      nextIndex = 0;
    this.gotoSlide(nextIndex);
  }

  /**
   * Navigate to the previous slide in the set
   */
  SlideShow.prototype.prevSlide = function() {
    var prevIndex = this.currentIndex - 1;
    if(prevIndex < 0)
      prevIndex = this.slides.length - 1;
    this.gotoSlide(prevIndex);
  }

  /**
   * Set up the default plugin options
   * @type {Object}
   */
  var optionDefaults = {
    speed: 1000
  };

  /**
   * Slideshow Plugin Entrypoint
   * @param  {object} options Plugin options
   * @return {jQuery}         Original selector
   */
  $.fn.slideshow = function(options) {

    this.each(function(ind, el){
      var slideshow = new SlideShow(
        this,
        $.extend(optionDefaults, options)
      );
    });

    return this;
  };
}( jQuery ));