terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
    region   = "us-east-2"
    profile  = "brad-sandbox-admin"
}

#########################################
#                                       #
#       Front End React Deployment      #
#                                       #
#########################################

# Configure S3 bucket as static website
resource "aws_s3_bucket" "frontend_bucket" {
    bucket = "brads-magnificent-todo-application"
    acl    = "public-read"

    website {
        index_document = "index.html"
        error_document = "index.html"
    }
}

# Bucket policy that allows public access for above bucket
resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id

    policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "${aws_s3_bucket.frontend_bucket.arn}/*"
            ]
        }
    ]
}
POLICY
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "frontend_endpoint_cloudfront" {
    depends_on = [
        aws_s3_bucket.frontend_bucket
    ]
    origin {
        domain_name = aws_s3_bucket.frontend_bucket.website_endpoint
        origin_id   = "S3todoFrontend"
        custom_origin_config {
            http_port              = "80"
            https_port             = "443"
            origin_protocol_policy = "http-only"
            origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
        }
    }
    enabled = true
    comment = "CloudFront distribution to react front end"
    default_root_object = "index.html"
    default_cache_behavior {
        allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "S3todoFrontend"
        viewer_protocol_policy = "redirect-to-https"
        forwarded_values {
            query_string = false

            cookies {
                forward = "none"
            }
        }
    }
    restrictions {
        geo_restriction {
            restriction_type = "whitelist"
            locations        = ["US", "CA", "GB", "DE"]
        }
    }
    viewer_certificate {
        cloudfront_default_certificate = true
    }
}

# Front end outputs
output "CloudFront_url" {
  value = aws_cloudfront_distribution.frontend_endpoint_cloudfront.domain_name
}


#########################################
#                                       #
#                VPCs                   #
#                                       #
#########################################

# VPC
resource "aws_vpc" "application_vpc" {
    cidr_block = "192.168.0.0/23"
    enable_dns_hostnames = true
    enable_dns_support = true
    tags = {
        Name = "brad_massengale_todo_application"
    }
}

# Public subnet
resource "aws_subnet" "public_subnet" {
    vpc_id            = aws_vpc.application_vpc.id
    cidr_block        = "192.168.0.0/24"
    availability_zone = "us-east-2a"
    tags = {
        Name = "brad_massengale_todo_public"
    }
}

# Private subnet
resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.application_vpc.id
  cidr_block        = "192.168.1.0/24"
  availability_zone = "us-east-2b"
  tags = {
    Name = "brad_massengale_todo_private"
  }
}

# Internet gateway
resource "aws_internet_gateway" "internetgw" {
  vpc_id = aws_vpc.application_vpc.id
  tags = {
    Name = "brad_massengale_todo_gw"
  }
}

# Route table
resource "aws_route_table" "primary_routes" {
  vpc_id = aws_vpc.application_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internetgw.id
  }
  tags = {
    Name = "brad_massengale_todo_route_table"
  }
}

resource "aws_route_table_association" "public_associate" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.primary_routes.id
}

resource "aws_route_table_association" "private_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.primary_routes.id
}

# Public security group
resource "aws_security_group" "allow_all_sg" {
  name        = "brad_massengale_todo_Public_SG"
  description = "Allow inbound traffic"
  vpc_id      = aws_vpc.application_vpc.id

  ingress {
    description = "All inbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# DB Subnet Group
resource "aws_db_subnet_group" "default_db_subnet_group" {
  name       = "brad-massengale-todo-db-subnet-group"
  subnet_ids = [aws_subnet.public_subnet.id,aws_subnet.private_subnet.id]
}

#########################################
#                                       #
#    Aurora - PostgreSQL Deployment     #
#                                       #
#########################################

# Aurora Instance
module "rds-aurora" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "2.29.0"

  name                            = "brad-massengale-todo-db"
  engine                          = "aurora-postgresql"
  engine_version                  = "11.8"
  vpc_id                          = aws_vpc.application_vpc.id
  subnets                         = [aws_subnet.private_subnet.id, aws_subnet.public_subnet.id]
  vpc_security_group_ids          = [aws_security_group.allow_all_sg.id]
  instance_type                   = "db.r4.large"
  storage_encrypted               = true
  apply_immediately               = true
  skip_final_snapshot             = true
  create_security_group           = false
  username = "postgres"
  password = "postgres"
  db_subnet_group_name = aws_db_subnet_group.default_db_subnet_group.name
  create_monitoring_role = false
  database_name = "fullstacktodo"
  publicly_accessible = true

}

# DB outputs
output "DB_Endpoint" {
  value = module.rds-aurora.this_rds_cluster_endpoint
}

output "DB_Name" {
  value = module.rds-aurora.this_rds_cluster_database_name
}

output "DB_Port" {
  value = module.rds-aurora.this_rds_cluster_port
}

output "DB_Username" {
   value = module.rds-aurora.this_rds_cluster_master_username
}

output "DB_Password" {
   value = module.rds-aurora.this_rds_cluster_master_password
}