/**
 * Created by 2016年7月30日
 */

angular.module('hmsDerectives', [])
  .directive('hmsInputNumber', function ($ionicLoading) {
    return {
      link: function (scope, iElement, iAttrs, controller) {
        scope.$watch(iAttrs.ngModel, function (newVal, oldVal) {
            scope.value = newVal;
            if (scope.value === "" || scope.value === undefined) {
              return;
            } else {
              if (isNaN(scope.value)) {
                $ionicLoading.show({
                  template: '输入不合法,请输入纯数字！',
                  duration: 1000
                });
              }
            }
          }
        );
      }
    };
  })
  //自定义direcitve(hmsMouseEven)操作DOM元素---选中为自定义颜色、取消无样式。
  .directive('hmsMouseEven', function ($ionicLoading) {
    return {
      link: function (scope, iElement, iAttrs, controller) {
        console.log("选择的颜色：", iAttrs.handApiMouseEven);
        iElement.bind('mouseenter', function () {
          iElement.css('color', iAttrs.handApiMouseEven);
        });
        iElement.bind('mouseleave', function () {
          iElement.css('color', '');
        });
      }
    };
  })
  .directive('hmsTable', ['$timeout', '$ionicScrollDelegate',
    function ($timeout, $ionicScrollDelegate) {
      return {
        restrict: 'ACE',
        //scope重定义
        scope: {
          handColumnName: '=param1',
          handApiHeadData: '=param2',
          handApiBodyData: '=param3'
        },
        templateUrl: 'build/lib/handLib/hmsDirectiveHtml/hmsTable.html',
        link: function (scope, element, attrs) {
          var ta = element[0], $ta = element;
          //添加class，用于CSS
        },
        controller: function ($scope, $attrs, $element) {
          //滑动定位
          $scope.scroll = function () {
            var scrollLeft = $ionicScrollDelegate.$getByHandle('handApiTableBody').getScrollPosition().left;
            $ionicScrollDelegate.$getByHandle('handApiTableHeader').scrollTo(scrollLeft, 0);
          };

          //自适应列宽
          $scope.handApiResetWidth = function (index, str) {
            var newWidth = str.length * 0.875 + 0.5;
            if (newWidth > 3.5) {
              var className = "column-" + index;
              var elements = document.getElementsByClassName(className);
              for (var i = 0; i < elements.length; i++) {
                elements[i].style.width = newWidth + 'rem';
              }
            }
          };
        }
      };
    }
  ])
  .directive('elasticImage', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
    return {
      restrict: 'A',
      link: function ($scope, $scroller, $attr) {
        var image = document.getElementById($attr.elasticImage);
        var imageHeight = image.offsetHeight;
        var currentBrightness = '';
        var brightness5 = "blur(5px) brightness(0.9)";
        var brightness4 = "blur(3px) brightness(0.9)";
        var brightness3 = "blur(2px) brightness(0.9)";
        var brightness2 = "blur(1px) brightness(0.9)";
        var brightness1 = "blur(0px)";
        currentBrightness = brightness5;

        $scroller.bind('scroll', function (e) {
          var scrollTop = e.detail.scrollTop;

          //console.log('scrollTop ' + scrollTop);

          var newImageHeight = imageHeight - scrollTop;
          /////////
          var calculation = 0;
          var blur = 0;
          var brightness = 0;
          if (newImageHeight < 0) {
            newImageHeight = 0;
            calculation = 0;
          }
          if (scrollTop <= 0) {

            if (-scrollTop >= 0 && -scrollTop < 40) {
              if (currentBrightness != brightness5) {
                currentBrightness = brightness5;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 40 && -scrollTop < 80) {
              if (currentBrightness != brightness4) {
                currentBrightness = brightness4;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 80 && -scrollTop < 120) {
              if (currentBrightness != brightness3) {
                currentBrightness = brightness3;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 120) {
              if (currentBrightness != brightness1) {
                currentBrightness = brightness1;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }
          }
          image.style.height = newImageHeight + 'px';
        });
      }
    };
  }]);
