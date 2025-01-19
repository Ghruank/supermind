export const fetchBirthChart = async (
  name,
  year,
  month,
  day,
  hour,
  minute,
  longitude,
  latitude,
  city,
  nation,
  timezone,
  setChart
) => {
  const url = 'https://astrologer.p.rapidapi.com/api/v4/birth-chart';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '90c8df3111msh49fb0b7fa13c9f5p1a37d5jsn1d4b8a06fbc0',
      'x-rapidapi-host': 'astrologer.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: {
        name,
        year,
        month,
        day,
        hour,
        minute,
        longitude,
        latitude,
        city,
        nation,
        timezone,
        zodiac_type: "Tropic",
      },
      theme:'dark-high-contrast'
    })
  };

  try {
    const response = await fetch(url, options);
    if (response.status === 429) {
      console.error("Too many requests. Please try again later.");
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
    setChart(parsedResult.chart);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};