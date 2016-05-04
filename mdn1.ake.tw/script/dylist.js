/*
20131121 Modify By Anthony
*/
(function ($) {
    var dyList = window.dyList =
    {
        dyItems: []
        , e_EObj: { ID: null
                , Url: ''
                , ts_JQ: function () { return $('#' + this.ID) }
                , Map: null
        }
        , dyWin: ''
        , ts_dyObj: function (as_ID) {
            dyList.e_EObj = undefined;
            try {
                for (var li_ = 0; li_ < dyList.dyItems.length; li_++) {
                    var lo_ = dyList.dyItems[li_];
                    //Pub_App.ts_ObjInfo(lo_, 2);
                    if (lo_.ID == as_ID) {
                        dyList.e_EObj = lo_;
                        return true;
                    }
                }
            }
            catch (e) {
                return false;
            }
            //alert([dyList.e_EObj, dyList.e_EObj != undefined]);
            return (dyList.e_EObj != undefined);
        }
        , F_setval: function () {
            var lo_Datas = dyList.ts_SelectItem();
            if (lo_Datas != null) {
                var lo_ = dyList.e_EObj.ts_JQ();
                var lo_Arg =
                    { 'data-value': lo_
                    , html: lo_.next('span')
                    };
                var lo_Map = dyList.e_EObj.Map;
                switch ($.type(dyList.e_EObj.Map)) {
                    case "null":
                        break;
                    case "array":
                        lo_Arg['data-value'] = lo_Map[0];
                        lo_Arg.html = dyList.e_EObj.Map[1];
                        break;
                    default:
                        if ($.isPlainObject(lo_Map)) {
                            lo_Arg = $.extend(lo_Arg, lo_Map);
                        }
                        break;
                }
                dyList.F_MapVal(lo_Arg);
            }
            return this;
        }
        , F_Bind: function (ao_Binder, as_Val) {
            try {
                if ($.isFunction(ao_Binder)) {
                    ao_Binder(as_Val);
                } else {
                    switch (ao_Binder[0].tagName.toUpperCase()) {
                        case "A":
                        case "DIV":
                        case "SPAN":
                            ao_Binder.html(as_Val);
                            break;
                        default:
                            ao_Binder.val(as_Val);
                            break;
                    }
                }
            } catch (e) { status = "dyList - Err"; }
        }

        , F_MapVal: function (ao_PlanObj) {
            var lo_Datas = dyList.ts_SelectItem();
            if (lo_Datas != null) {
                for (var ls_Item in ao_PlanObj) {
                    var lo_ = ao_PlanObj[ls_Item];
                    if ($.type(lo_) === "string") {
                        lo_ = $('#' + lo_);
                    }
                    switch (ls_Item) {
                        case "html":
                            dyList.F_Bind(lo_, lo_Datas.html());
                            break;
                        default:
                            dyList.F_Bind(lo_, lo_Datas.attr(ls_Item));
                            break;
                    }
                }
            }
            return this;
        }
        , ts_SelectData: function () {
            var a = $("#selectable li.ui-selected");
            if (a) {
                return [a.attr("data-value"), a.html()];
            }
            return null;
        }
        , ts_SelectItem: function () {
            var a = $("#selectable li.ui-selected");
            if (a) {
                return a;
            }
            return null;
        }
        , F_Clear: function () {
            for (var li_ = 0; li_ < arguments.length; li_++) {
                var lo_ = $('#' + arguments[li_]);
                if (lo_) {
                    lo_.val('')
                        .next('span')
                        .html('');
                }

            }
            return this;
        }
        , F_load_data: function (o) {
            //alert(dyList.ts_dyObj(o.id));
            if (dyList.ts_dyObj(o.id) == false) {
                return;
            }
            var u = dyList.e_EObj.Url;
            if ($.isFunction(u)) {
                u = u();
            }

            u += (u.indexOf('?') == -1
                ? '?dyd=' + (new Date())
                : '&dyd=' + (new Date())
                );
            var arr = u.split('?');
            arr[1] = encodeURI(arr[1]);
            u = arr.join('?');
            //alert(u);
            $.ajax({ url: u }).done(function (data) {
                dyList.dyWin.html(data);
                $("#selectable").selectable({
                    selected: function (event, ui) {
                        dyList.e_EObj.setval(); //.F_setval();
                        dyList.dyWin.dialog("close");
                    }
                });
                dyList.dyWin.dialog({ draggable: false, closeOnEscape: true,
                    position: { my: "left top", at: "left bottom", of: o }, open: function (event, ui) { o.focus(); }
                });
            });
        }
        , F_SetEvent: function (ao_dyListObj) {
            ao_dyListObj.ts_JQ().keydown(function (event) {
                if (!dyList.dyWin.dialog("isOpen")) return;
                if (event.which == 13 || event.which == 27 || event.which == 38 || event.which == 40) {
                    if (event.which == 13 || event.which == 27)
                        dyList.dyWin.dialog("close");
                    else {
                        var a = $("#selectable li.ui-selected");
                        if (a.length > 0) {
                            a.removeClass("ui-selected");
                            var b = a;
                            if (event.which == 38)
                                a = a.prev();
                            else
                                a = a.next();
                            if (!a) a = b;
                        } else {
                            a = $("#selectable li:first");
                        }
                        a.addClass("ui-selected");
                        dyList.e_EObj.setval();
                    }
                    event.preventDefault();
                    return false;
                }
            })
            .keyup(function (event) {
                if (event.which == 13 || event.which == 27 || event.which == 38 || event.which == 40) {
                    event.preventDefault();
                    return false;
                }
                dyList.F_load_data(this);
            })
            .click(function () {
                dyList.F_load_data(this);
            });
            return ao_dyListObj;
        }
        , Init: function (Args) {
            //alert('test');
            for (var li_ = 0; li_ < Args.length; li_++) {
                var lo_ = $.extend({}, dyList.e_EObj, { setval: dyList.F_setval }, Args[li_]);
                //Pub_App.ts_ObjInfo(lo_, 2);
                dyList.dyItems.push(dyList.F_SetEvent(lo_));
            }
            dyList.dyWin = $('#dialog');
            if (dyList.dyWin.length == 0) {
                dyList.dyWin = $("<div id=dialog ></div>");
                $('body').append(dyList.dyWin);
            }

        }

    }
})(jQuery);

 
