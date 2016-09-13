/**
 * Created by 2016年7月30日
 */

angular.module('hmsDirectives', [])
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
        console.log("选择的颜色：", iAttrs.hmsMouseEven);
        iElement.bind('mouseenter', function () {
          iElement.css('color', iAttrs.hmsMouseEven);
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
          hmsColumnName: '=columnname',
          hmsHeadData: '=headdata',
          hmsBodyData: '=bodydata'
        },
        templateUrl: 'build/lib/handLib/hmsDirectiveHtml/hmsTable.html',
        link: function (scope, element, attrs) {
          var ta = element[0], $ta = element;
        },
        controller: function ($scope, $attrs, $element) {
          //滑动定位
          $scope.scroll = function () {
            var scrollLeft = $ionicScrollDelegate.$getByHandle('hmsTableBody').getScrollPosition().left;
            $ionicScrollDelegate.$getByHandle('hmsTableHeader').scrollTo(scrollLeft, 0);
          };

          //自适应列宽
          $scope.hmsResetWidth = function (index, str) {
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
  }])
    .directive('hmsToTop',['$ionicScrollDelegate',function($ionicScrollDelegate){
      return{
        restrict:'EA',
        replace:true,
        scope:{
          imgPath:'@',
          restore:'&',
          img_restore1:'@imgClass'
        },
        template:'<img ng-src="{{imgPath}}" id="img_id" ng-click="restore()" on-drag="onDrag($event)" 								   	on-touch="onTouch($event)" class="{{img_restore1}}">',
        link:function(scope,element,attras){
          scope.restore=function(){
            var top=$ionicScrollDelegate.getScrollPosition().top;
            //console.log(element[0].style.display);
            //element[0].style.display="none";
            if(top>0){
              //element.style.display="inline";
              $ionicScrollDelegate.scrollTop(true);
            }
          };
          var ox,oy,maxWidth,maxHeight;
          if(attras.checkdrag==='true') {
            scope.onTouch = function ($event) {
              ox = $event.target.offsetLeft;
              oy = $event.target.offsetTop;
              maxWidth = screen.width-element[0].offsetWidth;
              maxHeight = screen.height-element[0].offsetWidth;
              //console.log(maxHeight+","+maxWidth);
            };
            scope.onDrag = function ($event) {
              var el = $event.target,
                  dx = $event.gesture.deltaX,
                  dy = $event.gesture.deltaY;
              distanceX = ox + dx;
              distanceY = oy + dy;
              //console.log(distanceX+","+distanceY);
              if (distanceX < 0) {
                el.style.left = 0;
              } else if (distanceX > maxWidth) {
                el.style.right = 0;
              } else {
                el.style.left = ox + dx + "px";
              }
              if (distanceY < 0) {
                el.style.top = 0;
              } else if (distanceY > maxHeight) {
                el.style.bottom = 0;
              } else {
                el.style.top = oy + dy + "px";
              }

            };
          }
        }
      }
    }])
   .directive('hmsSvgLoader', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.addClass('pageload-overlay');
          var template = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" preserveAspectRatio="none"><path/></svg>';
          var ele = angular.element(template);
          element.append(ele);
        }
      };
    })
    /*
     * Created by WillJiang on 9/1/16.
     */
    .directive('hmsInputProgress', function () {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
          var template = '<div class="colors"></div>';
          var colorDiv = angular.element(template);

          var classStyle = attrs['progressClass'];
          var position = attrs['progressPosition'];
          var colors = scope[attrs['progressColorAry']];
          var eles = document.querySelectorAll('input,textarea,select');
          var inputs = [];
          angular.forEach(eles, function (item, index) {
            if (item.type !== 'button' && item.type !== 'submit') {
              inputs.push(item);
              item.addEventListener('input', cb, false);
            }
          });

          element.append(colorDiv);
          switch (classStyle) {
            case 'flash':
              //蹇呴』璁剧疆 progressColorAry 鍙傛暟
              break;
            case 'gradient':
              var temp;
              if (colors) {
                temp = [
                  [colors[0], '0'], [colors[1], '100%']
                ];
              } else {
                temp = [
                  ['#009dff', '0'], ['#00c8ff', '100%']
                ];
              }
              colors = generateCSSGradient(temp);
              break;
            case 'sections':
              //蹇呴』璁剧疆 progressColorAry 鍙傛暟
              var step = 100 / (colors.length);
              var p = 0;
              var color = [];
              angular.forEach(colors, function (item, index) {
                color.push([item, p + '%']);
                p += step;
                color.push([item, p + '%']);
              });
              colors = generateCSSGradient(color);
              break;
            default:
              if (!colors) {
                colors = ['#009dff'];
              }
              break;
          }

          position === 'top' ? element.addClass('top-' + classStyle) : element.addClass('bottom-' + classStyle);

          function cb() {
            var t = [];
            for (var n = inputs.length; n--;) {
              if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = element;
            for (var o = s.length; o--;) {
              s[o].style.width = 100 - r / i * 100 + "%";
              switch (classStyle) {
                case 'flash':
                  s[o].style.background = colors[i - r - 1];
                  break;
                case 'gradient':
                  s[o].style.background = colors;
                  break;
                case 'sections':
                  var child = element.children('.colors');
                  child[0].style.background = colors;
                  child[0].style.width = window.innerWidth + "px";
                  break;
                default:
                  s[o].style.background = colors[0];
                  break;
              }
            }
          }

          //gradient 鍜� sections 闇€瀵归鑹叉暟鎹繘琛屽鐞�
          function generateCSSGradient(colours) {
            var l = colours.length, i;
            for (i = 0; i < l; i++) colours[i] = colours[i].join(" ");
            return "linear-gradient( to right, " + colours.join(", ") + ")";
          }
        }
      };
    })
    .directive('hmsSelector',function ($ionicModal) {
      return {
        restrict:"EA",
        templateUrl:"hmsSelector.html",
        scope:{
          hmsTitle:"=",
          hmsValue:"=",
          hmsModalValue:"=",
          hmsPaging:"="
        },
        link: function (scope,element,attrs) {
          scope.screenHeig = window.innerHeight;
          console.log("高度",scope.screenHeig);
          //根据值的多少判断打开哪个modal
          if (scope.hmsModalValue.length>=scope.hmsPaging) {        //数值多，打开带筛选框的
            $ionicModal.fromTemplateUrl('hms-many-data-modal.html', {
              scope: scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              scope.manyModal = modal;
            });
            scope.info = {    //过滤器
              filter:""
            };
            scope.openModal = function() {    //打开modal
              scope.manyModal.show();
            };
            //清选
            scope.clear = function () {
              scope.hmsValue = "";
              scope.info.filter = "";
              scope.manyModal.hide();
            }
            //返回,关闭modal
            scope.closeModal = function() {
              scope.manyModal.hide();
              scope.info.filter = "";
            };
            //选值
            scope.choose = function (item) {
              scope.hmsValue = item;
              scope.info.filter = "";
              scope.manyModal.hide();
            };
            //删除输入的值
            scope.delete = function () {
              scope.info.filter = "";
            }
          } else {    //数值不多，打开不带筛选框的
            $ionicModal.fromTemplateUrl('hms-modal.html', {
              scope: scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              scope.modal = modal;
            });
            scope.openModal = function() {
              scope.modal.show();
              setTimeout(function () {
                if (scope.hmsModalValue.length == 3) {
                  $(".hmsModal").css("top", scope.screenHeig - 202 + 'px')
                } else if (scope.hmsModalValue.length >= 4 && scope.hmsModalValue.length<scope.hmsPaging) {
                  $(".hmsModal").css("top", 47 + '%');
                  $(".hmsModal").css("min-height", 53 + '%')
                } else if(scope.hmsModalValue.length<3){
                  $(".hmsModal").css("top", scope.screenHeig - 149 + 'px')
                }
              },0)
            };
            scope.choose = function (item) {
              scope.hmsValue = item;
              scope.modal.hide();
            }
          }
        }
      }
    })
    .directive('hmsSlideList', function () {
      return {
        restrict: 'EA',
        scope:true,
        template:'<div ng-click="selectList()" class="select" style="border-radius:8px"> <div><input class="selectInput" type="text" ng-model="handAPIrecord"  readonly required></div> <div><img class="imgIcon"  src="http://sandbox.runjs.cn/uploads/rs/274/c3z5q3my/list.png"></div> </div> <div  class="selectLists" style="display:none">  <div class="search"> <div><input class="serchInput" ng-change="valueChange(selectParam)" ng-model="selectParam"></div>   <div> <i class="icon ion-ios-search searchIcon"></i></div></div> <ion-scroll delegate-handle="contentHandle"  class="serchScroll"> <div class="itemList" ng-repeat="item in handAPIItemlist" ng-init="index = $index" ng-click="select(index)"><div ng-bind-html="item.data | highlight:selectParam"></div></div><ion-infinite-scroll on-infinite="loadData()" ng-if="pagination.SearchIsshow"></ion-infinite-scroll></ion-scroll></div>',

        link:function(scope,element,attrs){
          if(attrs.listdata){
            scope.handAPIItemlist = scope[attrs.listdata];
            scope.handAPIcopyList = scope.handAPIItemlist;
          }
          scope.handAPIrecord = scope[attrs.selectdata];

        },

        controller: function ($scope, $element,$attrs,$timeout,$ionicScrollDelegate) {
          var elem = angular.element($element);

          var child = elem.children('div');

          //输入框的输入的值
          $scope.selectParam = "";
          //分页参数
          $scope.pagination = {
            SearchIsshow:true,
            pageNum:0,
            Timer:''
          };
          //下拉列表
          $scope.selectList = function () {

            var node= child[0];
            var node2 =child[1];
            if(node2.style.display =='none'){
              $(node2).slideDown(100);
              node.style.borderBottomLeftRadius ="";
              node.style.borderBottomRightRadius ="";

            }else{
              $(node2).slideUp(100);
              node.style.borderBottomLeftRadius ="8px";
              node.style.borderBottomRightRadius ="8px";

            }
          };
          //下拉选择
          $scope.select = function(index){
            var selectList = $('.selectLists');
            $(selectList[0]).slideUp(100);
            var node= document.getElementsByClassName('select');
            node[0].style.borderBottomLeftRadius ="8px";
            node[0].style.borderBottomRightRadius ="8px";
            $scope[$attrs.selectdata]=$scope.handAPIItemlist[index].data;
            $scope.handAPIrecord = $scope.handAPIItemlist[index].data;
          };

          //分页加载数据(这儿写分页方法)
          $scope.loadData = function(){

            var array = [];
            if($scope.selectParam.length>0){
              angular.forEach($scope.handAPIItemlist,function(data,key){
                var flag =  new RegExp($scope.selectParam).test(data.data);
                if(flag){
                  array.push(data);
                }
              });
              $scope.handAPIItemlist = array;
              $scope.pagination.SearchIsshow = false;
            }else{
              $scope.handAPIItemlist = $scope.handAPIcopyList;
              $scope.pagination.SearchIsshow = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');

          };
          //查询调用分页
          $scope.initLoadData = function(){
            if ($scope.pagination.Timer) {
              clearTimeout($scope.pagination.Timer);
              $scope.pagination.Timer='';
            }
            $timeout(function(){
              $scope.pagination.SearchIsshow = true;
              $scope.pagination.pageNum = 0;
              // $scope.handAPIItemlist=[];
              $timeout(function(){
                $scope.loadData();
              },500);
              //  $ionicScrollDelegate.$getByHandle('contentHandle').resize();
              // $scope.$broadcast('scroll.infiniteScrollComplete');
            },50)
          };
          //监听查询值变化
          $scope.valueChange = function(){
            $scope.pagination.pageNum = 0;
            //$scope.handAPIItemlist=[];
            if ($scope.pagination.Timer) {
              clearTimeout($scope.pagination.Timer);
            }
            $scope.pagination.Timer = setTimeout(function () {
              $scope.initLoadData();
            }, 50);
          };


        }

      }

    })
  //过滤器查询匹配的值
    .filter("highlight", function ($sce) {

      var fn = function (text, search) {
        if (!search) {
          return $sce.trustAsHtml(text);
        }
        text = text.toString();
        if (text.indexOf(search) == -1) {
          return text;
        }
        var regex = new RegExp(search, 'gi');
        var result = text.replace(regex, '<span style="color:red;">$&</span>');
        return $sce.trustAsHtml(result);
      };
      return fn;
    })
/**
 * Created by WillJiang on 8/30/16.
 */

    .constant('hmsSvgLoaderConfig', {
      class1: {
        openValue: 'M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z',
        closeValue: 'M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z',
        pathValue: 'M30,30 50,30 50,30 30,30 Z',
        speedIn: 100
      },
      class2: {
        openValue: 'M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z',
        closeValue: 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z',
        pathValue: 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z',
        speedIn: 300
      },
      class3: {
        openValue: 'M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z',
        closeValue: 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z',
        pathValue: 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z',
        speedIn: 400
      },
      class4: {
        openValue: 'M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z',
        closeValue: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
        pathValue: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
        speedIn: 300
      },
      class5: {
        openValue: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z',
        closeValue: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z',
        pathValue: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z',
        speedIn: 300
      },
      class6: {
        openValue: 'M 40,100 150,0 -65,0 z',
        closeValue: 'M 40,100 150,0 l 0,0 z',
        pathValue: 'M 40,100 150,0 l 0,0 z',
        speedIn: 400
      },
      class7: {
        openValue: 'M 0,60 80,60 80,50 0,40 0,60;M 0,60 80,60 80,25 0,40 0,60;M 0,60 80,60 80,25 0,10 0,60;M 0,60 80,60 80,0 0,0 0,60',
        closeValue: 'M 0,60 80,60 80,20 0,0 0,60;M 0,60 80,60 80,20 0,40 0,60;m 0,60 80,0 0,0 -80,0',
        pathValue: 'm 0,60 80,0 0,0 -80,0',
        speedIn: 200
      },
      class8: {
        openValue: 'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z',
        closeValue: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
        pathValue: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
        speedIn: 600,
        speedOut: 800
      },
      class9: {
        openValue: 'M 0,0 80,-10 80,60 0,70 0,0',
        closeValue: 'M 0,-10 80,-20 80,-10 0,0 0,-10',
        pathValue: 'M 0,70 80,60 80,80 0,80 0,70',
        speedIn: 400
      },
      class10: {
        openValue: 'M 40,-65 145,80 -65,80 40,-65',
        closeValue: 'm 40,-65 0,0 L -65,80 40,-65',
        pathValue: 'M 40,-65 145,80 40,-65',
        speedIn: 500
      },
      class11: {
        openValue: 'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z',
        closeValue: 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z',
        pathValue: 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z',
        speedIn: 400
      },
      class12: {
        openValue: 'm -10,-10 0,80 100,0 0,-80 z m 50,-30.5 0,70.5 0,70 0,-70 z',
        closeValue: 'm -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z',
        pathValue: 'm -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z',
        speedIn: 400
      },
      class13: {
        openValue: 'm 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z',
        closeValue: 'm 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z',
        pathValue: 'm 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z',
        speedIn: 700
      }
    })
    .directive('hmsSvgLoader', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.addClass('pageload-overlay');
          var template = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" preserveAspectRatio="none"><path/></svg>';
          var ele = angular.element(template);
          element.append(ele);
        }
      };
    })
    .directive('hmsShowLoader', function (hmsSvgLoaderConfig) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          var svgLoader = attrs['hmsSvgLoader'],
              showLoader = attrs['hmsShowLoader'],
              config = hmsSvgLoaderConfig['' + svgLoader + ''],
              ele = document.getElementsByTagName('svg')[0],
              s = Snap(ele),
              path = s.select('path'),
              easingIn, easingOut;

          switch (svgLoader) {
            case 'class1':
            case 'class7':
              easingIn = easingOut = mina.linear;
              break;
            case 'class8':
              easingIn = mina.easeinout;
              easingOut = mina.bounce;
              break;
            default:
              easingIn = easingOut = mina.easeinout;
          }

          var openingSteps = config.openValue.split(';'),
              openingStepsTotal = openingSteps.length,
              closingSteps = config.closeValue.split(';'),
              closingStepsTotal = closingSteps.length;

          if (!config.speedOut) {
            config.speedOut = config.speedIn;
          }

          scope.$watch(showLoader, function (newValue) {
            console.log('newValue = ' + newValue);
            if (newValue) {
              animateSvg('in', function () {
                element.addClass('pageload-loading');
              });
              element.addClass('show');
            } else {
              element.removeClass('pageload-loading');
              animateSvg('out', function () {
                path.attr('d', config.pathValue);
                element.removeClass('show');
              })
            }
          });


          function animateSvg(dir, callback) {
            var pos = 0,
                steps = dir === 'out' ? closingSteps : openingSteps,
                stepsTotal = dir === 'out' ? closingStepsTotal : openingStepsTotal,
                speed = dir === 'out' ? config.speedOut : config.speedIn,
                easing = dir === 'out' ? easingOut : easingIn,
                svg = document.getElementsByTagName('svg')[0],
                nextStep = function (pos) {
                  if (pos > stepsTotal - 1) {
                    if (callback && typeof callback === 'function') {
                      callback();
                    }
                    return;
                  }
                  // console.log('path = ' + angular.toJson(path));
                  path.animate({'path': steps[pos]}, speed, easing, function () {
                    nextStep(pos);
                  });
                  pos++;
                };
            console.log('speed = ' + speed);
            nextStep(pos);
          }
        }
      };
    })

