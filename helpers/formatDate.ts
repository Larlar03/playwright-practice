const formatDate = (): string => {
	const date = new Date().toLocaleDateString('en-UK', {
		weekday: 'short',
		year: '2-digit',
		day: 'numeric',
		month: 'short',
	});

	const splitDate = date.split(' ');
	const weekday = splitDate[0].slice(0, -1);
	const month = splitDate[2];
	const year = splitDate[3];
	const day = new Date().getDate();

	const getDateSuffix = (n: number): string => {
		if (n > 3 && n < 21) return 'th';
		switch (n % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};

	const formattedDate = `${weekday} ${day}${getDateSuffix(
		day
	)} ${month} ${year}`;

	return formattedDate;
};

formatDate();

export default formatDate;
