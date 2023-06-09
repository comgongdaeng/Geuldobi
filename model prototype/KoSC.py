# -*- coding: utf-8 -*-
"""KoSC.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1oT0X2gu087Yx78ln7WRJI2hCpbQrIMpw
"""

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("gayom/KoSC")

model = AutoModelForSeq2SeqLM.from_pretrained("gayom/KoSC")

import torch

def paraphrasing(text):
    tokenized_text = tokenizer(text, return_tensors='pt', truncation=True)
    with torch.no_grad():
        outputs = model.generate(
            tokenized_text['input_ids'],
            do_sample = True,
            eos_token_id = tokenizer.eos_token_id,
            max_length = 512,
            top_p = 0.7,
            top_k = 20,
            # num_beams=10,
            num_return_sequences = 1,
            no_repeat_ngram_size = 2,
            early_stopping = True
        )
        return tokenizer.decode(outputs[0], skip_special_tokens = True)

paraphrasing("<s>맞춤법을 잘 지켜야되</s>")

paraphrasing("<s>안녕하심니따</s>")

paraphrasing("<s>백화점은 할인을 않해</s>")

paraphrasing("<s>ㄴㅓ는 이름이 머야</s>")

paraphrasing("<s>어제 나랑 가치 떡뽁이 먹엇잖아</s>")

paraphrasing("<s>난 니가 왜 그렇게 생각하는지 모르게써.</s>")