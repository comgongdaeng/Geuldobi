#!/usr/bin/python3
# -*- coding: euc-kr -*-

from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch

from konlpy.tag import Okt
import sys
import requests
from bs4 import BeautifulSoup

import numpy as np #2���� �迭 ����� ���� �߰�



okt = Okt()

tokenizer = AutoTokenizer.from_pretrained("/home/ubuntu/MLmodel/roberta-large")

model = AutoModelForMaskedLM.from_pretrained("/home/ubuntu/MLmodel/roberta-large")


#���� �������� �ܾ� �Է��ϸ� ���� �ߴ� ���� �ܾ���� �������� �Լ�
def search_daum_dic(query_keyword): #���� Ű����- �ٲ� �ܾ�
    dic_url = """http://dic.daum.net/search.do?q={0}"""
    r = requests.get(dic_url.format(query_keyword)) # ������ �ٲ� �ܾ� ��Ƽ� ������...���⼭ ������ �޴� r�� ����? <- ã�ƺ���
    soup = BeautifulSoup(r.text, "html.parser") 
    result_means = soup.find_all(attrs={'class':'link_relate'}) #��·�� ���⼭ means �ް�

    word = [] #word �迭 ���� �ϰ�
    i=0 #���� i�� ��ǹ�?
    for elem in result_means: #result_means�� ���ִ� elem�� ���ʷ�
        text = elem.get_text().strip() #�ڸ���?
        word.append(text.split()) #word�� �ϳ��� ����
    return word #word �迭 ��ȯ

#����ڰ� �ٲٷ��� ������(�巡����) �ܾ [MASK]�� ġȯ���ִ� �Լ�
def masking(word_list, new_input, mask): #word_list=ǰ�纰�� �߶��� ����Ʈ(�ܾ�,ǰ��), new input= �ܾ ���� �迭, mask=����ŷ�� �ܾ�
  i=0 #�̰� �־���ߴ���...? ����� �ȳ���-> �ҿ��� �ڵ忡 �ֱ淡 �ּ� ������ 
  isMask= False
  for i in range(0, len(word_list)):
    if new_input[i]==mask:
      new_input[i] = "[MASK]"
      isMask=True

  print(new_input) #Ȯ�ο�
  if isMask is False:
    return 0
  
  
  new_sentence = ' '.join(new_input)#new_sentence�� ���
  return new_sentence #�ٲ� �ܾ ����ŷ�� ���� ��ȯ

#�ùٸ� �񱳸� ���� ���� input ����� ���Ǿ���� ��ó���ϴ� �Լ�
def preprocess(new_sentence, mask): #masking���� ����ŷ�� ����, �ٲ� �ܾ� �ް�

  synDict = search_daum_dic(mask) #�������� �ܾ� �˻��ؼ� ���� �ܾ�� ��� �迭�� synDict�� ����
  i=0
  if len(synDict)==0: # �ܾ� ������
    print("��ü�� �� �ִ� �ܾ �����ϴ�")
    return new_sentence, mask
   #### ���� �����ϱ�####
    
  for i in range(0, len(synDict)): 
    synDict[i] = str(synDict[i]) #str�� ����ȯ?
    synDict[i] = synDict[i].replace("['","") #[]���� ����
    synDict[i] = synDict[i].replace("']","")#why?
  #print(synDict) #�����
  if new_sentence ==0:
    return new_sentence, synDict
  new_sentence = new_sentence.replace("[MASK] ", "[MASK]") #���� ���� ����ŷ ���� 
  return new_sentence, synDict #���⼭ ��ȯ�ϴ� ������ [MASK]�� ����ִ� �ǰ�? 

#Ȯ������ ����ϰ� �� ���� ū �ܾ���� �ټ��� �����ϴ� �Լ�
def calculate(new_sentence):
  inputs = tokenizer(new_sentence, return_tensors="pt") 
  with torch.no_grad():
    logits = model(**inputs).logits
  mask_token_index = (inputs.input_ids == tokenizer.mask_token_id)[0].nonzero(as_tuple=True)[0]
  ts = torch.sort(logits[0, mask_token_index], dim=- 1, descending=True) #������ ����
  return ts #ts�� ���� �����??

#�ټ� �ȿ� 32000���� �ܾ��� �ε����� ���ֽ��ϴ�. �׷��� �׸�ŭ ���ϴ� ������ �ۼ��߽��ϴ�.
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
  new_input=[] #�ܾ ���� �迭 ����
  
  for k in range(0, len(word_list)):
    new_input.append(word_list[k][0])
  
  #hubo=word_list # ���� �Ű� ��� ���ؼ�? 
  #word_list ���� : ('�ܾ�', 'ǰ��')
  #word_list[0][1]: 0��° �ܾ��� ǰ��
  #word_list[1][0]: 1��° �ܾ��� �ܾ�

  new_sentence = masking(word_list,new_input,MaskWord)
  new_sentence, synDict = preprocess(new_sentence, MaskWord)
  
  if new_sentence== 0:
    result = "okt pos bad... error"
    return result
  
  ts = calculate(new_sentence) 
  rec_word_list = []
 
  # 1���� �迭 �ڵ�
  rec_word_list = max_logit(ts, synDict)
  result = [''] * len(rec_word_list)
  
  
  for i in range(0,len(rec_word_list)):
    result[i] = tokenizer.decode(int(rec_word_list[i]))
    
  
  return result
  
