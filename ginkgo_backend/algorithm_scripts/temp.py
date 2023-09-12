import os

file_path = '/Users/blaineh2/Documents/Ginkgo-P/ginkgo_backend/functionality/TransE/model/transE_model_UMLS.pkl'

if os.path.exists(file_path):
    print(f"The file exists at: {file_path}")
else:
    print(f"The file does not exist at: {file_path}")