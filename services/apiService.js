import { BOUNDARIEES_IO_API_KEY } from "../consts";

const API_BASE_URL =
  "https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary";

const boundaryService = {
  async getByZipCode(zipCode) {
    const url = new URL(API_BASE_URL);
    const params = new URLSearchParams();
    params.append("zipcode", zipCode);
    url.search = params.toString();

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "x-rapidapi-host": "vanitysoft-boundaries-io-v1.p.rapidapi.com",
          "x-rapidapi-key": BOUNDARIEES_IO_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching boundary data: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.features?.[0]) {
        throw new Error(`${zipCode} is not a valid zipcode`);
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

export default boundaryService;
