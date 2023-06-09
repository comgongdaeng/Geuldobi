#!/usr/bin/python3
# -*- coding: euc-kr -*-

from WordRecTest import recommendWord


print('*'*30 + '-'*10 + '*'*30)

sentence = input(" 문장입력: ")
print("*"*80)

MaskWord= input(" 바꿀 단어:")

print (recommendWord(sentence,MaskWord))


print("*"*80)

