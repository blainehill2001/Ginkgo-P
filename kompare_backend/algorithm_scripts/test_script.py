import sys #needed to run python with NodeJS

print(sys.argv[1]) #take in the first non-"language" and non-"script" parameter in the API request and return it back to the user
print(sys.argv[2]) #take in the second non-"language" and non-"script" parameter in the API request and return it back to the user

sys.stdout.flush() #flush the output buffer
sys.stderr.flush() #flush the error buffer