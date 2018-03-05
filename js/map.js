/**
 * Created by dell-pc on 2017/12/19.
 */

    //每个用户的设备在这个地图模式上显示
var mapObj,cluster;
var markers = [];
$(document).ready(function(){
    mapObj = new AMap.Map('mapShow',{
        //二维地图显示视口
        view: new AMap.View2D({
            center: new AMap.LngLat(104.451345, 37.284562),//地图中心点
            zoom: 4 //地图显示的缩放级别
        })
    });
    //异步加载 JavaScript API
    mapObj.plugin(["AMap.ToolBar"], function () {
        var toolBar = new AMap.ToolBar();
        mapObj.addControl(toolBar);
    });
    // 获取已标记的点
    //$.getJSON("/home/PublicDeviceData?online=", function (data) {
    //    $.each(data, function (i, item) {
    //        var ss = '设备名称：<a style="font-size:14px;text-decoration:underline;" href="/u/g/' + item.id + '" target="_blank">' + item.name + '</a><br><div id="g'+item.id+'">加载中...</div>';
    //        //$.each(item.sensors, function (j, jtem) {
    //        //    ss = ss + jtem.name + ':<b>' + jtem.lastValue + jtem.unit + '</b><br/>';
    //        //});
    //        //'测量设备名称：<a href="/home/sensorstatus/' + item.id + '" target="_blank">' + item.name + '</a><br/>测量设备类型：' + item.type + '<br/>最近更新：' + item.lastUpdateTime
    //        addPoint(item.lng, item.lat, ss, item.typeIcon,item.id);
    //    });
    //    //点聚合
    //    mapObj.plugin(["AMap.MarkerClusterer"], function () {
    //        cluster = new AMap.MarkerClusterer(mapObj, markers);
    //        cluster.setGridSize(20);
    //    });
    //});

});
//
var showSensors = function (infoWindow, marker,gid) {
    infoWindow.open(mapObj, marker.getPosition());
    //$.getJSON("/home/publicsensordata/" + gid, function (data) {
    //    var ss = "";
    //    $.each(data, function (j, jtem) {
    //        ss = ss + jtem.name + ':<b>' + jtem.lastValue + jtem.unit + '</b><br/>';
    //    });
    //    $("#g" + gid).html(ss);
    //});
    //先显示加载中，然后获取json数据，重新设置infowindow
};
// AMap.LngLat(lng, lat)  构造一个地理坐标对象，lng、lat分别代表经度、纬度值
function addPoint(lng, lat, content, typeIcon,gid) {
    //构造一个点标记对象
    var marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        draggable: false, //点标记可拖拽

        raiseOnDrag: true//鼠标拖拽点标记时开启点标记离开地图的效果

    });
    //构造详细信息展示窗体。
    var infoWindow = new AMap.InfoWindow({
        content: content,
        //AMap.Pixel(x:Number,y:Number) 构造一个像素坐标对象。
        offset: new AMap.Pixel(0, 0)//-113, -140
    });
    //addListener( instance, eventName, handler, context)
    //instance：需注册事件的对象（必填），eventName：事件名称（必填），handler：事件功能函数（必填），
    AMap.event.addListener(marker, 'click', function () { //鼠标点击marker弹出自定义的信息窗体
        showSensors(infoWindow, marker,gid);
        //infoWindow.open(mapObj, marker.getPosition());
    });
    marker.setMap(mapObj);
    markers.push(marker);
}

