$(function () {
    //打开用户文档界面的时候需要从后台调取需要显示信息的数据



    /*编辑*/
    var button = document.getElementsByClassName("button")[0];
    var divs = document.getElementsByClassName("d");
    button.onclick = function () {
        $("#avatarPreview").attr("title", "上传头像");
        for(var j = 1; j < divs.length; j++) {
            divs[j].style.display = "none";
            divs[j].nextElementSibling.type = "text";
        }

        document.getElementsByClassName("button")[0].style.display = "none";
        document.getElementById("buttonContainer").style.display = "block";
    };

    //点击图片更改用户头像
    $("#avatarSelect").change(function () {
        var obj = $("#avatarSelect")[0].files[0];
        var fr = new FileReader();

        fr.onload = function () {
            $("#avatarPreview").attr("src", this.result);
            console.log(this.result);
            $("#avatar").val(this.result);
        };

        fr.readAsDataURL(obj);
    });

    /*退出当前账号*/
    $("#quitAccount").click(function () {
        if(confirm("您确定要退出当前页面吗？")) {
            //清空cookie,显示首页
            window.open("homePage.html", "_self");
        }
    });

    /*修改密码*/
    $("#changePassword").click(function () {
        $(".changePassword").css("display", "block");
    });

    var $changePW = $('#changePasswordForm').validate({
        rules: {
            oldPW: {
                required: true,
                isEqual: true
            },
            newPW: {
                required: true,
                minlength: 6,
                maxlength: 15,
                isEqual: false
            },
            confirmPW: {
                required: true,
                equalTo: '#newPW'
            }
        },
        message: {
            oldPW: {
                required: '请输入旧密码',
                isEqual: '密码错误'
            },
            newPW: {
                required: '请输入新密码',
                minlength: '密码长度不得少于六位',
                maxlength: '密码长度不得多于十五位',
                isEqual: '不得与旧密码相同'
            },
            confirmPW: {
                required: '请确认新密码',
                equalTo: '两次输入不一致，请重新输入'
            }
        }
    });

    jQuery.validator.addMethod('isEqual', function () {

    });

    /*退出修改密码的页面*/
    $("#changePasswordCancel").click(function () {
        $(".changePassword").css("display", "none");
    });

    //用插件对表单信息进行验证
    var $validator = $("#form").validate({
        rules: {
            phoneNumber:{
                required:true,
                isMobile:true
            },
            email: {
                required:true,
                isEmail:true
            },
            QQ: {
                required:true,
                isQQ:true
            }
        },
        messages: {
            phoneNumber:{
                required:"请输入手机号",
                isMobile:"请输入有效的手机号"
            },
            email: {
                required:"请输入邮箱",
                isEmail:"请输入正确的邮箱"
            },
            QQ: {
                required:"请输入QQ号",
                isQQ:"请输入正确的QQ号"
            }
        },
        errorPlacement: function (error, element) {
            //error是错误提示元素span对象  element是触发错误的input对象
            //当通过验证时 error是一个内容为空的span元素
            error.appendTo(element.parent().next());
        }
    });

    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^1[3|4|5|7|8][0-9]{9}$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");

    jQuery.validator.addMethod("isEmail", function(value, element) {
        var email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return this.optional(element) || email.test(value);
    }, "请正确填写您的邮箱");

    jQuery.validator.addMethod("isQQ", function(value, element) {
        var QQ = /^[1-9][0-9]{4,}/;
        return this.optional(element) || QQ.test(value);
    }, "请正确填写您的QQ号");

    $(".submitButton").click(function () {
        if($validator.form()) {
            alert("修改信息成功！");
             var data = $("#form").serializeArray();
             $.post("http://139.199.28.148:8080/smart-sso-demo/user/update", data);//将数据发出去
             window.location.href = "userDocument.html";
        } else {
            alert("信息填写有误！再仔细检查一下吧>_<");
        }
    });

    $(".cancelButton").click(function () {
        for(var j = 1; j < divs.length; j++) {
            divs[j].style.display = "block";
            divs[j].nextElementSibling.value = "";
            divs[j].nextElementSibling.type = "hidden";
        }

        document.getElementsByClassName("button")[0].style.display = "inline-block";
        document.getElementById("buttonContainer").style.display = "none";
    });

});