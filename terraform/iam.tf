resource "aws_iam_instance_profile" "eb_instance_profile" {
  name = "primemoments-eb-instance-profile"
  role = aws_iam_role.eb_instance_role.name
}


resource "aws_iam_role" "eb_instance_role" {
  name = "primemoments-eb-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eb_managed_policy" {
  role       = aws_iam_role.eb_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_role_policy_attachment" "eb_managed_policy_worker" {
  role       = aws_iam_role.eb_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier"
}

resource "aws_iam_role_policy_attachment" "eb_ecr_access" {
  role       = aws_iam_role.eb_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

data "aws_secretsmanager_secret" "jwt_secret" {
  name = "jwt-secret" # Replace with your actual secret name
}

#arn:aws:secretsmanager:us-east-2:553499405141:secret:primemoments-db-credentials-CQ2lUE

data "aws_secretsmanager_secret" "db_credentials" {
  name = "primemoments-db-credentials" # Replace with your actual secret name
}

resource "aws_iam_role_policy" "allow_secret_read" {
  name = "allow-read-jwt-secret"
  role = aws_iam_role.eb_instance_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ]
        Resource = [
          data.aws_secretsmanager_secret.jwt_secret.arn,
          data.aws_secretsmanager_secret.db_credentials.arn
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "allow_logs_read" {
  name = "allow-read-logs"
  role = aws_iam_role.eb_instance_role.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ],
        "Resource": "*"
      }
    ]
  })
}
