#!/usr/bin/python3
#-*- coding:utf-8 -*-

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

#tokenizer = AutoTokenizer.from_pretrained("yuniv/KoSST")

#model = AutoModelForSeq2SeqLM.from_pretrained("yuniv/KoSST")

tokenizer = AutoTokenizer.from_pretrained("/home/ubuntu/MLmodel/KoSST/")

model = AutoModelForSeq2SeqLM.from_pretrained("/home/ubuntu/MLmodel/KoSST/")

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
            early_stopping= True
        )
    return tokenizer.decode(outputs[0], skip_special_tokens = True)
