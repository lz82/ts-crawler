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

export function getFail(msg: string, data?: any): IResult {
	return {
		success: false,
		data: data ? data : null,
		msg: msg,
	};
}
