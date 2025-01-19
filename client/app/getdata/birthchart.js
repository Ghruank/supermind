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
  zodiac_type,
  setChart
) => {
  const url = 'https://astrologer.p.rapidapi.com/api/v4/birth-chart';
  console.log(process.env.BIRTH_CHART_TOKEN);
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': "864984c6bdmsh7629e9b05df479fp11ebb7jsn60e266b657e5",
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
        zodiac_type
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