!function($) {
    var isAndroid = function() {
            return -1 != navigator.userAgent.toLowerCase().indexOf("android")
        },
        responsiveHandler = {
            list: [],
            win: {
                h: window.innerHeight,
                w: window.innerWidth
            },
            isIE8: function() {
                return $("html").hasClass("ie8") ? !0 : !1
            },
            getWinSize: function() {
                document.body && document.body.offsetWidth && (this.win.w = document.body.offsetWidth, this.win.h = document.body.offsetHeight), "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (this.win.w = document.documentElement.offsetWidth, this.win.h = document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (this.win.w = window.innerWidth, this.win.h = window.innerHeight), isIOS && (this.win.w = document.body.offsetWidth, this.win.h = document.body.offsetHeight)
            },
            init: function() {
                this.getMode(), responsiveHandler.updateMode(), $(window).resize(function() {
                    responsiveHandler.updateMode(), heroImageUpdate()
                })
            },
            m: "",
            register: function(e, t, i) {
                "" != e && 0 == $.grep(this.list, function(n) {
                    return n.selector == e && n.type == t ? (n.obj = i, n) : void 0
                }).length && this.list.push({
                    selector: e,
                    type: t,
                    obj: i
                })
            },
            unregister: function(e) {
                if ("" != e) {
                    var t;
                    $(responsiveHandler.list).each(function(i, n) {
                        n.selector == e && (t = i)
                    }), t > -1 && responsiveHandler.list.splice(t, 1)
                }
            },
            find: function(e) {
                if (value = !1, "" != e)
                    for (var t = 0; t < this.list.length; t++) {
                        var i = this.list[t];
                        i.selector == e && (value = t)
                    }
                return value
            },
            getMode: function() {
                return this.getWinSize(), this.win.w >= 1e3 || $("body").hasClass("nonresponsive") ? "desktop" : this.win.w >= 768 ? "tablet" : "mobile"
            },
            updateMode: function() {
                var e = this.getMode(),
                    t = $("body"),
                    i = (this.win.h, $(".wrap-terms")),
                    n = $(".image-terms");
                return e == this.m ? !1 : (t.removeClass(this.m).addClass(e), this.m = e, "desktop" == e ? i.insertAfter(".col-right") : (i.insertBefore(".col-right"), n.find("img").addClass("height")), !0)
            },
            recalculate: function() {},
            resize: function() {}
        },
        animateScroll = function(e, t) {
            $("html,body").animate({
                scrollTop: e
            }, {
                duration: t,
                easing: "swing"
            })
        },
        validator = {
            required: function(e) {
                var t = /^\s*$/gi;
                return !t.test(e)
            },
            script: function(e) {
                var t = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
                return !t.test(e)
            },
            symbol: function(e) {
                var t = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
                return !t.test(e)
            },
            email: function(e) {
                var t = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,4}$/i;
                return t.test(e)
            },
            phone: function(e) {
                var t = /^\d|\+|\-$/;
                return t.test(e)
            }
        },
        getParameterByName = function(e, t) {
            t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
            var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
                n = i.exec(t);
            return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
        },
        digitInput = function(e) {
            var t = e || window.event,
                i = t.keyCode || t.which;
            i = String.fromCharCode(i);
            var n = /[0-9]|[\b]|[\t]|[+-]/;
            n.test(i) || (t.returnValue = !1, t.preventDefault && t.preventDefault())
        },
        emailInput = function(e) {
            var t = e || window.event,
                i = t.keyCode || t.which;
            i = String.fromCharCode(i);
            var n = /[a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}\[\]~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|@|[\b]|[\t]|\./;
            n.test(i) || (t.returnValue = !1, t.preventDefault && t.preventDefault())
        },
        heroImageUpdate = function() {
            var e = $(".hero-image"),
                t = $(".image-wrap"),
                i = (e.prop("naturalHeight"), e.prop("naturalWidth"), e.prop("naturalWidth") / e.prop("naturalHeight")),
                n = (t.height(), t.width(), t.width() / t.height());
            i >= n ? e.addClass("height") : e.removeClass("height")
        },
        // checkTime = function() {
        //     var e = new Date($("header").data("time")),
        //         t = e.getDay(),
        //         i = e.getHours(),
        //         n = $("body");
        //     i >= 9 && 17 >= i && t >= 1 && 5 >= t ? n.addClass("office-hour").removeClass("non-office-hour") : n.addClass("non-office-hour").removeClass("office-hour")
        // },
        getAndroidVersion = function() {
            var e = navigator.userAgent.toLowerCase(),
                t = e.match(/android\s([0-9\.]*)/);
            return t ? t[1] : !1
        },
        isIOS = function() {
            return navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? !0 : !1
        },
        form = function() {
            function init() {
                $form = $("form"), $form.get(0).reset(), $fields = $form.find("input, select, textarea"), $error = $form.find(".error-message"), $submit = $form.find("#submit"), $submit.removeClass("inactive"), $fields.blur(function() {
                    validate($(this))
                }), $submit.click(submit)
            }

            function validate($fields) {
                var valid = !0;
                return validator ? ($fields.each(function(idx, ele) {
                    var $ele = $(ele);
                    if (hideError($ele), $ele.data("validate")) {
                        for (var val = $ele.val(), to_validate = $ele.data("validate").split(" "), l = to_validate.length, i = 0; l > i; i++) {
                            var result = !1;
                            switch (to_validate[i]) {
                                default: result = eval("validator." + to_validate[i] + "(val)")
                            }
                            if (!result) break
                        }
                        result ? hideError($ele) : (showError($ele), valid = !1)
                    }
                }), valid) : valid
            }

            function showError(e) {
                $error.filter("[for='" + e.attr("id") + "']").removeClass("hidden"), $fields.filter("[id='" + e.attr("id") + "']").addClass("error")
            }

            function hideError(e) {
                $error.filter("[for='" + e.attr("id") + "']").addClass("hidden"), $fields.filter("[id='" + e.attr("id") + "']").removeClass("error")
            }

            function submit() {
                $submit.hasClass("inactive") || (validate($fields) ? ($submit.addClass("inactive"), $("#call-you").submit()) : animateScroll($(".wrap-form").offset().top, 100))
            }
            var $form, $submit, $fields, $labels, $submit;
            return {
                init: init
            }
        }();
    $("document").ready(function() {
        responsiveHandler.init(), form.init() /*checkTime()*/;
        var e = $("footer"),
            t = $(".wrap-sticky .call-btn"),
            i = $(".wrap-sticky .back-to-top");
        null != getParameterByName("error") && alert($(".wrap-form #call-you").attr("data-alert-msg")), $("a.expandable-link").click(function(e) {
            e.preventDefault();
            var t = $(this),
                i = t.parents(".expandable");
            i.toggleClass("expanded")
        }), $("select[name=title]").change(function(e) {
            e.preventDefault();
            var t = $(this);
            t.find("option:eq(0)").attr("disabled", !0)
        }), $(".wrap-form form").waypoint(function(e) {
            "desktop" != responsiveHandler.m && ("down" == e ? (t.parent().removeClass("sticky"), i.parent().addClass("sticky")) : (t.parent().addClass("sticky"), i.parent().removeClass("sticky")))
        }, {
            offset: "100%"
        }), e.waypoint({
            triggerOnce: !1,
            handler: function(e) {
                "down" == e && i.parent().addClass("relative")
            },
            offset: "100%"
        }), e.waypoint({
            triggerOnce: !1,
            handler: function(e) {
                "up" == e && i.parent().removeClass("relative")
            },
            offset: "100%"
        }), t.click(function(e) {
            e.preventDefault(), animateScroll($(".wrap-form").offset().top, 600)
        }), i.click(function(e) {
            e.preventDefault(), animateScroll($("body").offset().top, 700)
        }), $(".wrap-form form input[name=phone]").keypress(function(e) {
            digitInput(e)
        }), $(".wrap-form form input[name=email]").keypress(function(e) {
            emailInput(e)
        })
    }), $(window).load(function() {
        $("#submit").removeClass("inactive"), responsiveHandler.init(), heroImageUpdate()
    }), $(window).bind("pageshow", function(e) {
        e.originalEvent.persisted && $("#submit").removeClass("inactive")
    })
}(jQuery);