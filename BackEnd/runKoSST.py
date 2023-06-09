#!/usr/bin/python3
# -*- coding: euc-kr -*-

from KoSST import paraphrasing


print("*"*80)
sentence = input("  변환하려는 문장: ")
print("*"*80)

print("  바뀐 문장: ",paraphrasing("<s>"+sentence+"</s>"))

print("*"*80)
