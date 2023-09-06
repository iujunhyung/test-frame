/** @type {import('postcss').Configuration} */
const config = {

  // PostCSS 플러그인을 사용하여 변환을 수행합니다.
  plugins: [
    // tailwindcss를 사용합니다.
    require('tailwindcss'),

    // 자동으로 브라우저 접두사를 추가해 줍니다.
    require('autoprefixer'),
    
    // CSS 코드를 최적화하고 압축합니다.
    require('cssnano')({
      preset: 'default', // 기본 압축 설정을 사용합니다.
    }),

    // 최신 CSS 문법을 안전하게 사용할 수 있도록 해줍니다.
    require('postcss-preset-env'), 
    
    // 중첩된 CSS 문법을 일반 CSS로 변환합니다(sass의 중첩기능을 css에도 구현).
    require('postcss-nested'), 
  ],
  
  // input과 output에 대한 Source Map을 생성합니다.
  map: {
    inline: false, // 소스맵을 인라인으로 삽입하지 않습니다.
    annotation: true // 소스맵 주석을 추가합니다.
  }
  
};

module.exports = config;