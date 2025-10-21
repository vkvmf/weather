// Weather App JavaScript
class WeatherApp {
  constructor() {
    // WeatherAPI.com API 키 (실제 사용시 발급받은 키로 교체)
    this.apiKey = '19dce74c1c654d0f8ef53907252110'; // WeatherAPI.com에서 발급받은 API 키를 입력하세요
    this.apiBaseUrl = 'https://api.weatherapi.com/v1';
    
    // DOM 요소들
    this.cityInput = document.getElementById('cityInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.currentLocationBtn = document.getElementById('currentLocationBtn');
    this.loading = document.getElementById('loading');
    
    // 날씨 정보 표시 요소들
    this.cityName = document.getElementById('cityName');
    this.currentDate = document.getElementById('currentDate');
    this.weatherIcon = document.getElementById('weatherIcon');
    this.temperature = document.getElementById('temperature');
    this.weatherDescription = document.getElementById('weatherDescription');
    this.feelsLike = document.getElementById('feelsLike');
    this.humidity = document.getElementById('humidity');
    this.windSpeed = document.getElementById('windSpeed');
    this.pressure = document.getElementById('pressure');
    this.forecastContainer = document.getElementById('forecastContainer');
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateCurrentDate();
    this.loadDefaultWeather();
  }
  
  setupEventListeners() {
    // 검색 버튼 클릭 이벤트
    this.searchBtn.addEventListener('click', () => {
      this.searchWeather();
    });
    
    // 엔터키 검색 이벤트
    this.cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchWeather();
      }
    });
    
    // 현재 위치 버튼 클릭 이벤트
    this.currentLocationBtn.addEventListener('click', () => {
      this.getCurrentLocationWeather();
    });
  }
  
  updateCurrentDate() {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.currentDate.textContent = now.toLocaleDateString('ko-KR', options);
  }
  
  convertKoreanCityName(city) {
    const cityMap = {
      '서울': 'Seoul',
      '부산': 'Busan',
      '인천': 'Incheon',
      '대구': 'Daegu',
      '대전': 'Daejeon',
      '광주': 'Gwangju',
      '울산': 'Ulsan',
      '세종': 'Sejong',
      '수원': 'Suwon',
      '용인': 'Yongin',
      '고양': 'Goyang',
      '창원': 'Changwon',
      '제주': 'Jeju',
      '청주': 'Cheongju',
      '전주': 'Jeonju',
      '천안': 'Cheonan',
      '평택': 'Pyeongtaek',
      '안산': 'Ansan',
      '안양': 'Anyang',
      '포항': 'Pohang',
      '의정부': 'Uijeongbu',
      '원주': 'Wonju',
      '춘천': 'Chuncheon',
      '강릉': 'Gangneung',
      '도쿄': 'Tokyo',
      '오사카': 'Osaka',
      '교토': 'Kyoto',
      '베이징': 'Beijing',
      '상하이': 'Shanghai',
      '홍콩': 'Hong Kong',
      '타이베이': 'Taipei',
      '방콕': 'Bangkok',
      '싱가포르': 'Singapore',
      '런던': 'London',
      '파리': 'Paris',
      '로마': 'Rome',
      '베를린': 'Berlin',
      '뉴욕': 'New York',
      '로스앤젤레스': 'Los Angeles',
      '시카고': 'Chicago',
      '샌프란시스코': 'San Francisco',
      '시드니': 'Sydney',
      '멜버른': 'Melbourne'
    };
    
    return cityMap[city] || city;
  }
  
  async loadDefaultWeather() {
    // 기본 도시로 서울 날씨 로드
    await this.fetchWeatherData('Seoul');
  }
  
  async searchWeather() {
    const city = this.cityInput.value.trim();
    if (!city) {
      this.showError('도시명을 입력해주세요.');
      return;
    }
    
    // 한글 도시명을 영어로 변환하거나 그대로 사용
    const searchCity = this.convertKoreanCityName(city);
    await this.fetchWeatherData(searchCity);
  }
  
  async getCurrentLocationWeather() {
    if (!navigator.geolocation) {
      this.showError('죄송해요! 이 브라우저에서는 위치 서비스를 사용할 수 없어요.');
      return;
    }
    
    this.showLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await this.fetchWeatherDataByCoords(latitude, longitude);
      },
      (error) => {
        this.showLoading(false);
        this.showError('위치 정보를 가져올 수 없어요. 위치 권한을 허용해주세요!');
        console.error('Geolocation error:', error);
      }
    );
  }
  
  async fetchWeatherData(city) {
    if (this.apiKey === 'YOUR_API_KEY_HERE') {
      this.showError('API 키를 설정해주세요! WeatherAPI.com에서 발급받은 키를 script.js 파일에 입력해주세요.');
      return;
    }
    
    this.showLoading(true);
    
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=5&lang=ko`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.displayWeatherData(data);
      this.showLoading(false);
    } catch (error) {
      this.showLoading(false);
      this.showError('날씨 정보를 가져올 수 없어요. 도시명을 다시 확인해주세요!');
      console.error('Weather API error:', error);
    }
  }
  
  async fetchWeatherDataByCoords(lat, lon) {
    if (this.apiKey === 'YOUR_API_KEY_HERE') {
      this.showError('API 키를 설정해주세요!');
      return;
    }
    
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=5&lang=ko`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.displayWeatherData(data);
      this.showLoading(false);
    } catch (error) {
      this.showLoading(false);
      this.showError('날씨 정보를 가져올 수 없어요. 잠시 후 다시 시도해주세요!');
      console.error('Weather API error:', error);
    }
  }
  
  displayWeatherData(data) {
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;
    
    // 현재 날씨 정보 표시
    this.cityName.textContent = `${location.name}, ${location.country}`;
    this.temperature.textContent = Math.round(current.temp_c);
    this.weatherDescription.textContent = current.condition.text;
    this.feelsLike.textContent = `${Math.round(current.feelslike_c)}°C`;
    this.humidity.textContent = `${current.humidity}%`;
    this.windSpeed.textContent = `${current.wind_kph} km/h`;
    this.pressure.textContent = `${current.pressure_mb} hPa`;
    
    // 날씨 아이콘 설정
    this.setWeatherIcon(current.condition.code, current.is_day);
    
    // 5일 예보 표시
    this.displayForecast(forecast);
    
    // 검색창 초기화
    this.cityInput.value = '';
  }
  
  setWeatherIcon(code, isDay) {
    const iconMap = {
      // 맑음
      1000: isDay ? 'fas fa-sun' : 'fas fa-moon',
      
      // 구름
      1003: isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon',
      1006: 'fas fa-cloud',
      1009: 'fas fa-cloud',
      
      // 비
      1063: 'fas fa-cloud-rain',
      1183: 'fas fa-cloud-rain',
      1186: 'fas fa-cloud-rain',
      1189: 'fas fa-cloud-rain',
      1192: 'fas fa-cloud-rain',
      1195: 'fas fa-cloud-rain',
      1201: 'fas fa-cloud-rain',
      1204: 'fas fa-cloud-rain',
      1207: 'fas fa-cloud-rain',
      1210: 'fas fa-cloud-rain',
      1213: 'fas fa-cloud-rain',
      1216: 'fas fa-cloud-rain',
      1219: 'fas fa-cloud-rain',
      1222: 'fas fa-cloud-rain',
      1225: 'fas fa-cloud-rain',
      1237: 'fas fa-cloud-rain',
      
      // 눈
      1066: 'fas fa-snowflake',
      1114: 'fas fa-snowflake',
      1117: 'fas fa-snowflake',
      1147: 'fas fa-snowflake',
      1150: 'fas fa-snowflake',
      1153: 'fas fa-snowflake',
      1168: 'fas fa-snowflake',
      1171: 'fas fa-snowflake',
      1240: 'fas fa-snowflake',
      1243: 'fas fa-snowflake',
      1246: 'fas fa-snowflake',
      1249: 'fas fa-snowflake',
      1252: 'fas fa-snowflake',
      1255: 'fas fa-snowflake',
      1258: 'fas fa-snowflake',
      1261: 'fas fa-snowflake',
      1264: 'fas fa-snowflake',
      
      // 천둥번개
      1087: 'fas fa-bolt',
      1273: 'fas fa-bolt',
      1276: 'fas fa-bolt',
      1279: 'fas fa-bolt',
      1282: 'fas fa-bolt',
      
      // 안개
      1030: 'fas fa-smog',
      1135: 'fas fa-smog',
      1147: 'fas fa-smog'
    };
    
    this.weatherIcon.className = iconMap[code] || 'fas fa-sun';
  }
  
  displayForecast(forecast) {
    this.forecastContainer.innerHTML = '';
    
    forecast.forEach((day, index) => {
      const forecastItem = document.createElement('div');
      forecastItem.className = 'forecast-item';
      
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString('ko-KR', { weekday: 'short' });
      
      forecastItem.innerHTML = `
        <div class="forecast-date">${dayName}</div>
        <div class="forecast-icon">
          <i class="${this.getForecastIcon(day.day.condition.code)}"></i>
        </div>
        <div class="forecast-temp">
          ${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°
        </div>
        <div class="forecast-desc">${day.day.condition.text}</div>
      `;
      
      this.forecastContainer.appendChild(forecastItem);
    });
  }
  
  getForecastIcon(code) {
    const iconMap = {
      1000: 'fas fa-sun',
      1003: 'fas fa-cloud-sun',
      1006: 'fas fa-cloud',
      1009: 'fas fa-cloud',
      1063: 'fas fa-cloud-rain',
      1183: 'fas fa-cloud-rain',
      1186: 'fas fa-cloud-rain',
      1189: 'fas fa-cloud-rain',
      1192: 'fas fa-cloud-rain',
      1195: 'fas fa-cloud-rain',
      1201: 'fas fa-cloud-rain',
      1204: 'fas fa-cloud-rain',
      1207: 'fas fa-cloud-rain',
      1210: 'fas fa-cloud-rain',
      1213: 'fas fa-cloud-rain',
      1216: 'fas fa-cloud-rain',
      1219: 'fas fa-cloud-rain',
      1222: 'fas fa-cloud-rain',
      1225: 'fas fa-cloud-rain',
      1237: 'fas fa-cloud-rain',
      1066: 'fas fa-snowflake',
      1114: 'fas fa-snowflake',
      1117: 'fas fa-snowflake',
      1147: 'fas fa-snowflake',
      1150: 'fas fa-snowflake',
      1153: 'fas fa-snowflake',
      1168: 'fas fa-snowflake',
      1171: 'fas fa-snowflake',
      1240: 'fas fa-snowflake',
      1243: 'fas fa-snowflake',
      1246: 'fas fa-snowflake',
      1249: 'fas fa-snowflake',
      1252: 'fas fa-snowflake',
      1255: 'fas fa-snowflake',
      1258: 'fas fa-snowflake',
      1261: 'fas fa-snowflake',
      1264: 'fas fa-snowflake',
      1087: 'fas fa-bolt',
      1273: 'fas fa-bolt',
      1276: 'fas fa-bolt',
      1279: 'fas fa-bolt',
      1282: 'fas fa-bolt',
      1030: 'fas fa-smog',
      1135: 'fas fa-smog',
      1147: 'fas fa-smog'
    };
    
    return iconMap[code] || 'fas fa-sun';
  }
  
  showLoading(show) {
    if (show) {
      this.loading.classList.add('show');
    } else {
      this.loading.classList.remove('show');
    }
  }
  
  showError(message) {
    // 기존 에러 메시지 제거
    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // 새 에러 메시지 생성
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // 검색 섹션 다음에 삽입
    const searchSection = document.querySelector('.search-section');
    searchSection.insertAdjacentElement('afterend', errorDiv);
    
    // 5초 후 자동 제거
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
  
  showSuccess(message) {
    // 기존 성공 메시지 제거
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
      existingSuccess.remove();
    }
    
    // 새 성공 메시지 생성
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // 검색 섹션 다음에 삽입
    const searchSection = document.querySelector('.search-section');
    searchSection.insertAdjacentElement('afterend', successDiv);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 3000);
  }
}

// 페이지 로드 시 WeatherApp 초기화
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});

// 서비스 워커 등록 (PWA 기능)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
