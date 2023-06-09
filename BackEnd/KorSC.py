#!/usr/bin/python3
# -*- coding: euc-kr -*-

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
#tokenizer = AutoTokenizer.from_pretrained("gayom/KoSC")


#model = AutoModelForSeq2SeqLM.from_pretrained("gayom/KoSC")


tokenizer = AutoTokenizer.from_pretrained("/home/ubuntu/MLmodel/KorSC/")

model = AutoModelForSeq2SeqLM.from_pretrained("/home/ubuntu/MLmodel/KorSC/")




import torch

def correction(text):


    #device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

    # 모델을 GPU로 이동
    #model.to(device)

    # generate 함수 실행


    tokenized_text = tokenizer(text, return_tensors='pt', truncation=True)
    #tokenized_text = tokenizer(text, return_tensors='pt', truncation=True).to(device)
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


