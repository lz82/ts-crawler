interface IPerson {
	name: string;
}

class DataManager<T extends number | string | Date> {
	constructor(private data: T[]) {}

	getItem(index: number): T {
		return this.data[index];
	}
}

const dm = new DataManager([new Date()]);

console.log(dm.getItem(0));
