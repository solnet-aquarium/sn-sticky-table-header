/*jshint loopfunc: true */
(function() {

    angular.module('solnetAngularStickyTableHeader', [])
        .value('solnetAngularStickyTableHeaderOptions', {
            STICKY: 'solnet-angular-sticky-table-header__original',
            CLONE: 'solnet-angular-sticky-table__clone',
            CLONE_VISIBLE: 'solnet-angular-sticky-table__clone--visible'
        })
        .directive('solnetAngularStickyTableHeader', ['$window', 'solnetAngularStickyTableHeaderOptions',
            function($window, solnetAngularStickyTableHeaderOptions) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attributes) {
                        var options = solnetAngularStickyTableHeaderOptions;

                        angular.extend(scope, {
                            thead: $(element).find('> :first-child'),
                            table: $(element),
                            clone: null,

                            initialise: function() {
                                $($window).bind('scroll', scope.scroll);
                            },

                            scroll: function(event) {
                                var scrollTop = $($window).scrollTop();

                                if (!scope.thead.hasClass(options.STICKY) && scrollTop > scope.table.offset().top) {
                                    scope.stick();
                                }

                                if (scope.thead.hasClass(options.STICKY) && scrollTop < scope.table.offset().top) {
                                    scope.unstick();
                                }

                                return true;
                            },

                            stick: function() {

                                if (scope.clone === null) {
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
                                }

                                scope.styleClone();
                                scope.clone.addClass(options.CLONE + ' ' + options.CLONE_VISIBLE);
                                scope.thead.addClass(options.STICKY);
                            },

                            unstick: function() {
                                scope.thead.removeClass(options.STICKY);
                                scope.clone.removeClass(options.CLONE_VISIBLE);
                            },

                            styleClone: function() {
                                th = scope.thead.find('th');
                                scope.clone.find('th').each(function(thCloneIndex, thClone) {
                                    $(thClone).css({
                                        width: $(th.get(thCloneIndex)).width()
                                    });
                                });
                            },

                            destroy: function() {
                                $($window).off(scope.scroll);
                            }
                        });

                        scope.$on('$destroy', scope.destroy);

                        scope.initialise();
                    }
                };
            }
        ]);
})();
