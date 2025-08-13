document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================
    // ▼▼▼ ここにあなたのAPIキーを貼り付けてください ▼▼▼
    // ==========================================================
    const apiKey = '6012e463652f7960f16b2649d338ae7d';
    // ==========================================================
    // ▲▲▲ ここにあなたのAPIキーを貼り付け ▲▲▲
    // ==========================================================

    // HTML要素を取得
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const errorMessage = document.getElementById('error-message');

    // 天気情報を取得する非同期関数
    const getWeather = async (city) => {
        if (!apiKey || apiKey === 'ここにあなたのAPIキーを貼り付け') {
            errorMessage.textContent = 'APIキーが設定されていません。';
            return;
        }

        // OpenWeatherMapのAPI URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('都市が見つかりません');
            }
            const data = await response.json();
            displayWeather(data);
            errorMessage.textContent = ''; // エラーメッセージをクリア
        } catch (error) {
            errorMessage.textContent = error.message;
            resetWeatherDisplay();
        }
    };

    // 取得したデータを画面に表示する関数
    const displayWeather = (data) => {
        cityName.textContent = data.name;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = data.wind.speed;
    };
    
    // 天気表示をリセットする関数
    const resetWeatherDisplay = () => {
        cityName.textContent = '--';
        weatherIcon.src = 'https://openweathermap.org/img/wn/01d@2x.png';
        weatherIcon.alt = 'Weather Icon';
        temperature.textContent = '--°C';
        description.textContent = '--';
        humidity.textContent = '--';
        windSpeed.textContent = '--';
    };

    // 検索ボタンのクリックイベント
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    // Enterキーでの検索
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // 初期表示として足利市の天気を表示
    getWeather('Ashikaga');
});