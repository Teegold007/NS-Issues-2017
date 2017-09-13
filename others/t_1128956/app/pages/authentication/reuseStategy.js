"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomReuseStrategy = (function () {
    function CustomReuseStrategy() {
        this.handlers = {};
    }
    CustomReuseStrategy.prototype.shouldDetach = function (route) {
        return !!route.data && !!route.data.shouldDetach;
    };
    CustomReuseStrategy.prototype.store = function (route, handle) {
        this.handlers[route.routeConfig.path] = handle;
    };
    CustomReuseStrategy.prototype.shouldAttach = function (route) {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.retrieve = function (route) {
        if (!route.routeConfig)
            return null;
        return this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        return future.routeConfig === curr.routeConfig;
    };
    return CustomReuseStrategy;
}());
exports.CustomReuseStrategy = CustomReuseStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV1c2VTdGF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV1c2VTdGF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFBQTtRQUVJLGFBQVEsR0FBeUMsRUFBRSxDQUFDO0lBc0J4RCxDQUFDO0lBckJHLDBDQUFZLEdBQVosVUFBYSxLQUE2QjtRQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFFLEtBQUssQ0FBQyxJQUFZLENBQUMsWUFBWSxDQUFDO0lBQzlELENBQUM7SUFFRCxtQ0FBSyxHQUFMLFVBQU0sS0FBNkIsRUFBRSxNQUEyQjtRQUM1RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ25ELENBQUM7SUFFRiwwQ0FBWSxHQUFaLFVBQWEsS0FBNkI7UUFDckMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVBLHNDQUFRLEdBQVIsVUFBUyxLQUE2QjtRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDhDQUFnQixHQUFoQixVQUFpQixNQUE4QixFQUFFLElBQTRCO1FBQ3pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDbkQsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZVJldXNlU3RyYXRlZ3ksIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIERldGFjaGVkUm91dGVIYW5kbGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tUmV1c2VTdHJhdGVneSBpbXBsZW1lbnRzIFJvdXRlUmV1c2VTdHJhdGVneSB7XHJcblxyXG4gICAgaGFuZGxlcnM6IHtba2V5OiBzdHJpbmddOiBEZXRhY2hlZFJvdXRlSGFuZGxlfSA9IHt9O1xyXG4gICAgc2hvdWxkRGV0YWNoKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhcm91dGUuZGF0YSAmJiAhIShyb3V0ZS5kYXRhIGFzIGFueSkuc2hvdWxkRGV0YWNoO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBoYW5kbGU6IERldGFjaGVkUm91dGVIYW5kbGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzW3JvdXRlLnJvdXRlQ29uZmlnLnBhdGhdID0gaGFuZGxlO1xyXG4gICAgfVxyXG5cclxuICAgc2hvdWxkQXR0YWNoKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhcm91dGUucm91dGVDb25maWcgJiYgISF0aGlzLmhhbmRsZXJzW3JvdXRlLnJvdXRlQ29uZmlnLnBhdGhdO1xyXG4gICAgfVxyXG5cclxuICAgICByZXRyaWV2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IERldGFjaGVkUm91dGVIYW5kbGUge1xyXG4gICAgICAgIGlmICghcm91dGUucm91dGVDb25maWcpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXJzW3JvdXRlLnJvdXRlQ29uZmlnLnBhdGhdO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZFJldXNlUm91dGUoZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBjdXJyOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZ1dHVyZS5yb3V0ZUNvbmZpZyA9PT0gY3Vyci5yb3V0ZUNvbmZpZztcclxuICAgIH1cclxuXHJcbn0iXX0=