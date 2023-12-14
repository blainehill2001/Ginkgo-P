import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";
import validator from "validator";
import Loading from "../Loading";
import Error from "../Error";
import Result from "../Result";
import { fetchWithTimeout } from "../../ops/fetchWithTimeout";
import { getCustomBackend } from "../../ops/getCustomBackend.js";

var BACKEND = getCustomBackend();

const FileUpload = () => {
  const [script, setScript] = useState([]);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [scriptError, setScriptError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  //custom script hooks
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasError2, setHasError2] = useState(false); //refers to if the custom algo runs properly and doesn't return valid JSON

  const handleScriptChange = (acceptedFiles) => {
    // Check if any of the accepted files have an invalid extension
    const invalidFiles = acceptedFiles.filter(
      (file) =>
        ![".py"].includes(file.name.substring(file.name.lastIndexOf(".")))
    );

    // Update the state variable accordingly
    if (invalidFiles.length > 0) {
      setScriptError(true);
    } else {
      //handle good file
      setScriptError(false);
      setScript(acceptedFiles);
    }
  };

  const handleDataChange = (acceptedFiles) => {
    // Check if any of the accepted files have an invalid extension
    const invalidFiles = acceptedFiles.filter(
      (file) =>
        ![".pickle", ".pkl", ".txt"].includes(
          file.name.substring(file.name.lastIndexOf("."))
        )
    );

    // Update the state variable accordingly
    if (invalidFiles.length > 0) {
      setDataError(true);
    } else {
      //handle good file
      setDataError(false);
      setData(acceptedFiles);
    }
  };

  const handleRemoveScript = (fileIndex) => {
    const newFiles = [...script];
    newFiles.splice(fileIndex, 1);
    setScript(newFiles);
  };

  const handleRemoveData = (fileIndex) => {
    const newFiles = [...data];
    newFiles.splice(fileIndex, 1);
    setData(newFiles);
  };

  const validateEmail = (value) => {
    if (validator.isEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
    }
    setEmail(value);
  };

  const onSubmit = async (custom_script, user_email, data_files) => {
    const formData = new FormData();
    formData.append("language", "python3");
    formData.append("script", "runcustom.py");
    formData.append("user_email", user_email);
    custom_script.forEach((file) => {
      formData.append("script_file", file);
    });
    data_files.forEach((file) => {
      formData.append("data_files", file);
    });
    const params = {
      "method": "POST",
      "body": formData
    };

    console.log(params);

    setIsLoading(true);
    setResponse({});
    setHasError(false);
    fetchWithTimeout(BACKEND, params)
      .then((res) => {
        if (!res.ok) {
          setHasError(true);
          setIsLoading(false);
          console.log(res.status);
        }
        return res.json();
      })
      .then((response_received) => {
        try {
          JSON.parse(response_received.algocall_result.result);
          setIsLoading(false);
          setResponse(response_received);
          console.log(response_received);
        } catch (error) {
          setHasError2(true);
          setIsLoading(false);
          console.log(error);
        }
      })
      .catch((err) => {
        setHasError(true);
        setIsLoading(false);
        console.log(err);
      });
  };

  const onErrors = (response_received) => {
    console.log(response_received);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let scriptValid = true;
    let dataValid = true;
    let emailValid = true;

    // validate script(s)
    if (script.length === 0 || script.length > 1) {
      setScriptError(true);
      scriptValid = false;
    }

    // validate data file(s)
    if (data.length === 0) {
      setDataError(true);
      dataValid = false;
    }

    // validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      emailValid = false;
    }
    // submit form if valid
    if (scriptValid && dataValid && emailValid) {
      onSubmit(script, email, data);
      setScript([]);
      setData([]);
      setEmail("");
    }
  };

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1
  } = useDropzone({ onDrop: handleScriptChange, accept: ".py" });
  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
    isDragActive: isDragActive2
  } = useDropzone({ onDrop: handleDataChange, accept: ".pickle, .pkl" });

  return (
    <div className="justify-center py-20 px-80">
      <div className="m-6">
        <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] py-0.5 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] p-6 text-purple-500"
            data-theme="mytheme"
          >
            <Card color="transparent" shadow={false}>
              <form onSubmit={handleFormSubmit}>
                <div className="p-8 space-y-6">
                  <Typography variant="h4" color="blue-gray">
                    Script Upload
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Please select one Python file to upload.
                  </Typography>
                  <div className="m-3">
                    <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
                      <div
                        className={`${
                          isDragActive1 ? "bg-blue-100" : ""
                        } flex flex-col items-center justify-center rounded-[15px] p-6 whitespace-wrap text-center`}
                        {...getRootProps1()}
                        data-theme="mytheme"
                      >
                        <input {...getInputProps1()} />
                        <img
                          src="https://img.icons8.com/?size=512&id=43469&format=png&color=1A6DFF,C822FF"
                          className="object-scale-down w-12 h-12"
                        />
                        <Typography color="gray" className="mt-4 font-normal">
                          Click to select a Python file or drag and drop here.
                        </Typography>
                      </div>
                    </div>
                  </div>
                  {scriptError && (
                    <Typography color="red" className="text-sm">
                      Please select one Python file.
                    </Typography>
                  )}
                  <div className="flex flex-col space-y-4">
                    {script.map((file, index) => (
                      <div className="flex items-center" key={index}>
                        <i className="ri-file-line text-gray-500 text-xl"></i>
                        <Typography color="gray" className="ml-2">
                          {file.name}
                        </Typography>
                        <Button
                          size="sm"
                          color="red"
                          buttonType="link"
                          rounded={true}
                          iconOnly={true}
                          ripple="dark"
                          className="ml-2"
                          onClick={() => handleRemoveScript(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <Typography variant="h4" color="blue-gray">
                    Data Upload
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Please select one or more Pickle or text files to upload.
                  </Typography>
                  <div className="m-3">
                    <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
                      <div
                        className={`${
                          isDragActive2 ? "bg-blue-100" : ""
                        } flex flex-col items-center justify-center rounded-[15px] p-6 whitespace-wrap text-center`}
                        {...getRootProps2()}
                        data-theme="mytheme"
                      >
                        <input {...getInputProps2()} />
                        <img
                          src="https://img.icons8.com/?size=512&id=43469&format=png&color=1A6DFF,C822FF"
                          className="object-scale-down w-12 h-12"
                        />
                        <Typography color="gray" className="mt-4 font-normal">
                          Click to select file(s) or drag and drop here. Use
                          Control/Command to select multiple files.
                        </Typography>
                      </div>
                    </div>
                  </div>
                  {dataError && (
                    <Typography color="red" className="text-sm">
                      Please select at least one Pickle or text file.
                    </Typography>
                  )}
                  <div className="flex flex-col space-y-4">
                    {data.map((file, index) => (
                      <div className="flex items-center" key={index}>
                        <i className="ri-file-line text-gray-500 text-xl"></i>
                        <Typography color="gray" className="ml-2">
                          {file.name}
                        </Typography>
                        <Button
                          size="sm"
                          color="red"
                          buttonType="link"
                          rounded={true}
                          iconOnly={true}
                          ripple="dark"
                          className="ml-2"
                          onClick={() => handleRemoveData(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Typography variant="h4" color="blue-gray">
                    Email Upload
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal py-2">
                    Please enter a valid email address for the results to be
                    sent.
                  </Typography>
                  <Input
                    size="lg"
                    label="Email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    error={emailError ? true : false}
                    helperText={emailError}
                  />
                  <Button
                    className="mt-6"
                    fullWidth
                    disabled={
                      !script.length ||
                      script.length > 1 ||
                      !data.length ||
                      emailError
                    }
                    type="submit"
                  >
                    Submit Job
                  </Button>
                </div>
                {isLoading && <Loading />}
                {!isLoading && hasError && (
                  <Error
                    errorMessage="Error! The poor API didn't like that. Try again in a little bit or
            with different inputs"
                  />
                )}
                {!isLoading && hasError2 && (
                  <div>
                    <Error errorMessage="Error! Your inputs produced an output that isn't valid JSON. Edit your script or data files and try again." />
                  </div>
                )}
                {!isLoading &&
                  !hasError &&
                  response &&
                  response.algocall_result &&
                  response.algocall_result.result && (
                    <Result data={response.algocall_result.result} />
                  )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
