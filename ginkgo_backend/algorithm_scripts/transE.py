import os
import sys
import os
import json
import importlib
import torch

e1, r = list(map(lambda x: x.strip(), sys.argv[1].split(",")))
downstream_script_dir = sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(downstream_script_dir)
with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "error.txt"), "w") as log_file:
    try:
        from functionality.TransE.src import transE_inference

        log_file.write("Imported from:", transE_inference.__file__)

        try:
            json_data = transE_inference.run_inference(e1, r)
            log_file.write(json_data)
        except ImportError:
            log_file.write("Failed to import transE_inference")  
        except Exception as e:
            log_file.write("Error running transE_inference:", e)
    except Exception as e:
        with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "error.txt"), "a") as log_file:
            log_file.write(f"Error:{e}\n")
quit()




downstream_script_dir = sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# # Add the 'src' parent directory to the sys.path
sys.path.append(downstream_script_dir)
# Now you can import the downstream script as a module
with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "log.txt"), "a") as log_file:
    message = "got here 1"
    log_file.write(message + "\n")

from functionality.TransE.src import transE_inference
with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "log.txt"), "a") as log_file:
    message = f"Imported transE_inference from: {transE_inference.__file__}"
    log_file.write(message + "\n")
json_data = transE_inference.run_inference(e1, r)
with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "log.txt"), "a") as log_file:
    message = json_data
    log_file.write(message + "\n")
print(json_data)
sys.stdout.flush()
