## Here's a quick introduction to the Custom Algorithm functionality of Ginkgo-P

Step 1.) Either git clone Ginkgo-P and run `npm run dev` to start the system locally, or [visit Ginkgo-P here](https://ginkgo-p.onrender.com/).

Step 1.5) If you choose to not visit the hosted website and run your own version locally or hosted, please create a .env file under both `path_to_ginkgo-p/ginkgo_backend` and `path_to_ginkgo-p/ginkgo_frontend`. In the backend .env, set these environment variables while substituting your own values if needed: 

* [MONGODB_URI](https://www.mongodb.com/docs/manual/reference/connection-string/) = a connection string to MongoDB to cache requests.
* NODE_ENV = dev if running locally, or =prod if running on a hosting site.
* PORT = 8080 or some other port to access your application
* SMTP_USERNAME = an username used to send you results via a SMTB service such as [Brevo](https://www.brevo.com/)
* SMTP_PASSWORD = corresponding password to the above username
* SMTP_PORT = 587 (usually this is the port for SMTB services).
* SMTP_SERVER = smtp-relay.sendinblue.com or similar string that represents the url of the SMTB service.
* KMP_DUPLICATE_LIB_OK True


In the frontend .env set these environment variables:

* REACT_APP_DEFAULT_BACKEND = http://localhost:[your PORT here] such as http://localhost:8080
* REACT_APP_BACKEND = https://kompare-backend.onrender.com or whatever your backend url is
* REACT_APP_NODE_ENV = dev if running locally, prod if running on hosted site

Step 2.) Under the "Run Custom KG Algorithm" tab, upload the `ExamplePythonScript.py` file under the Script Upload section.

Step 3.) Upload both `ExampleTextFile1.txt` and `ExampleTextFile2.txt` using [Command/Control + clicks](https://support.apple.com/guide/mac-help/select-items-mchlp1378/mac#:~:text=Select%20multiple%20items%3A%20Press%20and,are%20included%20in%20the%20selection.) under the Data Upload section.

Step 4.) Plug in your Email Address under the Email Upload section.

Step 5.) Wait for your algorithm to finish, and check your email! Don't forget to check your spam, due to overzealous email providers.