import os
import sys
import json
from scipy.spatial.distance import cdist

import numpy as np



# e1, r = list(map(lambda x: x.strip(), sys.argv[1].split(",")))

e1 = "hormone"
r = "affects"

downstream_script_dir = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../functionality/TransE/'))
# Add the 'src' parent directory to the sys.path
sys.path.append(downstream_script_dir)
# # # Now you can import the downstream script as a module
# # import src.experiments
import src.transE_inference as transE_inference

transE_inference.run_inference(e1, r)

sys.stdout.flush()
