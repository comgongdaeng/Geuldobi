# geuldobi
# !!!팀원 여러분 ㅇㅣ거 수정했어요!!!!
```python
2) 모델 불러오기(python)
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
tokenizer = AutoTokenizer.from_pretrained("yuniv/KoSST")
model = AutoModelForSeq2SeqLM.from_pretrained("yuniv/KoSST")
```
이거 없애고 코드에 넣어버린 다음에 바로 .py 파일 실행하게!
---
---
## 프로젝트 '글도비'
- 편한 글쓰기를 도와주는 크롬 익스텐션 서비스
    - 구현 예정 기능 (구현 중인 기능은 현재 구현 상황을 이 레포지토리에 올려두었음.)
    	- 격식 비격식 전환 기능 (구현 중)
       - 맞춤법 교정 기능 (구현 중)
       - 문맥에 맞는 유의어 추천 기능 (구현 중)
       - 긴 문장 알림 기능 (구현 예정)
       - 중복 단어 알림 기능 (구현 예정)
- UI 프로토타입 및 시연 영상 : [링크]

--- 
## 1. 격식-비격식 전환 기능
### 1) 실행 환경 구축
**transformers 설치**

`pip3 install transformers`
``` python
# 코랩에서 실행하는 경우
!pip install transformers
```
### 2) paraphrase.py 실행
직접 학습시킨 모델을 불러오는 코드와
비격식 input 문장을 격식 output으로 전환해주는 `paraphrasing(str)` 함수가 정의되어 있습니다.
### 3) 해보기
```python
paraphrasing("<s>"+[바꿀 문장]+"</s>")
```    
 위의 코드를 사용해서 문장을 비격식체 -> 격식체로 전환할 수 있습니다.
### 4) 실행 예시
![image](https://user-images.githubusercontent.com/109388787/205741229-f9bd6189-9eb8-43cd-b35a-12f4778f584f.png)

---
## 2. 맞춤법 교정 모델
### 1) 실행 환경 구축
**transformers 설치**

`pip3 install transformers`
``` python
# 코랩에서 실행하는 경우
!pip install transformers
```


### 2) correcting.py 실행
직접 학습시킨 모델을 불러오는 코드와
input 문장의 맞춤법을 교정해주는 함수 `correcting(str)`이 정의되어 있습니다.
### 3) 해보기
```python
correcting("<s>"+[바꿀 문장]"</s>")
```    
 위의 코드를 사용해서 [바꿀 문장]을 맞춤법이 교정된 문장으로 전환할 수 있습니다.
 ### 4)  실행 예시
![image](https://user-images.githubusercontent.com/109388787/205741127-f1b3c1a1-567d-4477-9a9f-a210815b83e7.png)

--- 
## 3. 문맥에 맞는 유의어 추천 기능
### 1) 실행 환경 구축
**transformers, konlpy 설치**

`pip3 install transformers`

`pip3 install konlpy`

**윈도우에서는 `pip3 install konlpy`를 통한 설치 외에도 자바 환경변수 설정 등이 필요하므로 
간단한 try는 리눅스/코랩 환경을 추천합니다:)**


``` python
# 코랩에서 실행하는 경우
!pip install transformers
!pip install konlpy
```
### 2) syn_recommend.py 실행
문장 입력, 대체하고 싶은 단어 선택, 추천 단어 확인으로 이루어진 recommend() 함수가 저장된 python 코드입니다.
### 3) 실행 예시
![image](https://user-images.githubusercontent.com/109388787/205956564-82b44e44-3e91-4f6a-9bff-8a28c5e42f03.png)
