# fullstack-proj1

### Requirements
1. Node js && npm
1. amplify cli ```npm install -g @aws-amplify/cli```

### Set up a default aws profile
1. ```amplify configure```
1. This will open your web browser. Continue with the defaults, with the AdministratorAccess policy. Once you've created it, save the access key and the secret.
1. Go back to the console and enter the access key and the secret key you just obtained.

### Set up development
1. ```git clone https://github.com/esoh/fullstack-proj1```
1. cd into ```fullstack-proj1/employeeApp```
1. ```npm i``` to install dependencies
1. ```amplify init``` to initialize amplify project (make sure you are in ```fullstack-proj1/employeeApp```)
1. Choose `dev` for the environment name
1. Use the aws profile that you created
1. ```cd ./amplify/backend/function/skillfunction/src/``` and ```npm i``` to build packages for skill lambda function
1. ```cd ../../employeefunction/src/``` and ```npm i``` for employee lambda function
1. cd into the ```employeeApp``` directory and ```amplify push``` to push code to aws (Note: this will take a while)
1. Choose to generate code, choose javascript, choose defaults
1. ```npm start``` to run locally

### Deleting everything
1. cd into ```fullstack-proj1/employeeApp```
1. ```amplify delete```
1. remove ```fullstack-proj1```