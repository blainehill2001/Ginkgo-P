import sys #needed to run python with NodeJS
import subprocess
import subprocess
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.base import MIMEBase
import os
import io
import datetime

# print(sys.argv[1]) #take in the first non-"language" and non-"script" parameter in the API request and return it back to the user
# print(sys.argv[2]) #take in the second non-"language" and non-"script" parameter in the API request and return it back to the user
# print(sys.argv[3]) #take in the second non-"language" and non-"script" parameter in the API request and return it back to the user

email_address = sys.argv[1]
filepaths = sys.argv[2].split(",")
script_file, data_files = filepaths[0], filepaths[1:]

smtp_username, smtp_password, smtp_server, smtp_port = sys.argv[3].split(",")


result = subprocess.check_output(["python", script_file, *data_files])
output = result.decode('utf-8')

# Construct the email message
message = MIMEMultipart()
message['From'] = 'Ginkgo-P@example.com'
message['To'] = email_address
message['Subject'] = f"Your Ginkgo-P Result: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

# Attach the script output as a plain text
message.attach(MIMEText(output))

# Create a text file with the output
output_file = f"Output_{datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.txt"
with open(output_file, 'w') as f:
    f.write(output)

# Attach the files to the email
all_files = [script_file] +  data_files + [output_file]
for file in all_files:
    attachment = MIMEBase('application', 'octet-stream')
    with open(file, 'rb') as f:
        attachment.set_payload(f.read())

    # Set the file name in the email header
    attachment.add_header('Content-Disposition', f'attachment; filename="{os.path.basename(file)}"')
    message.attach(attachment)

# Send the email
try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(message)
        # print("Email sent successfully!")
        print(output)

except smtplib.SMTPException as e:
    print("An error occurred while sending the email.")
    print("Error:", str(e))

os.remove(output_file)

sys.stderr.flush() #flush the error buffer