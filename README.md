# handLib

## handLib Contents
* [Getting Started](#getting-started)
    * [download or update](#download-or-update)
    * [hmsInputNumber](#hmsInputNumber)
    * [hmsMouseEven](#hmsMouseEven)
    * [hmsTable](#hmsTable)
* [License](#license)

# Getting Started

## download or update
```bash
1、get clone https://github.com/HandMobileForce/handLib.git
2、修改代码
3、Git add –all
4、Git commit –m ‘备注说明’
5、Git push origin master:master
bower update  更新所有的 （bower update handLib）更新当前库
注：当需要保存上一个版本的时候，可以在提交之前给上一个版本取个版本号。用bower install
    每次下载的是master上最新的代码，这样通过设定的版本号，可以下载某个当前版本的代码。
```

## hmsInputNumber 
* 控制输入必须为数字
```bash
  <input type="text" hms-input-number style="width:100%;font-size: 14px;border:1px solid #000000">
```

## hmsMouseEven 
* 操作DOM元素---选中为红色、取消无样式。
```bash
   hand-api-mouse-even="yellow"  (选择需要的颜色传入)
  <input type="text" hms-mouse-even="yellow" style="width:100%;font-size: 14px;border:1px solid #000000">
```

## hmsTable

```bash
  html ：
  <!--首行首列固定的滚动表格 begin-->
  <ion-content scroll="false">
    <hms-table
      columnname="userColumnName"
      headdata="userHeadData"
      bodydata="userBodyData">
    </hms-table>
  </ion-content>
  <!--end-->

  js：中定义数据的来源，格式如下
   //数据来源
   $scope.userColumnName = "姓名";
    
   $scope.userHeadData = [
     {"headItem": "语文"}, {"headItem": "数学"}, {"headItem": "英语"},
     {"headItem": "物理"}, {"headItem": "化学"}, {"headItem": "生物"}, 
     {"headItem": "历史"}, {"headItem": "地理"}, {"headItem": "政治"}
   ];
   
   $scope.userBodyData = [
      {
        "code": "0001",
        "name": "张三",
        "bodyItem": [
          {"headItem": "语文", "bodyValue": "111111111"},
          {"headItem": "数学", "bodyValue": "100"},
          {"headItem": "英语", "bodyValue": "107"},
          {"headItem": "物理", "bodyValue": "22"},
          {"headItem": "化学", "bodyValue": "51"},
          {"headItem": "生物", "bodyValue": "78"},
          {"headItem": "历史", "bodyValue": "61"},
          {"headItem": "地理", "bodyValue": "43"},
          {"headItem": "政治", "bodyValue": "77"}
        ]
      },
      {
        "code": "0001",
        "name": "王五",
        "bodyItem": [
          {"headItem": "语文", "bodyValue": "110"},
          {"headItem": "数学", "bodyValue": "120"},
          {"headItem": "英语", "bodyValue": "109"},
          {"headItem": "物理", "bodyValue": "88"},
          {"headItem": "化学", "bodyValue": "51"},
          {"headItem": "生物", "bodyValue": "87"},
          {"headItem": "历史", "bodyValue": "71"},
          {"headItem": "地理", "bodyValue": "45"},
          {"headItem": "政治", "bodyValue": "55"}
        ]
      }
    ];
```
## hmsToTop
* 点击按钮使列表从页面底部回到页面顶部，并且按钮在屏幕中可以随意拖动。
```bash
 <hms-to-top img-class="img_restore" checkDrag="true" animation-class="rotate1" img-path="http://sandbox.runjs.cn/uploads/rs/197/vprxhxwe/add.png"></hms-to-top>
```