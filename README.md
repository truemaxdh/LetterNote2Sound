# LetterNote2Sound
JavaScript library to play letter note

[Demo](https://truemaxdh.github.io/LetterNote2Sound/)


# 개발 목적
WebAudio를 이용하여 음악 저작 및 연주를 하는 경우 사용할 수 있는 하부 컴포넌트 개발

# 기본 기능
악보 문자열을 연주할 수 있는 기능
여러개의 악보 문자열의 동시 연주를 통해 화음을 낼 수 있는 기능

# 내부 구현 기능
화음 파트수만큼 Oscillator 생성
악보 문자열 파싱 후, Timeframe에 맞게 맞추어 음을 예약할 수 있는 기능

# 악보 문자열 설계
음의 높낮이와 길이의 결합
## 음의 높낮이
CDEFGAB로 표현
sharp은 #, flat은 b로 표현
## 옥타브
기본 옥타브는 4
### 지속적인 옥타브 변경 : [n]
예)
[3]
[6]
### 일시적인 옥타브 변경(한 음만 변경) : (n)
예)
(2)
(5)
## 쉼표
'-'기호 사용
## 음의 길이
박자수로 표현.
1은 생략 가능
예)
한박자(4분음표) : 1
반박자(8분음표) : 0.5
반의반 박자(16분음표) : 0.25
4박자(온음표) : 4
한박자 반 : 1.5
## 마디 구분
' | ' 또는 '|' 문자열 사용
(마디를 구분하지 않아도 문제는 없음)
## 음의 연결(이음줄)
'+' 기호 사용(아직 구현 안됨)
## 예)
### SoundOfMusic 첫부분
"C1.5D0.5E1.5C0.5 | ECE2 | ..."
### 캐논 변주곡 첫부분
"F#2E2D2C#2 | [3]B2A2B2[0]C#2 | ..."

[Demo](https://truemaxdh.github.io/LetterNote2Sound/)
