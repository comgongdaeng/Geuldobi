#!/usr/bin/python3
# -*- coding: euc-kr -*-

from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch

from konlpy.tag import Okt
import sys
import requests
from bs4 import BeautifulSoup

import numpy as np #2차원 배열 만들기 위해 추가



okt = Okt()

tokenizer = AutoTokenizer.from_pretrained("/home/ubuntu/MLmodel/roberta-large")

model = AutoModelForMaskedLM.from_pretrained("/home/ubuntu/MLmodel/roberta-large")


#다음 사전에서 단어 입력하면 위에 뜨는 관련 단어들을 가져오는 함수
def search_daum_dic(query_keyword): #쿼리 키워드- 바꿀 단어
    dic_url = """http://dic.daum.net/search.do?q={0}"""
    r = requests.get(dic_url.format(query_keyword)) # 쿼리에 바꿀 단어 담아서 보내고...여기서 보내서 받는 r이 뭐지? <- 찾아보기
    soup = BeautifulSoup(r.text, "html.parser") 
    result_means = soup.find_all(attrs={'class':'link_relate'}) #어쨌든 여기서 means 받고

    word = [] #word 배열 선언 하고
    i=0 #여기 i는 어떤의미?
    for elem in result_means: #result_means에 들어가있는 elem들 차례로
        text = elem.get_text().strip() #자르고?
        word.append(text.split()) #word에 하나씩 붙임
    return word #word 배열 반환

#사용자가 바꾸려고 선택한(드래그한) 단어를 [MASK]로 치환해주는 함수
def masking(word_list, new_input, mask): #word_list=품사별로 잘라진 리스트(단어,품사), new input= 단어만 들은 배열, mask=마스킹할 단어
  i=0 #이거 있어야했던가...? 기억이 안나네-> 소영이 코드에 있길래 주석 해제함 
  isMask= False
  for i in range(0, len(word_list)):
    if new_input[i]==mask:
      new_input[i] = "[MASK]"
      isMask=True

  print(new_input) #확인용
  if isMask is False:
    return 0
  
  
  new_sentence = ' '.join(new_input)#new_sentence에 담기
  return new_sentence #바꿀 단어를 마스킹한 문장 반환

#올바른 비교를 위해 모델의 input 문장과 유의어들을 전처리하는 함수
def preprocess(new_sentence, mask): #masking에서 마스킹한 문장, 바꿀 단어 받고

  synDict = search_daum_dic(mask) #다음에서 단어 검색해서 얻은 단어들 담긴 배열을 synDict에 저장
  i=0
  if len(synDict)==0: # 단어 없을때
    print("교체할 수 있는 단어가 없습니다")
    return new_sentence, mask
   #### 여기 수정하기####
    
  for i in range(0, len(synDict)): 
    synDict[i] = str(synDict[i]) #str로 형변환?
    synDict[i] = synDict[i].replace("['","") #[]문자 제거
    synDict[i] = synDict[i].replace("']","")#why?
  #print(synDict) #참고용
  if new_sentence ==0:
    return new_sentence, synDict
  new_sentence = new_sentence.replace("[MASK] ", "[MASK]") #띄어쓰기 없앤 마스킹 문장 
  return new_sentence, synDict #여기서 반환하는 문장은 [MASK]가 들어있는 건가? 

#확률값을 계산하고 그 값이 큰 단어부터 텐서를 정렬하는 함수
def calculate(new_sentence):
  inputs = tokenizer(new_sentence, return_tensors="pt") 
  with torch.no_grad():
    logits = model(**inputs).logits
  mask_token_index = (inputs.input_ids == tokenizer.mask_token_id)[0].nonzero(as_tuple=True)[0]
  ts = torch.sort(logits[0, mask_token_index], dim=- 1, descending=True) #값별로 정렬
  return ts #ts에 뭐가 담기지??

#텐서 안에 32000개의 단어의 인덱스가 들어가있습니다. 그래서 그만큼 비교하는 루프를 작성했습니다.
def max_logit(tensor, synDict):
  word_list = []
  k=0
  size = len(synDict)
  print("size:" + str(size))
  print("tensor:", tensor)
  print("tensor0:", tensor[0])
  print("tensor1:", tensor[1])

  
  if tensor[0] is not None :
    for i in range(0, 32000):
      for j in range(0,size):
         if str(tokenizer.decode(tensor[1][0][i])) == synDict[j]:
          word_list.append(tensor[1][0][i])
          k+=1
          break
      if k==9:
        break
  else:
    word_list

  return word_list

def recommendWord(sentence,MaskWord):
  origin = sentence
  word_list = okt.pos(origin)
  new_input=[] #단어만 넣을 배열 선언
  
  for k in range(0, len(word_list)):
    new_input.append(word_list[k][0])
  
  #hubo=word_list # 구조 옮겨 담기 위해서? 
  #word_list 구조 : ('단어', '품사')
  #word_list[0][1]: 0번째 단어의 품사
  #word_list[1][0]: 1번째 단어의 단어

  new_sentence = masking(word_list,new_input,MaskWord)
  new_sentence, synDict = preprocess(new_sentence, MaskWord)
  
  if new_sentence== 0:
    result = "okt pos bad... error"
    return result
  
  ts = calculate(new_sentence) 
  rec_word_list = []
 
  # 1차원 배열 코드
  rec_word_list = max_logit(ts, synDict)
  result = [''] * len(rec_word_list)
  
  
  for i in range(0,len(rec_word_list)):
    result[i] = tokenizer.decode(int(rec_word_list[i]))
    
  
  return result
  
