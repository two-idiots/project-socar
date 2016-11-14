"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.test = "blue";
        this.values = [1, 2, 3];
        this.check = false;
        this.test = "fantastic baby";
        this.items = [];
        this.addItem("Dog 0");
        this.addItem("Dog 1");
        this.addItem("Dog 2");
    }
    AppComponent.prototype.resetValue = function (event) {
        console.log(event);
    };
    AppComponent.prototype.addItem = function (name) {
        this.items.push({ id: this.items.length, name: name });
    };
    AppComponent.prototype.removeItem = function () {
        this.items.pop();
    };
    AppComponent.prototype.showAlert = function (message) {
        alert(message);
    };
    AppComponent.prototype.onSave = function (event) {
        if (this.items.length >= 10)
            this.showAlert("더 이상 추가시킬 수 없습니다.");
        else
            this.addItem("Dog " + this.items.length);
    };
    AppComponent.prototype.onDelete = function (event) {
        if (this.items.length > 0)
            this.removeItem();
        else
            this.showAlert("더 이상 지울 목록이 없습니다.");
    };
    AppComponent.prototype.over = function (id) {
        console.log("over : " + id);
    };
    AppComponent.prototype.leave = function (id) {
        console.log("leave : " + id);
    };
    AppComponent.prototype.move = function (id) {
        console.log("move : " + id);
    };
    AppComponent.prototype.click = function (id) {
        console.log("click : " + id);
    };
    AppComponent.prototype.getName = function (id) {
        return this.items[id].name;
    };
    /*editItem(id : number){
        if(event.keyCode == 13){
            this.inputValue = event.target.value;
            this.inputLength = event.target.length;

            if(this.inputLength<=0)
                this.showAlert("변경 값을 입력하세요.");

            else if(this.inputLength>10)
                this.showAlert("10글자 이하로 입력하세요.");

            else{
                if(this.getName(id) === this.inputValue)
                    this.showAlert("이전 값과 동일합니다.");
                else
                    this.items[id].name = this.inputValue;
            }

            console.log(event.target.value);
            console.log(event.target);
            console.log(event);
        }
    }*/
    AppComponent.prototype.editItem = function (id, value) {
        console.log(id + "/" + value + "/" + value.length);
        if (value.replace(/^\s+|\s+$/g, '') == "")
            this.showAlert("공백은 입력불가합니다.");
        else if (value.length <= 0)
            this.showAlert("변경 값을 입력하세요.");
        else if (value.length > 10)
            this.showAlert("10글자 이하로 입력하세요.");
        else {
            if (this.getName(id) === value)
                this.showAlert("이전 값과 동일합니다.");
            else
                this.items[id].name = value;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'test.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map