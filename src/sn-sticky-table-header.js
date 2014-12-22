/* @flow */
/* jshint loopfunc: true */
(function() {

    angular.module('snStickyTableHeader', [])
        .value('snStickyTableHeaderOptions', {
            STICKY: 'sn-sticky-table-header__original',
            CLONE: 'sn-sticky-table__clone',
            CLONE_VISIBLE: 'sn-sticky-table__clone--visible'
        })
        .directive('snStickyTableHeader', ['$window', 'snStickyTableHeaderOptions',
            function($window, snStickyTableHeaderOptions) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attributes) {
                        var options = snStickyTableHeaderOptions;

                        angular.extend(scope, {
                            thead: element.find('> :first-child'),
                            table: element,
                            clone: null,

                            initialise: function() {
                                angular.element($window).bind('scroll', scope.scroll);
                            },

                            scroll: function(event) {
                                var scrollTop = $($window).scrollTop();

                                if (!scope.thead.hasClass(options.STICKY) && scrollTop > scope.table.offset().top) {
                                    scope.stick();
                                }

                                if (scope.thead.hasClass(options.STICKY) && scrollTop <= scope.table.offset().top) {
                                    scope.unstick();
                                }

                                return true;
                            },

                            stick: function() {

                                if (scope.clone === null) {
                                    scope.cloneTable();
                                }

                                scope.styleClone();
                                scope.clone.addClass(options.CLONE + ' ' + options.CLONE_VISIBLE);
                                scope.thead.addClass(options.STICKY);
                            },

                            unstick: function() {
                                scope.thead.removeClass(options.STICKY);
                                scope.clone.removeClass(options.CLONE_VISIBLE);
                            },

                            cloneTable: function() {
                                var table = scope.table,
                                    clone = scope.table.clone(true, true);

                                clone.find('tbody').remove();
                                clone.css({
                                    width: table.width(),
                                    left: table.offset().left,
                                    height: 'auto'
                                });

                                scope.clone = clone;
                                table.after(clone);
                            },

                            styleClone: function() {
                                var th = scope.thead.find('th');
                                angular.forEach(scope.clone.find('th'), function(thClone, thCloneIndex) {
                                    angular.element(thClone).css({
                                        width: $(th.get(thCloneIndex)).width()
                                    });
                                });
                            },

                            destroy: function() {
                                angular.element($window).unbind('scroll', scope.scroll);
                            }
                        });

                        scope.$on('$destroy', scope.destroy);

                        scope.initialise();
                    }
                };
            }
        ]);
})();
