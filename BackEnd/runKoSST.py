#!/usr/bin/python3
# -*- coding: euc-kr -*-

from KoSST import paraphrasing


print("*"*80)
sentence = input("  ��ȯ�Ϸ��� ����: ")
print("*"*80)

print("  �ٲ� ����: ",paraphrasing("<s>"+sentence+"</s>"))

print("*"*80)
