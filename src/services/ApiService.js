import axios from 'axios';

class ApiService {
	constructor(baseURL) {
		this.api = axios.create({
			baseURL,
		});
	}

	async getCategories() {
		try {
			const response = await this.api.get('/categories.php');

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getMealsByCategory(category) {
		try {
			const response = await this.api.get(`/filter.php?c=${category}`);

			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export default ApiService;
