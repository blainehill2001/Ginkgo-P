import sys

# Print the script name and command line arguments
script_file = sys.argv[0] # this is 
data_file_objects =  sys.argv[1:] # obtain all file objects when running the code. will be assigned in order

#let's test this out by printing out some text files we pass to Ginkgo-P
for data_file_object in data_file_objects:
    try:
        with open(data_file_object, 'r') as file:
            # Read the entire contents of the file
            file_contents = file.read()

            # Print the contents
            print(file_contents)
    except FileNotFoundError:
        print(f"File '{data_file_object}' not found.")
    except IOError:
        print(f"Error reading file '{data_file_object}'.")