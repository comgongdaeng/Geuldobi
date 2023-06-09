#!/usr/bin/python3
# -*- coding: euc-kr -*-

from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch

from konlpy.tag import Okt
import sys
import requests
from bs4 import BeautifulSoup
okt = Okt()

tokenizer = AutoTokenizer.from_pretrained("/home/ubuntu/MLmodel/roberta-large")

model = AutoModelForMaskedLM.from_pretrained("/home/ubuntu/MLmodel/roberta-large")


#���� �������� �ܾ� �Է��ϸ� ���� �ߴ� ���� �ܾ���� �������� �Լ�
def search_daum_dic(query_keyword):
    dic_url = """http://dic.daum.net/search.do?q={0}"""
    r = requests.get(dic_url.format(query_keyword))
    soup = BeautifulSoup(r.text, "html.parser")
    result_means = soup.find_all(attrs={'class':'link_relate'})

    word = []
    i=0
    for elem in result_means:
        text = elem.get_text().strip()
        word.append(text.split())
    return word

#����ڰ� �ٲٷ��� ������(�巡����) �ܾ [MASK]�� ġȯ���ִ� �Լ�
def masking(word_list, new_input, mask):
  i=0
  for i in range(0, len(word_list)):
    if new_input[i]==mask:
      new_input[i] = "[MASK]"


  print(new_input) #Ȯ�ο�
  new_sentence = ' '.join(new_input)
  return new_sentence

#�ùٸ� �񱳸� ���� ���� input ����� ���Ǿ���� ��ó���ϴ� �Լ�
def preprocess(new_sentence, mask):
  synDict = search_daum_dic(mask)
  i=0
  if len(synDict)==0:
    print("��ü�� �� �ִ� �ܾ �����ϴ�")
    exit(0)
  for i in range(0, len(synDict)): 
    synDict[i] = str(synDict[i])
    synDict[i] = synDict[i].replace("['","")
    synDict[i] = synDict[i].replace("']","")
  #print(synDict) #�����
  new_sentence = new_sentence.replace("[MASK] ", "[MASK]")
  return new_sentence, synDict

#Ȯ������ ����ϰ� �� ���� ū �ܾ���� �ټ��� �����ϴ� �Լ�
def calculate(new_sentence):
  inputs = tokenizer(new_sentence, return_tensors="pt")
  with torch.no_grad():
    logits = model(**inputs).logits
  mask_token_index = (inputs.input_ids == tokenizer.mask_token_id)[0].nonzero(as_tuple=True)[0]
  ts = torch.sort(logits[0, mask_token_index], dim=- 1, descending=True)
  return ts

#�ټ� �ȿ� 32000���� �ܾ��� �ε����� ���ֽ��ϴ�. �׷��� �׸�ŭ ���ϴ� ������ �ۼ��߽��ϴ�.
def max_logit(tensor, synDict):
  word_list = []
  k=0
  size = len(synDict)
  for i in range(0, 32000):
    for j in range(0,size):
      if str(tokenizer.decode(tensor[1][0][i])) == synDict[j]:
        word_list.append(tensor[1][0][i])
        k+=1
        break
    if k==3:
      break
  return word_list

#������ �Է��ϰ� ��ü �ܾ �����ϴ� �Լ�
def recommend():
  origin = str(input("������ �Է����ּ���:"))
  word_list = okt.pos(origin)
  print(word_list)
  print("�ٲ� �ܾ �������ּ���.")
  k=0
  new_input = []
  for k in range(0,len(word_list)):
    new_input.append(word_list[k][0])
  hubo = word_list
  i=0
  j=1
  for i in range(len(word_list)):
    if word_list[i][1]=='Adverb':
      print(j, '. ', word_list[i][0])
      hubo[j] = word_list[i][0]
      j+=1
  #Verb�� ��� Ȱ������ ���� ó���� Ư�� �ʿ��ϹǷ� ���� ���� ����.
  # elif word_list[i][1]=='Verb':
  #   print(j, '. ', word_list[i][0])
  #   hubo[j] = word_list[i][0]
  #   j+=1
    elif word_list[i][1]=='Noun':
      print(j, '. ', word_list[i][0])
      hubo[j] = word_list[i][0]
      j+=1
    elif word_list[i][1]=='Adjective':
      print(j, '.', word_list[i][0])
      hubo[j] = word_list[i][0]
      j+=1
    i+=1
  n = int(input("�ٲ� �ܾ��� ��ȣ(���ڸ� �Է��ϼ���) : "))
  mask = hubo[n]
  #mask�� ġȯ
  new_sentence = masking(word_list, new_input, mask)
  #�񱳸� ���� ��ó��
  new_sentence, synDict = preprocess(new_sentence, mask)
  ts = calculate(new_sentence)
  a = []
  if (synDict):
    a = max_logit(ts, synDict)
  i=0
  for i in range(0,len(a)):#�ִ� �� ��
    print(tokenizer.decode(int(a[i])))

recommend()

"""##������ �ؾ� �� ��:
- ��ü ���ɾ� ������ ��� �����ϰ� ������� ����  
- �ٲ� �� �ִ� �ܾ���� Ȱ������ ���ǹ��� ���� ���� 
  - ����ڰ� '����Ϸ���'�� �巡���Ѵٸ� '����ϴ�'�� ���Ǿ ã�� �ٽ� Ȱ�������� ����
  - �ٲ� ��ü� ���� ������ ���¸� ����(��: ��/��)  
- �� ��Ȯ�� ��ü�� ��õ�� ���� �ٸ� ���¼� �м��� ����
- �ڵ� �����ؼ� �� ���忡 ���� �ܾ �ִ� ��쿡�� �巡���� �ܾ �ٲ� �� �ֵ��� ó��
"""