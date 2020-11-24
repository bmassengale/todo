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
#    Aurora - PostgreSQL Deployment     #
#                                       #
#########################################