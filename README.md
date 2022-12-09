# geuldobi
## 프로젝트 '글도비'
- 편한 글쓰기를 도와주는 크롬 익스텐션 서비스
    - 구현 예정 기능 (구현 중인 기능은 현재 구현 상황을 이 레포지토리에 올려두었음.)
    	- 격식 비격식 전환 기능 (구현 중)
       - 맞춤법 교정 기능 (구현 중)
       - 문맥에 맞는 유의어 추천 기능 (구현 중)
       - 긴 문장 알림 기능 (구현 예정)
       - 중복 단어 알림 기능 (구현 예정)
- UI 프로토타입 및 시연 영상 : https://youtu.be/9e2FvxmZY3Y
```
필요한 라이브러리 install까지 포함한 .ipynb을 기능별로 업로드해두었습니다.
해당 파일을 다운받아 코랩에서 실행할 경우에는 아래의 1), 2)번 과정을 생략할 수 있습니다.
```
--- 
## 1. 격식-비격식 전환 기능
*코랩에서 실행하고자 하는 경우 paraphrase.ipynb 실행*
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
>>> paraphrasing("<s>"+[바꿀 문장]+"</s>")
```    
 위의 코드를 사용해서 문장을 비격식체 -> 격식체로 전환할 수 있습니다.
### 4) 실행 예시
```python
>>> paraphrasing("<s>메일로 ppt 파일 보냈어</s>")
메일로 ppt 파일 보내드렸습니다.

```
```python
>>> paraphrasing("<s>반품 하고 싶어. 어디로 연락해야돼?</s>")
반품하고 싶습니다. 어디로 연락해야 합니까
```
```python
>>> paraphrasing("<s>아 모르겠어 진짜 미안</s>")
아 모르겠습니다 진짜 죄송합니다
```
```python
>>> paraphrasing("<s>우리 한국 이번에 이길까?</s>")
우리 한국 이번에 이길 수 있을까요?
```
---
## 2. 맞춤법 교정 모델
*코랩에서 실행하고자 하는 경우 KoSC.ipynb 실행*
### 1) 실행 환경 구축
**transformers 설치**

`pip3 install transformers`
``` python
# 코랩에서 실행하는 경우
!pip install transformers
```


### 2) KoSC.py 실행
직접 학습시킨 모델을 불러오는 코드와

input 문장의 맞춤법을 교정해주는 함수 `correcting(str)`이 정의되어 있습니다.
### 3) 해보기
```python
>>> correcting("<s>"+[바꿀 문장]"</s>")
```    
 위의 코드를 사용해서 [바꿀 문장]을 맞춤법이 교정된 문장으로 전환할 수 있습니다.
 ### 4)  실행 예시
 ```python
>>> correcting("<s>안녕하심니따</s>")
안녕하십니까
```
```python
>>> correcting("<s>백화점은 할인을 않해</s>")
백화점은 할인을 하지 않아
```
 ```python
>>> correcting("<s>어제 나랑 가치 떡뽁이 먹엇잖아.</s>")
어제 나랑 같이 떡볶이 먹었잖아.
```
```python
>>> correcting("<s>ㄴㅓ 이름이 머야?</s>")
너 이름이 뭐야?
```
```python
>>> correcting("<s>맞춤법을 잘 지켜야되</s>")
맞춤법을 잘 지켜야한다
```
```python
>>> correcting("<s>난 니가 왜 그러케 생각하는지 모르게써.</s>")
난 네가 왜 그렇게 생각하는지 모르겠어.
```
```python
>>> correcting("<s>컴퓨터는 완젼 멍충해.</s>")
컴퓨터는 완전히 멍청해.
```
```python
>>> correcting("<s>내가 않했어.</s>")
내가 안 했어.
```
--- 
## 3. 문맥에 맞는 유의어 추천 기능
*코랩에서 실행하고자 하는 경우 syn_recommend.ipynb 실행*
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

현재 **Okt 형태소 분석기가 'Noun'으로 판단하는 한 글자 단어로 시작하는 문장** 또는 **한 단어만**을 입력하면 에러가 발생하고 있습니다. 

수정하기 전까지는 그를 제외한 문장으로 실행해주시기를 부탁드립니다.🥲
### 3) 실행 예시
```python
>>> recommend()
문장을 입력해주세요: 여기에 문장을 적어보면 바꿀 수 있는 단어를 알려줄 거야  

* 과정 확인용 출력:
[('여기', 'Noun'), ('에', 'Josa'), ('문장', 'Noun'), ('을', 'Josa'), ('적어', 'Verb'), ('보면', 'Verb'), ('바꿀', 'Verb'), ('수', 'Noun'), ('있는', 'Adjective'), ('단어', 'Noun'), ('를', 'Josa'), ('알려줄', 'Verb'), ('거야', 'Eomi')]  

바꿀 단어를 선택해주세요.  
1 .  여기  
2 .  문장  
3 .  수  
4 .  있는  
5 .  단어  

바꿀 단어의 번호(숫자만 입력하세요) : 2  

* 과정 확인용 출력:
['여기', '에', '[MASK]', '을', '적어', '보면', '바꿀', '수', '있는', '단어', '를', '알려줄', '거야']  

글
문법
낱말
```
