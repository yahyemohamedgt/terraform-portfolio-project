Terraform-portfolio-project

Next.js static site deployed on AWS using Terraform. S3 for hosting, CloudFront for global delivery.

Live: https://d10ohi5marhqs6.cloudfront.net

Stack

-Next.js 16 (static export)
-AWS S3 + CloudFront
-Terraform with S3 remote state
-State locking via use_lockfile (Terraform 1.10+, no DynamoDB)

Structure
nextjs-blog/        # Next.js app
terraform-js/       # Terraform config
  main.tf           # S3 + CloudFront resources
  state.tf          # Remote backend
  outputs.tf        # CloudFront URL

Deploy

bashcd terraform-js
terraform init && terraform apply

cd ../nextjs-blog
npm install && npm run build

cd ..
aws s3 sync ./nextjs-blog/out s3://16-nextjs-terraform-bucket
aws cloudfront create-invalidation --distribution-id EN5KM20QD7UJZ --paths "/*"

Destroy

bashcd terraform-js && terraform destroy

Part of a series
CloudFormation (VPC, EC2, ASG, RDS, IAM) → Terraform Portfolio (this) → Terraform VPC rebuild → TriageHQ on AWS (AI support platform, Bedrock, ECS, RDS)
https://github.com/yahyemohamedgt/cloudformation