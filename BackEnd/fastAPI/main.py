from enum import Enum
from typing import Union
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import requests
import sys
import uvicorn
import kss
import difflib
from diff_match_patch import diff_match_patch
  
  
sys.path.append('/home/ubuntu/')

from KorSC import correction
from KoSST import paraphrasing
from WordRecTest import recommendWord


class ModelName(str, Enum):
  KoSST = "KoSST"
  KoSC = "KoSC"
  WordRec = "WordRec"
  
  
def searchWord(keyword):
  api_endpoint = "https://stdict.korean.go.kr/api/search.do"
  api_key = "D45770F877853FD6E380D81AE0582361"
  url = f"{api_endpoint}?key={api_key}&q={keyword}&req_type=json"

  response = requests.get(url)
  
  no_Data="no data"
  
  try:
    data = response.json()
  except ValueError as e:
    print("No data found")
    return no_Data
  else:
    channel_data = data["channel"]

    total = channel_data["total"]
    items = []

    for item in channel_data["item"]:
      new_item = {
        "sup_no": item["sup_no"],
        "word": item["word"],
        "definition": item["sense"]["definition"],
        "pos": item["pos"]
      }
      items.append(new_item)

    output_data = {"total" : total, "items":items}
    return output_data


  
    
def show_differences(original_sentence, processed_sentence):
  dmp = diff_match_patch()
  diff = dmp.diff_main(original_sentence, processed_sentence)
  dmp.diff_cleanupSemantic(diff)

  pairs = []  
  
  #len(diff) == 2
  if len(diff) == 2:
    print("if 1")
    if diff[0][0]==0:
      print("if 2")
      if diff[1][0] == -1:
        print("if 3")
        pair = ("DEL", diff[0][1], diff[1][1], None)
        pairs.append(pair)  
      else:
        print("if 4")
        pair = ("ADD", diff[0][1], diff[1][1], None)
        pairs.append(pair)  
  
  if len(diff) >=3 :
    # len(diff) >= 3
    for i in range(len(diff) - 2):
      before_tuple = diff[i]
      current_tuple = diff[i+1]
      next_tuple = diff[i + 2]
  
      if current_tuple[0] == -1:
        if next_tuple[0] == 1:
          pair = ("MOD", before_tuple[1], current_tuple[1], next_tuple[1])
          pairs.append(pair)
        elif next_tuple[0] == 0:
          pair = ("DEL", before_tuple[1], current_tuple[1], next_tuple[1])
          pairs.append(pair)
      if before_tuple[0]==0:
        if current_tuple[0]==1:
          pair = ("ADD", before_tuple[1], current_tuple[1], next_tuple[1])
          pairs.append(pair)
          print("add 1")
          print(pair)
     
    
    print(diff[len(diff)-1])     
    if diff[len(diff)-1][0] == -1:
      if diff[len(diff)-2][0] == 0:
        print("im tired") 
        pair = ("DEL", diff[len(diff)-2][1],  diff[len(diff)-1][1], None)
        pairs.append(pair)  
    elif diff[len(diff)-1][0] == 1:
      if diff[len(diff)-2][0] == 0:
        pair = ("ADD", diff[len(diff)-2][1], diff[len(diff)-1][1], None)
        pairs.append(pair)
        print("add 2")
        print(pair)
        
  print(pairs)
  return pairs 
  
       

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Hello World"}
  
    
@app.get("/isSentence")
async def isSentence(user_input:str):
  
  result = searchWord(user_input)
  
  #isSentence_result = {"result": result}
  
  return result
    
    
@app.get("/model/KoSC")
async def runKoSC(text: str):
  
  sentences = [] 
  sentences = kss.split_sentences(text)
  
  results=[]
  
  for i, sentence in enumerate(sentences):
    processed_sentence = correction("<s>"+sentence+"</s>")
    
    differences = show_differences(sentence, processed_sentence)
    result = {
        'sequence_number': i,
        'original_sentence': sentence,
        'processed_sentence': processed_sentence,
        'differences': differences
    }
    results.append(result)
  
  CorrectionResult = {"Model":"KoSC", "results" : results}
  #correction_result_json = json.dumps(correction_result)
    
  return CorrectionResult
  
  
@app.get("/model/KoSST")
async def runKoSST(user_sentence: str):
 
  new_sentence = paraphrasing("<s>"+user_sentence+"</s>")
  sentence = {"Model":"KoSST", "user_sentence" : new_sentence}
  
  return sentence

@app.get("/model/WordRec")
async def runWordRec(user_sentence: str, MaskWord: str):
     
  rec_word = recommendWord(user_sentence, MaskWord)
    
  #result = {"model_name":model_name, "masked_word": MaskWord, "rec_word" : rec_word}
    
  #result1, result2, result3 = [rec_word[i:i+3] for i in range(0, len(rec_word), 3)]
    
  data = {
    "Model":"WordRec",
    "masked_word": MaskWord,
    "rec_result": rec_word
  }
  
  return JSONResponse(content=data)
  
