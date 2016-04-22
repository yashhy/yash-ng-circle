(function (angular, Raphael) {

    if (!angular) {
        console.error('Yash-ng-circle Requires AngularJS', 'https://angularjs.org/');
        return;
    }
    if (!Raphael) {
        console.error('Yash-ng-circle Requires RaphaelJS', 'https://github.com/DmitryBaranovskiy/raphael');
        return;
    }

    angular.module('yash-ng-circle', []).directive('yashNgCircle', function() {
        return {
            restrict: 'E',
            scope: {
                radius: '@cRadius',
                max: '@cMax',
                value: '=?cValue',
                arcAndTextColor: '@cFillNTextColor',
                circleBackgroundColor:'@cBackgroundColor'
            },
            link: link,
            template: '<div class="yash-circle"></div>'
        };

        function link(scope, element) {
            var max = parseInt(scope.max),
                value = parseInt(scope.value) > max ? max : parseInt(scope.value),
                widthHeight = parseInt(scope.radius),
                position = widthHeight / 2;

            var circleRadius = (widthHeight * 42) / 100,
                textSize = (circleRadius * 40) / 100,
                strokeWidth = (widthHeight * 3) / 100,
                arcAndTextColor = scope.arcAndTextColor,
                circleBaseStroke = scope.circleBackgroundColor;

            var raphael = Raphael(element.children('')[0], widthHeight, widthHeight),
                param = {'stroke': '#fff', 'stroke-width': strokeWidth};

            // Custom Attribute
            raphael.customAttributes.arc = function (value, max, circleRadius) {
                var alpha = 360 / max * value,
                    a = (90 - alpha) * Math.PI / 180,
                    x = position + circleRadius * Math.cos(a),
                    y = position - circleRadius * Math.sin(a),
                    path;

                path = [['M', position, position - circleRadius], ['A', circleRadius, circleRadius, 0, +(alpha > 180), 1, x, y]];
                return {'path': path, 'stroke': arcAndTextColor};
            };

            var text = raphael.text(200, circleRadius, value + '%');
            text.attr({ 'font-size': textSize,
                        'fill': arcAndTextColor,
                        'font-family': 'inherit',
                        'font-weight': 200,
                        'x': position,
                        'y': position
                      });

            var circle = raphael.circle(position, position, circleRadius);
            circle.attr({ 'stroke-width': strokeWidth, 
                          'stroke': circleBaseStroke
                       });

            var sec = raphael.path().attr(param).attr({arc: [0, max, circleRadius]});
            raphael.path().attr(param).attr({arc: [0, max, circleRadius]});

            function updateVal(value, max, circleRadius, elem) {
                elem.animate({arc: [value, max, circleRadius]}, 700, '>');
                text.attr({text: value + '%'});

                var circleStroke = value === max ? arcAndTextColor : circleBaseStroke;
                circle.animate({ 'stroke': circleStroke }, 700, '>');
            }

            (function () {
                updateVal(value, max, circleRadius, sec, 0);
            })();

            scope.$watch('value', function (newVal) {
                if (newVal >= 0 && newVal <= max) {
                    updateVal(newVal, max, circleRadius, sec, 0);
                }
            });
        }
    });
})(angular, Raphael);