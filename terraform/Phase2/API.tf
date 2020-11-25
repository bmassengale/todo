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
#       Lambda API Deployment           #
#                                       #
#########################################

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "lambda" {
    s3_bucket = "brads-magnificent-backend-api"
    s3_key = "Production.zip"
  function_name = "brad_massengale_todo_lambda"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "TodoApi.Api::TodoApi.Api.LambdaEntryPoint::FunctionHandlerAsync"
  runtime       = "dotnetcore3.1"
  timeout       = 25
  memory_size   = 512
}

#########################################
#                                       #
#              API Gateway              #
#                                       #
#########################################

resource "aws_api_gateway_rest_api" "API_GW" {
  name = "brad-massengale-todo-api-gateway"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "GW_PROXY" {
  rest_api_id = aws_api_gateway_rest_api.API_GW.id
  parent_id   = aws_api_gateway_rest_api.API_GW.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "HTTP_METHOD" {
  rest_api_id   = aws_api_gateway_rest_api.API_GW.id
  resource_id   = aws_api_gateway_resource.GW_PROXY.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = aws_api_gateway_rest_api.API_GW.id
  resource_id             = aws_api_gateway_resource.GW_PROXY.id
  http_method             = aws_api_gateway_method.HTTP_METHOD.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "prod_deployment" {
  depends_on  = [aws_api_gateway_integration.integration, ]
  rest_api_id = aws_api_gateway_rest_api.API_GW.id
  stage_name  = "prod"
}

resource "aws_lambda_permission" "apigw_permissions" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.lambda.function_name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${aws_api_gateway_rest_api.API_GW.execution_arn}/*/*"
}

# API Gateway and Lambda Outputs
output "API_URL" {
   value = aws_api_gateway_deployment.prod_deployment.invoke_url
}