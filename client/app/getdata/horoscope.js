export const fetchHoroscope = async (sign, setHoroscope) => {
  const url = `https://horoscope-astrology.p.rapidapi.com/horoscope?day=today&sunsign=${sign}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '90c8df3111msh49fb0b7fa13c9f5p1a37d5jsn1d4b8a06fbc0',
      'x-rapidapi-host': 'horoscope-astrology.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (response.status === 429) {
      console.error("Too many requests. Please try again later.");
      return;
    }
    if (response.status === 403) {
      console.error("Access forbidden. Please check your API key and permissions.");
      return;
    }
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }
    const result = await response.text();
    const parsedResult = JSON.parse(result);
    console.log("Parsed result:", parsedResult);
    setHoroscope(parsedResult.horoscope);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};