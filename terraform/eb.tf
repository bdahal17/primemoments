resource "aws_elastic_beanstalk_application" "primemoments-app" {
  name        = var.project_name
  description = "Elastic Beanstalk Application for PrimeMoments"
}

resource "aws_elastic_beanstalk_environment" "dev" {
  name        = var.environment
  application = aws_elastic_beanstalk_application.primemoments-app.name

  # Must match an available solution stack in your region
  solution_stack_name = "64bit Amazon Linux 2023 v4.7.2 running Docker"
  # CloudWatch Logs Streaming Configuration
  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = "true"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "DeleteOnTerminate"
    value     = "false"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "RetentionInDays"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t3.nano" # smallest instance type
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.eb_instance_profile.name
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = aws_security_group.web.id
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.main.id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", aws_subnet.public.*.id)
  }

  depends_on = [aws_iam_instance_profile.eb_instance_profile]
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

resource "aws_s3_bucket" "ebs3bucket-versions" {
  bucket        = "primemoments-app-ebs3bucket"
  force_destroy = true
}
