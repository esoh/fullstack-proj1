# fullstack-proj1

## Deploying backend:
1. Install serverless if not already installed: ```npm install -g serverless```
1. Grab access security keys from AWS with appropriate access keys (Easiest to do with AWS Account Credentials but unsafe. Can be done with an IAM User with the right permissions.)
1. Create a AWS IAM role with CloudFormation as the trusted entity to be used for deployment and attach the following policies:
    ```
    AWSLambdaFullAccess
    AmazonAPIGatewayAdministrator
    IAMReadOnlyAccess
    ```
    Also create an inline policy to give the role permissions to perform actions on AWS CloudFormation. E.g:
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "<Id here>",
                "Effect": "Allow",
                "Action": [
                    "cloudformation:Describe*",
                    "cloudformation:List*",
                    "cloudformation:Get*",
                    "cloudformation:ValidateTemplate",
                    "cloudformation:CreateStack",
                    "cloudformation:UpdateStack",
                    "cloudformation:DeleteStack"
                ],
                "Resource": [
                    "*"
                ]
            }
        ]
    }
    ```

    If you're using the credentials of an IAM User ensure that the user also has the permissions of these policies.

    NOTE: These policies can be narrowed down further, but for the purpose of this application and because it's a solo developer, policies need not be as refined.

1. Create and edit the amazon resource name (arn) file to include the cloudformation role used for deployment located at `fullstack-proj1/backend/config/awsArns.yml`, defining the property `cfnDeployRole`.

    The file should look something like this:

    ```
    cfnDeployRole: arn:aws:iam::XXX:role/<YourDeployRole>
    ```

1. Add keys to your shared aws credentials file: 

    ```serverless config credentials --provider aws --key \<Your access key id\> --secret \<Your secret access key\>```

    For more information about shared aws credentials checkout out the [Amazon Docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html).
1. If it's your first time running serverless, run ```serverless deploy``` in the ```fullstack-proj1/backend/``` directory.
1. Run ```serverless login``` with a compatible browser. (May not work with Safari)
1. Update ```tenant``` and ```app``` properties in ```fullstack-proj1/backend/serverless.yml``` to match those of your serverless tenant name and app.
1. Rerun ```serverless deploy``` to deploy.