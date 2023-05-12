import sys #needed to run python with NodeJS
import subprocess

# print(sys.argv[1]) #take in the first non-"language" and non-"script" parameter in the API request and return it back to the user
# print(sys.argv[2]) #take in the second non-"language" and non-"script" parameter in the API request and return it back to the user
# print(sys.argv[3]) #take in the second non-"language" and non-"script" parameter in the API request and return it back to the user

script_file = sys.argv[1]
email_address = sys.argv[2]
data_files = sys.argv[3]
print("\n\n\nThis is script_file:\n")
print(script_file)
print("\n\n\nThis is email_address:\n")
print(email_address)
print("\n\n\nThis is data_files:\n")
print(data_files)
quit()
print("running runcustom.py")
subprocess.call(["python", script_file, data_files])

sys.stdout.flush() #flush the output buffer
sys.stderr.flush() #flush the error buffer