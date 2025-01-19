import requests
from bs4 import BeautifulSoup

def scrape_horoscope(zodiac_sign):
    # URL of the website with the zodiac sign appended
    url = f"https://horoscope-app-api.vercel.app/{zodiac_sign}"
    
    # Send a GET request to fetch the webpage content
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract daily horoscope
        daily_horoscope_section = soup.find('div', {'id': 'daily'})
        daily_horoscope = daily_horoscope_section.text.strip() if daily_horoscope_section else "No daily horoscope found."
        
        # Extract monthly horoscope
        monthly_horoscope_section = soup.find('div', {'id': 'monthly'})
        monthly_horoscope = monthly_horoscope_section.text.strip() if monthly_horoscope_section else "No monthly horoscope found."
        
        return daily_horoscope, monthly_horoscope
    else:
        print(f"Failed to fetch data. HTTP Status Code: {response.status_code}")
        return None, None

# Example usage
if __name__ == "__main__":
    zodiac_sign = "aries"  # Replace with desired zodiac sign (e.g., taurus, gemini, etc.)
    daily, monthly = scrape_horoscope(zodiac_sign)
    
    print(f"Daily Horoscope for {zodiac_sign.capitalize()}:\n{daily}\n")
    print(f"Monthly Horoscope for {zodiac_sign.capitalize()}:\n{monthly}\n")
