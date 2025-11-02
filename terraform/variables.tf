variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "primemoments"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "development"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-2"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-east-2a", "us-east-2c"]
}
variable "instance_type" {
  default = "t2.small"
}

variable "solution_stack" {
  default = "64bit Amazon Linux 2 v3.7.10 running Corretto 21"
}

variable "db_username" {
  description = "Username for the RDS PostgreSQL instance"
  type        = string
}

variable "db_password" {
  description = "Password for the RDS PostgreSQL instance"
  type        = string
  sensitive   = true
}
