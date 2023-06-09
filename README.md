# 글도비 - Geuldobi ✏ 
당신만의 효율적이고 똑똑한 글요정! - 크롬 익스텐션
- 하나의 창 안에서 즉각적인 맞춤법 피드백과 빠른 단어 검색
- 자연어처리 기술을 이용하여 문맥에 맞는 단어 추천 및 격식 문장 추천 (RoBERTa, KoBART)
 

 ## 🎬 시연 영상
  사용 방법은 [유튜브 링크](https://youtu.be/pbjdSkSW3zQ) 및 .gif를 참고해주세요. 
 ######  맞춤법 검사 내용은 Ctrl + Shift + X 를 눌러서 확인할 수 있습니다.
<img src="https://github.com/comgongdaeng/Geuldobi/assets/109388787/06d7c05a-8f85-45d8-bcd0-0436bf034f86" width="80%" height="80%" ></img>


<br/>

## 🔎 크롬 익스텐션 글도비 이용해보기  

### 0. 서버 설치
```
pip install fastapi
pip install uvicorn
```


### 1. 다운로드
   - .zip download 
   - git clone 이용하기
```
git clone https://github.com/comgongdaeng/Geuldobi.git
```  

### 2. <chrome://extensions> 접속
```
chrome://extensions/
```  


### 3. 우측 상단의 개발자모드 켜기
![image](https://github.com/comgongdaeng/Geuldobi/assets/78692557/6c7fbb94-dddc-4a5e-bdae-fb6d6facb456)

![image](https://github.com/comgongdaeng/Geuldobi/assets/78692557/022037f9-39cf-41b0-967b-7310975a3ef9)  


### 4. 글도비 업로드하기
'압축해제된 확장 프로그램을 로드합니다.' 클릭 후 chrome extension 폴더 선택하기

![image](https://github.com/comgongdaeng/Geuldobi/assets/78692557/d6999b6b-d4b4-4284-aa4f-256f67641d84)  


### 5. 콘솔창에서 fastApi 폴더로 이동
```
cd ..\Geulnobi\BackEnd\fastapi
```  


### 6. uvicorn 명령어로 로컬 서버 구동
```
uvicorn main:app --host=0.0.0.0 port=8000
```  
###### 만약 localhost로 구동시, CORS error가 발생한다면 [기술블로그](http://yuniv0.tistory.com/3) 를 참고해주세요!


## Made By

👤 comgongdaeng (comgongdaeng) 
- Github: [@comgongdaeng](https://github.com/comgongdaeng)

👤 Yujin (Yudility)
- Github: [@Yudility](https://github.com/Yudility)

👤 youngnfresh (GaYoung0601) 
-  Github: [@GaYoung0601](https://github.com/GaYoung0601)


<br/>
<br/>

# 📌 포스터 📌
![편하게](https://github.com/comgongdaeng/geuldobi/assets/109388787/7ace29ef-97db-446d-9b3f-93d9086e2191)


