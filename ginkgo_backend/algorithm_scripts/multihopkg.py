import sys
import os

e1, r = list(map(lambda x: x.strip(), sys.argv[1].split(",")))


#insert demo stringified multihopkgqa data
# print("{\n\"status\":\"Consistent\",\n\"highlighted_path\": [{\"source\": 1, \"type\": \"hasCapital\", \"target\": 2}, {\"source\": 5, \"type\": \"isLocatedIn\", \"target\": 2}],\n\"graph\":{\n\"nodes\":[\n{\n\"id\":3,\n\"name\":\"1600_Penn\",\n\"label\":\"\"\n},\n{\n\"id\":1,\n\"name\":\"United_States\",\n\"label\":\"\"\n},\n{\n\"id\":2,\n\"name\":\"Washington,_D.C.\",\n\"label\":\"\"\n},\n{\n\"id\":5,\n\"name\":\"White_House\",\n\"label\":\"\"\n},\n{\n\"id\":4,\n\"name\":\"Second_inauguration_of_Ronald_Reagan\",\n\"label\":\"\"\n}\n],\n\"links\":[\n{\n\"source\":1,\n\"type\":\"hasCapital\",\n\"target\":2\n},\n{\n\"source\":1,\n\"type\":\"isLocatedIn\",\n\"target\":3\n},\n{\n\"source\":1,\n\"type\":\"hasCapital\",\n\"target\":2\n},\n{\n\"source\":2,\n\"type\":\"isLocatedIn\",\n\"target\":4\n},\n{\n\"source\":2,\n\"type\":\"isLocatedIn\",\n\"target\":5\n},\n{\n\"source\":3,\n\"type\":\"isLocatedIn\",\n\"target\":5\n},\n{\n\"source\":4,\n\"type\":\"isLocatedIn\",\n\"target\":5\n}\n]\n}\n}")


downstream_script_dir = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../functionality/MultiHopKGNoGPU/'))
# Add the 'src' parent directory to the sys.path
sys.path.append(downstream_script_dir)
# # # Now you can import the downstream script as a module
# # import src.experiments
import src.experiments as experiments

experiments.run_inference_ginkgo(e1, r)

sys.stdout.flush()