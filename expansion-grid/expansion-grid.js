/*! jQuery Scroll Snap 2.0.0 | MIT *
 * https://github.com/jpcurrier/jquery-scroll-snap !*/

function ExpansionGrid( el, options ){
 this.el = el;
 if( typeof el === 'string' )
   this.el = document.querySelectorAll( el );
 if( el.nodeType === document.ELEMENT_NODE )
   this.el = [ el ];

 this.set( options );

 this.init();
}

ExpansionGrid.prototype.settings = {
  position: false,
  positionOffset: 0
};

ExpansionGrid.prototype.set = function( options ){
  for( var key in options )
    if( this.settings.hasOwnProperty( key ) ){
      if( key === 'positionOffset' )
        this.settings[ key ] = !isNaN( options[ key ] ) ? Number( options[ key ] ) : 0;
      else
        this.settings[ key ] = options[ key ];
    }
  return this.settings;
};

ExpansionGrid.prototype.util = {
  hasClass: function( el, classname ){
    function check( classname ){
      if( el.nodeType !== document.ELEMENT_NODE )
        return false;
      else if( !( new RegExp( '\\s' + classname + '\\s' ).test( ' ' + el.className + ' ' ) ) )
        return false;
      else
        return true;
    }

    if( el && classname ){
      if( typeof el == 'string' )
        el = document.querySelector( el );
      if( el.nodeType !== document.ELEMENT_NODE && el[ 0 ] )
        el = el[ 0 ];

      var classnames = classname.split( ' ' );
      for( var i = 0; i < classnames.length; i++ ){
        if( check( classnames[ i ] ) )
          continue;
        else
          return false;
      }
      return true;
    }
  },

  addClass: function( el, classname ){
    function add( classname ){
      for( var j = 0; j < el.length; j++ ){
        if(
          el[ j ].nodeType === document.ELEMENT_NODE &&
          !( new RegExp( '\\s' + classname + '\\s' ).test( ' ' + el[ j ].className + ' ' ) )
        )
          el[ j ].className += el[ j ].className ? ' ' + classname : classname;
      }
    }

    if( el && classname ){
      if( typeof el == 'string' )
        el = document.querySelectorAll( el );
      if( el.nodeType === document.ELEMENT_NODE )
        el = [ el ];

      var classnames = classname.split( ' ' );
      for( var i = 0; i < classnames.length; i++ ){
        add( classnames[ i ] );
      }
    }
  },

  removeClass: function( el, classname ){
    function remove( classname ){
      for( var j = 0; j < el.length; j++ ){
        if( el[ j ].nodeType === document.ELEMENT_NODE )
          el[ j ].className = el[ j ].className.replace( new RegExp( '(?:^|\\s)' + classname + '(?!\\S)' ), '' );
      }
    }

    if( el && classname ){
      if( typeof el == 'string' )
        el = document.querySelectorAll( el );
      if( el.nodeType === document.ELEMENT_NODE )
        el = [ el ];

      var classnames = classname.split( ' ' );
      for( var i = 0; i < classnames.length; i++ ){
        remove( classnames[ i ] );
      }
    }
  },

  getStyle: function( el, prop ){
    if( getComputedStyle )
      return getComputedStyle( el ).getPropertyValue( prop );
    else if( el.currentStyle )
      return el.currentStyle[ prop.replace( /-([a-z])/gi, function ( g ){ return g[ 1 ].toUpperCase(); } ) ];
  },

  outerHeight: function( el ){
    // requires: getStyle
    if( el )
      return el.offsetHeight + parseInt( this.getStyle( el, 'margin-top' ) ) + parseInt( this.getStyle( el, 'margin-bottom' ) );
    return 0;
  }
};

ExpansionGrid.prototype.init = function(){
  for( var i = 0; i < this.el.length; i++ )
    this.build( this.el[ i ] );
};

ExpansionGrid.prototype.build = function( grid ){
  var settings = this.settings,
    util = this.util,
    initMarginBottom = parseInt( util.getStyle( grid.firstElementChild, 'margin-bottom' ) ),
    item = [];
  for( var i = 0; i < grid.children.length; i++ ){
    if( grid.children[ i ].nodeName === 'LI' )
      item.push( grid.children[ i ] );
  }

  for( i = 0; i < item.length; i++ ){
    var reveal = item[ i ].querySelector( '.expansion-grid-reveal' );
    if( reveal ){
      var btnClose = document.createElement( 'button' );
      btnClose.className = 'close';
      reveal.appendChild( btnClose );
    }
  }

  function spaceGrid(){
    var active,
      revealSpace = initMarginBottom;
    for( i = 0; i < item.length; i++ ){
      if( util.hasClass( item[ i ], 'active' ) ){
        active = item[ i ],
          revealSpace += util.outerHeight( item[ i ].querySelector( '.expansion-grid-reveal' ) );
      }
    }

    for( i = 0; i < item.length; i++ ){
      if( active && item[ i ].offsetTop === active.offsetTop )
        item[ i ].style.marginBottom = revealSpace + 'px';
      else
        item[ i ].style.marginBottom = initMarginBottom + 'px';
    }
  }

  function close(){
    util.removeClass( grid, 'open-item' );
    for( i = 0; i < item.length; i++ ){
      util.removeClass( item[ i ], 'active' );
      item[ i ].style.marginBottom = initMarginBottom + 'px';
    }
  }

  var gridSwitch = grid.querySelectorAll( '.expansion-grid-switch' );
  for( i = 0; i < gridSwitch.length; i++ ){
    if( !gridSwitch[ i ].getAttribute( 'data-g-switch' ) ) // only add listener once
      gridSwitch[ i ].addEventListener(
        'click',
        function(){
          if( this.getAttribute( 'data-g-switch' ) === 'true' ){
            var clicked = this.parentNode,
              revealSpace = util.outerHeight( clicked.querySelector( '.expansion-grid-reveal' ) ) + initMarginBottom;

            // open
            if( !util.hasClass( clicked, 'active' ) ){
              util.addClass( grid, 'open-item' );
              for( i = 0; i < item.length; i++ )
                util.removeClass( item[ i ], 'active' );
              util.addClass( clicked, 'active' );
              for( i = 0; i < item.length; i++ ){
                if( item[ i ].offsetTop === clicked.offsetTop )
                  item[ i ].style.marginBottom = revealSpace + 'px';
                else
                  item[ i ].style.marginBottom = initMarginBottom;
              }

              // position
              if( settings.position ){
                var marginTransition = util.getStyle( item[ 0 ], 'transition-duration' );
                marginTransition =
                  marginTransition.indexOf( 'ms' ) > -1 ?
                    parseFloat( marginTransition ) :
                      parseFloat( marginTransition ) * 1000;
                setTimeout(
                  function(){
                    var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    if( 'scrollBehavior' in document.documentElement.style )
                      window.scroll( { top: clicked.getBoundingClientRect().top + scroll + settings.positionOffset, behavior: 'smooth' } );
                    else
                      window.scroll( 0, clicked.getBoundingClientRect().top + scroll + settings.positionOffset );
                  },
                  marginTransition
                );
              }
            }

            // close
            else
              close();
          }
        }
      );

    gridSwitch[ i ].setAttribute( 'data-g-switch', 'true' );
  }

  // close button
  var btnClose = grid.querySelectorAll( 'button.close' );
  for( i = 0; i < btnClose.length; i++ ){
    if( !btnClose[ i ].getAttribute( 'data-g-close' ) )
      btnClose[ i ].addEventListener( 'click', close );
    btnClose[ i ].setAttribute( 'data-g-switch', 'true' );
  }

  // resize
  var delay;
  if( !grid.getAttribute( 'data-g-size' ) ) // only add listener once
    addEventListener(
      'resize',
      function(){
        clearTimeout( delay );
        delay = setTimeout(
          function(){
            if( grid.querySelector( '.active' ) )
              spaceGrid();
          },
          200
        );
      }
    );
  grid.setAttribute( 'data-g-size', 'true' );
};

// jQuery plugin
function jQueryPlugin( namespace, PluginClass ){
  $.fn[ namespace ] = function( options ){
    return this.each( function( i, el ){
      var instance = $.data( el, namespace );
      if( instance ){
        instance.set( options );
        instance.init();
      }
      else{
        // initialize new instance
        instance = new PluginClass( el, options );
        $.data( el, namespace, instance );
      }
    });
  };
}
if( typeof jQuery !== 'undefined' )
  ( function( $ ){
    jQueryPlugin( 'expansionGrid', ExpansionGrid );
  } )( jQuery );

if( typeof module === 'object' )
  module.exports = ExpansionGrid;