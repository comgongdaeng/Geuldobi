#!/usr/bin/python3
# -*- coding: euc-kr -*-

from WordRecTest import recommendWord


print('*'*30 + '-'*10 + '*'*30)

sentence = input(" �����Է�: ")
print("*"*80)

MaskWord= input(" �ٲ� �ܾ�:")

print (recommendWord(sentence,MaskWord))


print("*"*80)

