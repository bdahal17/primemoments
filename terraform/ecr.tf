provider "aws" {
  region = "us-east-2"
}

resource "aws_ecr_repository" "app_repo" {
  name                 = var.ecr_repo_name
  force_delete         = true
  image_tag_mutability = "MUTABLE" # or "IMMUTABLE" for stricter control

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name        = var.ecr_repo_name
    Environment = var.environment
  }
}

variable "ecr_repo_name" {
  type    = string
  default = "primemoments-app-ecr"
}

resource "aws_ecr_lifecycle_policy" "cleanup" {
  repository = aws_ecr_repository.app_repo.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
