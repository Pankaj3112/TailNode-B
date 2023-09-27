const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('./models/book');
require('./config/mongoose');

async function scrapeBooks() {
	const totalPages = 50; // Number of pages to scrape
	const baseUrl = 'http://books.toscrape.com/catalogue/page-';

	// Loop through each page and scrape books
	for (let page = 1; page <= totalPages; page++) {
		const pageUrl = `${baseUrl}${page}.html`;

		try {
			const response = await axios.get(pageUrl);
			const $ = cheerio.load(response.data);

			// Loop through each book on the page
			$('.product_pod').each(async (index, element) => {
				const title = $(element).find('h3 a').attr('title');
				const price = $(element).find('.price_color').text();
				const availability = $(element).find('.availability').text().trim();
				const rating = $(element).find('p.star-rating').attr('class').split(' ')[1];

				// Save book to database
				await Book.create({
					title,
					price,
					availability,
					rating
				});
			});

			console.log(`Scraped page ${page}`);
		} catch (error) {
			console.error(`Error scraping page ${page}: ${error}`);
		}
	}
}

scrapeBooks();