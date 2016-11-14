import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'test.html'
})

export class AppComponent {
	private test : string = "blue";
	private values : number[] = [1,2,3];
	private items : array;
	private inputValue : string;
	private inputLength : number;
	private check : boolean = false;

	constructor(){
		this.test = "fantastic baby";
		this.items = [];
		this.addItem("Dog 0");
		this.addItem("Dog 1");
		this.addItem("Dog 2");
	}

	resetValue(event){
		console.log(event);
	}

	addItem(name:string){
		this.items.push({id:this.items.length, name:name});
	}

	removeItem(){
		this.items.pop();
	}

	showAlert(message:string){
		alert(message);
	}

	onSave(event:MouseEvent){
		if(this.items.length >= 10)
			this.showAlert("더 이상 추가시킬 수 없습니다.");
		else
			this.addItem("Dog " + this.items.length);
	}

	onDelete(event:MouseEvent){
		if(this.items.length>0)		
			this.removeItem();

		else
			this.showAlert("더 이상 지울 목록이 없습니다.");
	}

	over(id : number){
		console.log("over : " + id);
	}

	leave(id : number){
		console.log("leave : " + id);
	}

	move(id : number){
		console.log("move : " + id);
	}

	click(id : number){
		console.log("click : " + id);
	}

	getName(id : number){
		return this.items[id].name;
	}

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

	editItem(id : number, value : string){
		console.log(id + "/" + value+"/"+value.length);

		if(value.replace(/^\s+|\s+$/g, '' ) == "" )
			this.showAlert("공백은 입력불가합니다.");

		else if(value.length<=0)
			this.showAlert("변경 값을 입력하세요.");

		else if(value.length>10)
			this.showAlert("10글자 이하로 입력하세요.");

		else{
			if(this.getName(id) === value)
				this.showAlert("이전 값과 동일합니다.");
			else
				this.items[id].name = value;
		}
	}
}