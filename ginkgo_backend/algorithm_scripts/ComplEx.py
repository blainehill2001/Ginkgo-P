import os
import sys
import os
import json
import importlib
import torch
e1, r = list(map(lambda x: x.strip(), sys.argv[1].split(",")))
downstream_script_dir = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../functionality/ComplEx/'))
sys.path.append(downstream_script_dir)

import src.ComplEx_inference as ComplEx_inference

json_data = ComplEx_inference.run_inference(e1, r)

print(json_data)
sys.stdout.flush()
