# globit

25-09-21 : index-map.html, high-temperature.html 작업 완료

25-09-23 : JavaScript 코드 분리 및 헤더/푸터 컴포넌트화
- HTML 파일에서 JavaScript 코드를 별도 파일로 분리
  - index.html → js/main.js
  - index-map.html → js/map.js  
  - high-temperature.html → js/high-temperature.js

- 헤더와 푸터를 별도 컴포넌트로 분리
  - components/header.html: 공통 헤더 컴포넌트
  - components/footer.html: 공통 푸터 컴포넌트
  - js/components.js: 동적 로딩 및 공통 기능 관리

- 개선사항:
  - 코드 구조 개선
  - 헤더/푸터 수정 시 한 곳에서만 관리 가능
