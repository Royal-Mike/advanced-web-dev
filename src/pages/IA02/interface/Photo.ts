export default interface Photo {
	id: string;
	alt_description: string | undefined;
	urls: {
		small: string;
	};
	user: {
		name: string;
	};
}