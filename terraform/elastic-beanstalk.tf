resource "aws_elastic_beanstalk_application" "primemoments-app" {
  name        = var.app_name
  description = "Elastic Beanstalk Application for PrimeMoments"
}

resource "aws_elastic_beanstalk_environment" "dev" {
  name                = var.env_name
  application         = aws_elastic_beanstalk_application.primemoments-app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.7.10 running Docker"

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = var.instance_type
  }
}


variable "app_name" {
  type    = string
  default = "primemoments-app"
}

variable "env_name" {
  type    = string
  default = "dev"
}

variable "instance_type" {
  default     = "t2.small"
}

variable "solution_stack" {
  default     = "64bit Amazon Linux 2 v3.7.10 running Corretto 21"
}

#resource "aws_elastic_beanstalk_application_version" "app_version" {
#  name        = "${var.app_name}-v1"
#  application = aws_elastic_beanstalk_application.app.name
#
#  # Instead of S3 zip, use a local JSON file
#  # We'll create it with the ECR image URI
#  description = "App version using ECR image"
#  bucket      = aws_s3_bucket.eb_app_versions.bucket
#  key         = "Dockerrun.aws.json"
#
#  # Optional: enable to replace automatically
#  lifecycle {
#    ignore_changes = [description]
#  }
#}

#primemoments-app-ebs3bucket

resource "aws_s3_bucket" "tf_state" {
  bucket        = "primemoments-app-ebs3bucket"
  force_destroy = false
}
