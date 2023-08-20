<!-- @format -->

# SkyViewEu Weather Forecast App

SkyViewEu is a Coursera project designed to provide users with up-to-date weather information for various European cities and countries. This web application fetches weather data for the next 7 days, including the current day, and presents it in an easy-to-use interface.

## Features

- **City and Country Selection:** The application reads city and country data from a CSV file (`city_countries.csv`) and dynamically populates a custom drop-down menu. Users can easily select their desired city and country combination from the drop-down.

- **Search Functionality:** The custom drop-down menu allows users to not only select from the available options but also search for specific cities by typing their names. This ensures a seamless and user-friendly experience.

- **Latitude and Longitude Logging:** Upon selecting a city and country, the corresponding latitude and longitude information is collected. This data is then used to query the 7Timer API for weather data.

- **7Timer API Integration:** The collected latitude and longitude parameters are sent to the 7Timer API, which returns comprehensive weather forecasts for the next 7 days, including today. The retrieved data includes date, weather type, maximum and minimum temperatures, and wind speed.

- **Temperature Unit Conversion:** Users have the option to switch between Celsius and Fahrenheit temperature units, enhancing convenience for users who prefer different units of measurement.

- **Animated Weather Icons:** The weather types are visually represented by animated icons, providing an intuitive way to understand the forecast at a glance.

- **Interactive Grid Display:** The weather information for each day is displayed in an organized grid format, making it easy for users to compare forecasts across the 7-day period.

- **Hover Effects:** Interactive hover effects on grid items provide additional context when users interact with individual weather forecast entries.

- **Animated Text Header:** The project name in the header section features an animated text effect, adding a visually appealing touch to the overall user interface.

## Solution

The goal of SkyViewEu is to create a user-friendly and visually appealing weather forecast application that allows users to quickly access weather information for European cities and countries. By integrating city data from a CSV file, utilizing the 7Timer API, and employing interactive elements, the app offers an efficient way to stay informed about weather conditions.

## Approach

1. **Data Collection:**

   - The project begins by fetching city and country data from a CSV file (`city_countries.csv`). This data is used to populate the custom drop-down menu for city and country selection.

2. **User Interaction:**

   - Users can either select a city and country from the drop-down list or use the search functionality to find specific cities quickly.

3. **Latitude and Longitude Logging:**

   - When users select a city and country, the corresponding latitude and longitude information are captured for further use.

4. **7Timer API Integration:**

   - The collected latitude and longitude parameters are sent to the 7Timer API, which returns comprehensive weather forecasts for the next 7 days, including today. The API response includes essential weather details.

5. **User Experience Enhancement:**

   - The app allows users to switch between Celsius and Fahrenheit temperature units to cater to their preferences.
   - Animated weather icons visually represent different weather types, enhancing the understanding of forecasts.

6. **Data Presentation:**

   - The weather data for each day is presented in an organized grid format. Interactive hover effects provide additional information when users interact with forecast entries.

7. **Visual Appeal:**
   - An animated text header adds an attractive touch to the project's interface, making it more engaging for users.

## Usage

1. Open the web application.
2. Use the custom drop-down menu to select your desired city and country combination.
3. Explore the 7-day weather forecast, including today's weather details.
4. Toggle between Celsius and Fahrenheit temperature units as needed.
5. Observe the animated weather icons, hover effects, and other interactive elements for a comprehensive weather viewing experience.

## Skills Showcased

- Dynamic data retrieval using JavaScript.
- Creating custom drop-down menus with search functionality.
- Integration of third-party APIs (7Timer API).
- User interface design and styling with CSS.
- Interactive elements and hover effects.
- Temperature unit conversion.
- Animation effects for improved user experience.

## Tools Used

- JavaScript for fetching data and creating interactive elements.
- CSS for styling the user interface and grid layout.
- 7Timer API for retrieving detailed weather forecasts.
- CSV file (`city_countries.csv`) for initial city and country data.

## Acknowledgments

This project was created as part of the Coursera curriculum and serves as an example of integrating various web technologies to deliver a functional and visually appealing weather forecast application.

**Note:** Weather data and forecasts are provided by the 7Timer API. The accuracy and reliability of the information may vary.
