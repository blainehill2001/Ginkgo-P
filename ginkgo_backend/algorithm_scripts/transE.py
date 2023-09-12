import os
import sys
import os
import json


e1, r = list(map(lambda x: x.strip(), sys.argv[1].split(",")))
downstream_script_dir = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../functionality/TransE/'))
# # Add the 'src' parent directory to the sys.path
sys.path.append(downstream_script_dir)

# Now you can import the downstream script as a module
import src.transE_inference as transE_inference
json_data = transE_inference.run_inference(e1, r)
print(json_data)
sys.stdout.flush()
