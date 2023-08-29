# transE_infer.py 

import tensorflow as tf

# Load model
model = tf.keras.models.load_model('transE_model.h5')

# Perform inference on new triple
head = "entity1" 
relation = "related_to"  

predictions = model.predict_tails((head, relation))

# Print top 5 predictions 
for tail, score in predictions[:5]:
  print(f"{tail}: {score}")