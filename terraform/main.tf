terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.6.0"

  backend "s3" {
    bucket         = "amzn-primemoments-state-bucket" # replace with your S3 bucket
    key            = "envs/dev/terraform.tfstate"     # path inside the bucket
    region         = "us-east-2"                      # AWS region
    dynamodb_table = "tf-locks"                       # optional, for locking
    encrypt        = true
  }
}
