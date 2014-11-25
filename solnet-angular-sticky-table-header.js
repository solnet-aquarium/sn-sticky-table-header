/*jshint loopfunc: true */
(function() {

    /**
     * Cross browser scrollTop without jQuery: http://stackoverflow.com/a/872537/187954
     *
     * @return {Number} The scrollTop position in pixels
     */
    function getScrollTop() {
        if (typeof pageYOffset != 'undefined') {
            return pageYOffset; // most browsers except IE before #9
        } else {
            var B = document.body; // IE 'quirks'
            var D = document.documentElement; // IE with doctype
            return (D.clientHeight ? D : B).scrollTop;
        }
    }

    var tableHeaders = [],
        STICKY = 'solnet-angular-sticky-table-header__original',
        STICKY_FORMATTED = 'solnet-angular-sticky-table-header__original-formatted',
        STICKING = 'solnet-angular-sticky-table-header__original--sticking',
        CLONE = 'solnet-angular-sticky-table-header__clone',
        CLONE_VISIBLE = 'solnet-angular-sticky-table-header__clone--visible';

    var scrollHandler = function($window) {
        return function(event) {

            if (!tableHeaders.length) {
                return;
            }

            var scrollTop = $($window).scrollTop();

            for (var tableHeadersIndex = 0; tableHeadersIndex < tableHeaders.length; ++tableHeadersIndex) {
                var theadPair = tableHeaders[tableHeadersIndex];
                var thead = theadPair.thead;
                var table = thead.parent();

                if (thead.hasClass(STICKING)) {
                    return;
                }

                if (!thead.hasClass(STICKY) && scrollTop > thead.offset().top) {
                    if (!theadPair.theadClone) {
                        theadPair.theadClone = thead.clone(true, true);
                        thead.after(theadPair.theadClone);
                    }
                    thead.addClass(STICKING);
                    var theadClone = theadPair.theadClone;
                    theadClone.addClass(CLONE + ' ' + CLONE_VISIBLE);
                    theadClone.css({
                        left: thead.offset().left
                    });
                    if (!thead.hasClass(STICKY_FORMATTED)) {
                        th = thead.find('th');
                        theadClone.find('th').each(function(thCloneIndex, thClone) {
                            return $(thClone).css({
                                width: $(th.get(thCloneIndex)).width()
                            });
                        });
                        thead.addClass(STICKY_FORMATTED);
                    }
                    thead.addClass(STICKY);
                    thead.removeClass(STICKING);
                }
                if (thead.hasClass(STICKY) && scrollTop < table.offset().top) {
                    thead.removeClass(STICKY);
                    return theadPair.theadClone.removeClass(CLONE_VISIBLE);
                }
            }
        };
    };

    angular.module('solnetAngularStickyTableHeader', [])
        .directive('solnetAngularStickyTableHeader', ['$window',
            function($window) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attributes) {
                        tableHeaders.push({
                                table: $(element)
                        });
                        angular.element($window).bind('scroll', scrollHandler($window));
                    }
                };
            }
        ]);
})();
