function decoratorGetName<T extends new (...args: any[]) => any>(constructor: T) {
	return class extends constructor {
		getName() {
			console.log(this.name);
		}
	};
}

function decoratorGetType() {
	return function <T extends new (...args: any[]) => any>(constructor: T) {
		return class extends constructor {
			getType() {
				console.log(this.type);
			}
		};
	};
}

function decoratorMethod(target: any, name: string, descriptor: PropertyDescriptor) {
	// console.log('target:', target);
	// console.log('name:', name);
	// console.log('descriptor:', descriptor);
	// descriptor.writable = false;
	// console.log(descriptor.value);
	const temp = descriptor.value;
	descriptor.value = () => {
		temp();
		console.log('this is ' + name);
	};
}

function decoratorLog(target: any, name: string, descriptor: PropertyDescriptor) {
	const oldVal = descriptor.value;
	// descriptor.value = function () {
	// 	console.log(`Calling ${name} with:`, arguments);
	// 	console.log(arguments);
	// 	return oldVal.apply(this, arguments);
	// };
	descriptor.value = (...args: any[]) => {
		console.log(`Calling ${name} with:`, args);
		return oldVal(...args);
	};
}

function decoratorVisit(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log(name);
}

function decoratorProperty(target: any, name: string): any {
	// console.log(target, name);
	const descriptor: PropertyDescriptor = {
		writable: false,
	};
	return descriptor;
}

// @decoratorGetName
class Person {
	public name: string;

	constructor(name: string, public age?: number) {
		this.name = name;
	}

	gender: string = 'man';

	@decoratorMethod
	eat() {
		console.log('eat something...');
	}

	drink() {
		console.log('drink something...');
	}

	@decoratorLog
	add(x: number, y: number): number {
		console.log('add', x, y);
		return x + y;
	}

	// @decoratorVisit
	get Name() {
		return this.name;
	}

	@decoratorVisit
	set Name(val: string) {
		this.name = val;
	}
}

const p1 = new Person('lz', 18);
// console.log(p1.gender);
// (p1 as any).getName();
console.log(p1.name);
// p1.eat();

console.log(p1.add(1, 2));

const Animal = decoratorGetType()(
	class {
		private _type: string;
		constructor(type: string) {
			this._type = type;
		}

		get type() {
			return this._type;
		}

		set type(type: string) {
			this._type = type;
		}
	}
);

const cat = new Animal('cat');

cat.getType();
console.log(cat.type);

cat.type = 'dog';
console.log(cat.type);

function component() {
	const getName = function () {};
}
