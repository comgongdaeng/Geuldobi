#!/usr/bin/python3
# -*- coding: euc-kr -*-

#from KoSCTest import correction
from KorSC import correction


print("*"*80)
sentence = input("  �˻��Ϸ��� ����: ")
print("*"*80)

print("  �ٲ� ����: ",correction("<s>"+sentence+"</s>"))

print("*"*80)

