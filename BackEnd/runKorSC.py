#!/usr/bin/python3
# -*- coding: euc-kr -*-

#from KoSCTest import correction
from KorSC import correction


print("*"*80)
sentence = input("  검사하려는 문장: ")
print("*"*80)

print("  바뀐 문장: ",correction("<s>"+sentence+"</s>"))

print("*"*80)

