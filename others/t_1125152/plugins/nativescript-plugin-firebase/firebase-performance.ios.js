"use strict";
var FirebaseTrace = (function () {
    function FirebaseTrace(name) {
        try {
            this.trace = global.FIRPerformance.startTraceWithName(name);
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    }
    FirebaseTrace.prototype.incrementCounter = function (named) {
        try {
            if (this.trace) {
                this.trace.incrementCounterNamed(named);
            }
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    };
    FirebaseTrace.prototype.stop = function () {
        try {
            if (this.trace) {
                this.trace.stop();
                this.trace = null;
            }
        }
        catch (ex) {
            console.log(ex);
            this.trace = null;
        }
    };
    return FirebaseTrace;
}());
exports.FirebaseTrace = FirebaseTrace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtcGVyZm9ybWFuY2UuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlyZWJhc2UtcGVyZm9ybWFuY2UuaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUdJLHVCQUFtQixJQUFZO1FBQzNCLElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYTtRQUNqQyxJQUFJLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgdmFyIEZpcmViYXNlUGVyZm9ybWFuY2U6IGFueTtcblxuZXhwb3J0IGNsYXNzIEZpcmViYXNlVHJhY2Uge1xuICAgIHByaXZhdGUgdHJhY2U6IGFueTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudHJhY2UgPSBnbG9iYWwuRklSUGVyZm9ybWFuY2Uuc3RhcnRUcmFjZVdpdGhOYW1lKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXgpO1xuICAgICAgICAgICAgdGhpcy50cmFjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVtZW50Q291bnRlcihuYW1lZDogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZih0aGlzLnRyYWNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFjZS5pbmNyZW1lbnRDb3VudGVyTmFtZWQobmFtZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXgpO1xuICAgICAgICAgICAgdGhpcy50cmFjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKHRoaXMudHJhY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4KTtcbiAgICAgICAgICAgIHRoaXMudHJhY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==