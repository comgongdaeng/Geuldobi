import pandas as pd

df = pd.read_csv('sample_test.csv', encoding='UTF-8')
#df = pd.read_table('/content/dataset.txt', encoding='cp949') 
df.head()

df = df.sample(frac=1)

df = df.sample(frac=1).reset_index(drop=True)

df.head()

test_df = df[:13000]
train_df = df[13000:]

df.head()

train_df.to_csv("train_data.csv", index=False)
test_df.to_csv("test_data.csv", index=False)

