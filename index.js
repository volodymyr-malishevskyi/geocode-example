import fs from 'fs';
import Papa from 'papaparse';

function parseCSV(filePath) {
	const readStream = fs.createReadStream(filePath);
	return new Promise((resolve, reject) => {
		Papa.parse(readStream, {
			header: true,
			skipEmptyLines: true,
			complete: (parsedData) => {
				readStream.close();
				resolve(parsedData.data);
			},
			error: (error) => {
				readStream.close();
				reject(error);
			},
		});
	});
}

const main = async () => {
	const data = await parseCSV('addresses.csv');
	// console.log(data);

	const results = [];

	console.time('fetchCities');
	for (const row of data) {
		const address = `${row.city}, ${row.address}`;
		try {
			const response = await fetch(
				`http://localhost:8080/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`,
			);
			const data = await response.json();
			results.push({
				city: row.city,
				address: row.address,
				x: row.x,
				y: row.y,
				technology: row.technology,
				parsedAddress: data[0] ? data[0].display_name : 'No data found',
				parsedLon: data[0] ? data[0].lon : 'No data found',
				parsedLat: data[0] ? data[0].lat : 'No data found',
			});
			console.log(`Address: ${address}`, data[0] ? data[0].display_name : 'No data found');
		} catch (error) {
			console.error(`Error fetching data for address: ${address}`, error);
			results.push({
				city: row.city,
				address: row.address,
				x: row.x,
				y: row.y,
				technology: row.technology,
				parsedAddress: 'Error fetching data',
				parsedLon: 'Error fetching data',
				parsedLat: 'Error fetching data',
			});
		}
	}
	console.timeEnd('fetchCities');

	const geocodedCSV = Papa.unparse(results, {
		header: true,
		columns: ['city', 'address', 'x', 'y', 'technology', 'parsedAddress', 'parsedLon', 'parsedLat'],
	});

	fs.writeFileSync('addresses_geocoded.csv', geocodedCSV, 'utf8');

	console.log('Parsed addresses saved to parsed_addresses.csv');
	console.log('Total addresses processed:', results.length);
};

main();
