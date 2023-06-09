from datasets import load_dataset, load_metric
from transformers import BertForMaskedLM, BertTokenizerFast, DataCollatorForLanguageModeling, Trainer, TrainingArguments, BertModel
import numpy as np
import torch
from kobert_tokenizer import KoBERTTokenizer


# Load the dataset and metric
dataset = load_dataset("yuniv/sample")
metric = load_metric("accuracy")

# Load the tokenizer
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')

# Define the maximum input length
max_input_length = 1024

# Define the preprocess function
def preprocess_function(examples):
    model_inputs = tokenizer(examples["wrong"], padding=True, truncation=True, max_length=max_input_length, pad_to_max_length=True )
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(examples["correct"], padding=True, truncation=True, max_length=max_input_length, pad_to_max_length=True )

    model_inputs["labels"] = labels["input_ids"]
   # del model_inputs["labels"]
    return model_inputs



# Tokenize the datasets
tokenized_datasets = dataset.map(preprocess_function, batched=True)

# Load the pre-trained model
model = BertModel.from_pretrained('skt/kobert-base-v1')

# Set the device to use for training
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define the batch size and number of epochs
batch_size = 16
num_epochs = 6

# Define the training arguments
args = TrainingArguments(
    output_dir="model_output",
    evaluation_strategy="steps",
    learning_rate=2e-5,
    per_device_train_batch_size=batch_size,
    per_device_eval_batch_size=batch_size,
    save_total_limit=2,
    num_train_epochs=num_epochs,
    save_steps=1880,
    eval_steps=660,
)

# Define the data collator


# Define the compute metrics function
#def compute_metrics(eval_pred):
#    predictions, labels = eval_pred
#    predictions = np.argmax(predictions, axis=2)
#    mask = labels["labels"] != tokenizer.pad_token_id
#    accuracy = (predictions[mask] == labels["labels"][mask]).mean()
#    return {"accuracy": accuracy}


# Define the compute metrics function
def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = predictions.argmax(axis=1)
    return metric.compute(predictions=predictions, references=labels)

# Create the Trainer object
trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
    compute_metrics=compute_metrics,
)

# Train the model
trainer.train()
