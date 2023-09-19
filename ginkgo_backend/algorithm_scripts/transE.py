import os
import sys
import os
import json
import importlib
import torch
e1, r = list(map(lambda x: x.strip(), sys.argv[1].split(",")))
downstream_script_dir = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../functionality/TransE/'))
sys.path.append(downstream_script_dir)
# with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "error.txt"), "w") as log_file:
#     try:
        
#         log_file.write("got here 1\n")
#         import src.transE_inference as transE_inference
#         log_file.write("got here 2\n")
#         log_file.write(f"Imported from:{transE_inference.__file__}")

#         try:
#             json_data = transE_inference.run_inference(e1, r)
#             log_file.write(json_data)
#         except ImportError:
#             log_file.write("Failed to import transE_inference")  

#     except Exception as e:
#         log_file.write(f"Error:{e}\n")
# quit()



import src.transE_inference as transE_inference

json_data = transE_inference.run_inference(e1, r)

print(json_data)
sys.stdout.flush()
