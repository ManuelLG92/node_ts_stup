declare namespace Express {
	export interface Request {
		startAt: string;
	}

	export interface Response {
		executionTime: number;
	}
}
