var dyWin = {
    eObj: null
    , go_Win: null
    , f_ReVal: function () {
        var arr = $(dyWin.eObj).attr('ref').split(',');
        var arr_Re = arguments[0];
        for (var li_ = 0; li_ < arr.length; li_++) {
            var ls_ObjName = $.trim(arr[li_]);
            //alert([ls_ObjName, (ls_ObjName != '')]);
            if (ls_ObjName != '') {
                var lo_ = $('#' + ls_ObjName);
                switch (lo_[0].tagName.toUpperCase()) {
                    case "A":
                    case "DIV":
                    case "SPAN":
                        lo_.html(arr_Re[li_]);
                        break;
                    default:
                        lo_.val(arr_Re[li_]);
                        break;
                }
            }
        }
        dyWin.close();
    }
    , close: function () {
        dyWin.go_Win.dialog("close");
    }
    , open: function (e) {
        e.preventDefault();
        var srcEl = e.srcelement ? e.srcelement : e.target;
        dyWin.eObj = srcEl;
        var ls_Url = $(srcEl).attr('href');
        var horizontalPadding = 30;
        var verticalPadding = 30;
        var size = [$(window).width() - 80, $(window).height() - 80];
        dyWin.go_Win = $("<iframe id='externalSite' class='externalSite' src='" + ls_Url + "' />").dialog({
            //title: ($this.attr('title')) ? $this.attr('title') : 'External Site',
            autoOpen: true,
            closeOnEscape: true,
            show: "fade",
            hide: "fade",
            modal: true,
            resizable: false,
            autoResize: true,
            closeOnEscape: true,
            width: size[0],
            height: size[1],

            overlay: {
                opacity: 0.5,
                background: "black"
            }
        }).width(size[0] - horizontalPadding).height(size[1] - verticalPadding);

    }
    , Init: function () {
        $(document)
			    .on('click', '.xUrl', dyWin.open);
    }
};