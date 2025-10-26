terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.6.0"

  backend "s3" {
    bucket         = "amzn-primemoments-state-bucket"       # replace with your S3 bucket
    key            = "envs/dev/terraform.tfstate" # path inside the bucket
    region         = "us-east-2"                  # AWS region
    dynamodb_table = "tf-locks"     # optional, for locking
    encrypt        = true
  }
}

variable "region" {
  type    = string
  default = "us-east-2"
}

#resource "aws_s3_bucket" "tf_state" {
#  bucket        = "amzn-primemoments-state-bucket"
#  force_destroy = false
#}
#
#resource "aws_s3_bucket_versioning" "tf_state" {
#  bucket = aws_s3_bucket.tf_state.id
#  versioning_configuration { status = "Enabled" }
#}
##
#resource "aws_s3_bucket_server_side_encryption_configuration" "tf_state" {
#  bucket = aws_s3_bucket.tf_state.id
#  rule {
#    apply_server_side_encryption_by_default {
#      sse_algorithm = "AES256"
#    }
#  }
#}
##
#resource "aws_dynamodb_table" "tf_lock" {
#  name         = var.lock_table_name
#  billing_mode = "PAY_PER_REQUEST"
#  hash_key     = "LockID"
#  attribute {
#    name = "LockID"
#    type = "S"
#  }
#}
