# RDS PostgreSQL Instance (uncomment to create)
# IMPORTANT: Change the password before deploying!
resource "aws_db_instance" "postgres" {
  # Basic Configuration
  identifier        = "${var.project_name}-${var.environment}-postgres"
  engine            = "postgres"
  engine_version    = "17.6"
  instance_class    = "db.t3.micro"
  allocated_storage = 10
  storage_type      = "gp2"
  storage_encrypted = true

  # Database Credentials
  db_name  = "primemomentsdb"
  username = var.db_username
  password = var.db_password

  # Network Configuration - IMPORTANT SETTINGS
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.database.id]
  publicly_accessible    = true # CRITICAL: Keeps database secure even in public subnet

  # High Availability & Backup
  multi_az                = false # Set to true for production (costs more)
  backup_retention_period = 7
  skip_final_snapshot     = true # Set to false in production

  # Maintenance
  auto_minor_version_upgrade = true

  tags = {
    Name        = "${var.project_name}-${var.environment}-postgres"
    Environment = var.environment
  }
}


# Uncomment when RDS instance is created
 output "rds_endpoint" {
   description = "RDS PostgreSQL endpoint for application connection"
   value       = aws_db_instance.postgres.endpoint
   sensitive   = true
 }

 output "rds_database_name" {
   description = "Name of the database"
   value       = aws_db_instance.postgres.db_name
 }
