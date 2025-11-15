#!/bin/bash

# Function to check Elastic Beanstalk environment status
check_eb_environment_status() {
    # Get the current environment status
    ENV_STATUS=$(aws elasticbeanstalk describe-environments \
        --application-name "$APP_NAME" \
        --environment-names "$ENV_NAME" \
        --query "Environments[0].Status" \
        --output text)

    # Get the current environment health
    ENV_HEALTH=$(aws elasticbeanstalk describe-environments \
        --application-name "$APP_NAME" \
        --environment-names "$ENV_NAME" \
        --query "Environments[0].Health" \
        --output text)

    echo "Current Environment Status: $ENV_STATUS"
    echo "Current Environment Health: $ENV_HEALTH"

    # Check for invalid states
    if [[ "$ENV_STATUS" == "Terminated" ]] ||
       [[ "$ENV_STATUS" == "Terminating" ]] ||
       [[ "$ENV_HEALTH" == "Red" ]]; then
        return 1
    fi

    return 0
}

# Function to cleanup and recreate Elastic Beanstalk environment
cleanup_and_recreate_environment() {
    echo "Cleaning up invalid Elastic Beanstalk environment..."

    # Terminate the existing environment
    aws elasticbeanstalk terminate-environment \
        --environment-name "$ENV_NAME" \
        --region "$AWS_REGION"

    # Wait for environment to be fully terminated
    aws elasticbeanstalk wait environment-terminated \
        --application-name "$APP_NAME" \
        --environment-name "$ENV_NAME" \
        --region "$AWS_REGION"

    # Optional: Create a new environment if needed
    # You might want to customize this based on your specific requirements
    aws elasticbeanstalk create-environment \
        --application-name "$APP_NAME" \
        --environment-name "$ENV_NAME" \
        --solution-stack-name "64bit Amazon Linux 2 v3.5.4 running Docker" \
        --region "$AWS_REGION"
}

# Main deployment script
main() {
    # Check environment status
    if ! check_eb_environment_status; then
        echo "Environment is in an invalid state. Attempting cleanup..."
        cleanup_and_recreate_environment
    fi

    # Proceed with deployment (your existing deployment script)
    echo '{
      "AWSEBDockerrunVersion": "1",
      "Image": {
        "Name": "'"$IMAGE_URI"'",
        "Update": "true"
      },
      "Ports": [
        {
          "ContainerPort": "8080"
        }
      ]
    }' > Dockerrun.aws.json

    aws s3 cp Dockerrun.aws.json s3://$EB_S3_BUCKET/Dockerrun.aws.json

    VERSION_LABEL="v-${GITHUB_SHA}"
    aws elasticbeanstalk create-application-version \
    --application-name $APP_NAME \
    --version-label $VERSION_LABEL \
    --source-bundle S3Bucket=$EB_S3_BUCKET,S3Key=Dockerrun.aws.json

    aws elasticbeanstalk update-environment \
    --application-name $APP_NAME \
    --environment-name $ENV_NAME \
    --version-label $VERSION_LABEL \
    --option-settings \
      "Namespace=aws:elasticbeanstalk:application:environment,OptionName=DB_SECRET_ARN,Value=$DB_SECRET_ARN" \
      "Namespace=aws:elasticbeanstalk:application:environment,OptionName=JWT_SECRET_ARN,Value=$SECRET_ARN" \
      "Namespace=aws:elasticbeanstalk:application:environment,OptionName=AWS_REGION,Value=$AWS_REGION" \
      "Namespace=aws:elasticbeanstalk:application:environment,OptionName=SPRING_PROFILES_ACTIVE,Value=$ENV_NAME" \
    --region $AWS_REGION
}

# Run the main function
main
