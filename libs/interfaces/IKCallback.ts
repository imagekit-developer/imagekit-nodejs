export interface IKCallback<T, E extends Error = Error> {
	(error?: E, response?: T): void;
}