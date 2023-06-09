# 글도비 - Geuldobi ✏ 

<br/>

## 🔎 크롬 익스텐션 글도비 이용해보기  

0. 서버 설치
```
pip install fastapi
pip install uvicorn
```

<br/>

### 1. 다운로드
   1) .zip download 
   2) git clone 이용하기
```
git clone https://github.com/comgongdaeng/Geuldobi.git
```  

<br/>

### 2. [chrome://extensions/](chrome://extensions) 접속
```
chrome://extensions/
```  

<br/>

### 3. 우측 상단의 개발자모드 켜기
![image](https://github.com/comgongdaeng/Geuldobi/assets/78692557/6c7fbb94-dddc-4a5e-bdae-fb6d6facb456)

![image](https://github.com/comgongdaeng/Geuldobi/assets/78692557/022037f9-39cf-41b0-967b-7310975a3ef9)  

<br/>

### 4. '압축해제된 확장 프로그램을 로드합니다.' 클릭 후 chrome extension 파일 업로드
![image](https://github.com/comgongdaeng/Geuldobi/assets/78692557/d6999b6b-d4b4-4284-aa4f-256f67641d84)  

<br/>

### 5. 콘솔창에서 fastApi 폴더로 이동
```
cd ..\Geulnobi\BackEnd\fastapi
```  

<br/>

### 6. uvicorn 명령어로 로컬 서버 구동
```
uvicorn main:app --host=0.0.0.0 port=8000
```  
 만약 localhost로 구동시, CORS error가 발생한다면 [기술블로그](http://yuniv0.tistory.com/3) 를 참고해주세요!  

<br/>


<br/>

# 📌 포스터 📌
![편하게](https://github.com/comgongdaeng/geuldobi/assets/109388787/7ace29ef-97db-446d-9b3f-93d9086e2191)
