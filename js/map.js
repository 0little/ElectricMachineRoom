/**
 * Created by dell-pc on 2017/12/19.
 */

    //ÿ���û����豸�������ͼģʽ����ʾ
var mapObj,cluster;
var markers = [];
$(document).ready(function(){
    mapObj = new AMap.Map('mapShow',{
        //��ά��ͼ��ʾ�ӿ�
        view: new AMap.View2D({
            center: new AMap.LngLat(104.451345, 37.284562),//��ͼ���ĵ�
            zoom: 4 //��ͼ��ʾ�����ż���
        })
    });
    //�첽���� JavaScript API
    mapObj.plugin(["AMap.ToolBar"], function () {
        var toolBar = new AMap.ToolBar();
        mapObj.addControl(toolBar);
    });
    // ��ȡ�ѱ�ǵĵ�
    //$.getJSON("/home/PublicDeviceData?online=", function (data) {
    //    $.each(data, function (i, item) {
    //        var ss = '�豸���ƣ�<a style="font-size:14px;text-decoration:underline;" href="/u/g/' + item.id + '" target="_blank">' + item.name + '</a><br><div id="g'+item.id+'">������...</div>';
    //        //$.each(item.sensors, function (j, jtem) {
    //        //    ss = ss + jtem.name + ':<b>' + jtem.lastValue + jtem.unit + '</b><br/>';
    //        //});
    //        //'�����豸���ƣ�<a href="/home/sensorstatus/' + item.id + '" target="_blank">' + item.name + '</a><br/>�����豸���ͣ�' + item.type + '<br/>������£�' + item.lastUpdateTime
    //        addPoint(item.lng, item.lat, ss, item.typeIcon,item.id);
    //    });
    //    //��ۺ�
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
    //����ʾ�����У�Ȼ���ȡjson���ݣ���������infowindow
};
// AMap.LngLat(lng, lat)  ����һ�������������lng��lat�ֱ�����ȡ�γ��ֵ
function addPoint(lng, lat, content, typeIcon,gid) {
    //����һ�����Ƕ���
    var marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        draggable: false, //���ǿ���ק

        raiseOnDrag: true//�����ק����ʱ���������뿪��ͼ��Ч��

    });
    //������ϸ��Ϣչʾ���塣
    var infoWindow = new AMap.InfoWindow({
        content: content,
        //AMap.Pixel(x:Number,y:Number) ����һ�������������
        offset: new AMap.Pixel(0, 0)//-113, -140
    });
    //addListener( instance, eventName, handler, context)
    //instance����ע���¼��Ķ��󣨱����eventName���¼����ƣ������handler���¼����ܺ����������
    AMap.event.addListener(marker, 'click', function () { //�����marker�����Զ������Ϣ����
        showSensors(infoWindow, marker,gid);
        //infoWindow.open(mapObj, marker.getPosition());
    });
    marker.setMap(mapObj);
    markers.push(marker);
}

