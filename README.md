# 날씨앱 🌤️

WeatherAPI.com을 사용한 실시간 날씨 정보 웹 애플리케이션입니다.

## 기능 ✨

- **실시간 날씨 정보**: 현재 온도, 체감온도, 습도, 풍속, 기압 표시
- **5일 예보**: 향후 5일간의 날씨 예보
- **도시 검색**: 전 세계 도시의 날씨 정보 검색 (한글 도시명 지원)
- **내 위치 날씨**: GPS를 이용한 현재 위치 날씨 정보
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **모던 UI**: 아름다운 그라데이션과 애니메이션 효과

## 설치 및 사용법 🚀

### 1. API 키 발급
1. [WeatherAPI.com](https://www.weatherapi.com/)에 가입
2. 무료 API 키 발급 (월 1,000,000 요청 제한)
3. `script/script.js` 파일의 `apiKey` 변수에 발급받은 키 입력

```javascript
this.apiKey = 'YOUR_API_KEY_HERE'; // 여기에 실제 API 키 입력
```

### 2. 파일 실행
1. 모든 파일을 웹 서버에 업로드
2. `index.html` 파일을 브라우저에서 열기
3. 또는 로컬 서버 실행:
   ```bash
   # Python 사용시
   python -m http.server 8000
   
   # Node.js 사용시
   npx http-server
   ```

## 파일 구조 📁

```
weather-app/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 스타일시트
├── script/
│   └── script.js       # JavaScript 로직
└── README.md           # 이 파일
```

## 사용 방법 📖

### 도시 검색
1. 상단 검색창에 도시명 입력 (예: 서울, 부산, 제주, 도쿄, 뉴욕)
2. 검색 버튼 클릭 또는 Enter 키 누르기
3. 해당 도시의 현재 날씨와 5일 예보 확인

### 내 위치 날씨
1. "내 위치 날씨" 버튼 클릭
2. 브라우저에서 위치 권한 허용
3. 현재 위치의 날씨 정보 자동 표시

## 기술 스택 🛠️

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션, 반응형 디자인
- **JavaScript (ES6+)**: 클래스, async/await, Fetch API
- **Font Awesome**: 아이콘
- **WeatherAPI.com**: 날씨 데이터

## 브라우저 지원 🌐

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 라이선스 📄

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 기여하기 🤝

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 생성하세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성하세요

## 문제 해결 🔧

### API 키 오류
- WeatherAPI.com에서 발급받은 키가 올바른지 확인
- API 키가 `script.js` 파일에 정확히 입력되었는지 확인
- API 사용량 한도에 도달하지 않았는지 확인

### 위치 서비스 오류
- 브라우저에서 위치 권한이 허용되었는지 확인
- HTTPS 환경에서 실행 중인지 확인 (위치 서비스는 HTTPS 필요)

### 날씨 데이터가 표시되지 않음
- 인터넷 연결 상태 확인
- 브라우저 개발자 도구의 콘솔에서 오류 메시지 확인
- WeatherAPI.com 서비스 상태 확인

## 업데이트 로그 📝

### v1.0.0 (2024-01-01)
- 초기 버전 릴리스
- 기본 날씨 정보 표시 기능
- 5일 예보 기능
- 반응형 디자인
- 현재 위치 기능

---

**WeatherAPI.com**을 사용하여 제작되었습니다. 더 많은 기능과 정확한 날씨 정보를 원하신다면 [WeatherAPI.com](https://www.weatherapi.com/)을 방문해보세요!
