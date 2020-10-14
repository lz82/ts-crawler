interface IResult {
	success: boolean;
	data: any;
	msg: string | undefined;
}

export function getSuccess(data: any, msg?: string): IResult {
	return {
		success: true,
		data: data,
		msg: msg || '',
	};
}

export function getFail(data: any, msg: string): IResult {
	return {
		success: false,
		data: data,
		msg: msg,
	};
}
