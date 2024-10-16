import { BOUNDARIEES_IO_API_KEY } from "../consts";
import mock from "../mock";
const API_BASE_URL =
  "https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary";

function addZipCodeToUrl(zipCode) {
  const url = new URL(window.location.href);
  url.searchParams.set("zipcode", zipCode);
  window.history.replaceState({}, "", url.toString());
}

function isValidZipCode(zipCode) {
  const pattern = /^\d{5}(-\d{4})?$/;
  return pattern.test(zipCode);
}

const boundaryService = {
  async getByZipCode(zipCode) {
    if (!isValidZipCode(zipCode)) {
      throw new Error(`Please enter a valid ZIP code.`);
    }

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
        const errormessage = await response.text();

        throw new Error(errormessage || `Error fetching boundary data`);
      }
      addZipCodeToUrl(zipCode);

      if (mock[zipCode]) {
        return Promise.resolve(mock[zipCode]);
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
