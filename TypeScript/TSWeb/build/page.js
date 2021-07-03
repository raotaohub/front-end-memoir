"use strict";
console.log('胖子');
var Components;
(function (Components) {
    var SubComponents;
    (function (SubComponents) {
        var Test = /** @class */ (function () {
            function Test() {
                var ele = document.createElement('div');
                ele.innerHTML = 'this is a SubComponents ';
                document.body.appendChild(ele);
            }
            return Test;
        }());
        SubComponents.Test = Test;
    })(SubComponents = Components.SubComponents || (Components.SubComponents = {}));
    var Header = /** @class */ (function () {
        function Header() {
            var ele = document.createElement('div');
            ele.innerHTML = 'this is a Header ';
            document.body.appendChild(ele);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var ele = document.createElement('div');
            ele.innerHTML = 'this is a Header ';
            document.body.appendChild(ele);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var ele = document.createElement('div');
            ele.innerHTML = 'this is a Header ';
            document.body.appendChild(ele);
        }
        return Footer;
    }());
    Components.Footer = Footer;
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Content();
            new Footer();
        }
        return Page;
    }());
    Components.Page = Page;
})(Components || (Components = {}));
