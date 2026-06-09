Next.js Portfolio — AWS Infrastructure as Code

A production-style static site. Next.js exported to S3, served through CloudFront, every AWS resource defined in Terraform.
Live: https://d10ohi5marhqs6.cloudfront.net

What This Is
Most portfolio sites are deployed by clicking "Deploy" on Vercel. This one is different.
Every AWS resource is declared as Terraform code. The entire infrastructure can be destroyed and rebuilt from scratch with two commands. Nothing was clicked into existence.

Stack

Framework: Next.js 16 (static export)
Infrastructure: Terraform
Hosting: AWS S3
CDN: AWS CloudFront
State: S3 remote backend with native locking


Infrastructure
All resources defined in terraform-js/main.tf:

S3 bucket — static file hosting
S3 bucket policy — public read access
S3 public access block — configured for static hosting
CloudFront Origin Access Identity — private CloudFront to S3 access
CloudFront distribution — HTTPS, IPv6, 400+ edge locations


Deploy
Prerequisites: AWS CLI, Terraform >= 1.10, Node.js >= 18
bash# 1. Provision infrastructure
cd terraform-js
terraform init && terraform apply

# 2. Build the app
cd ../nextjs-blog
npm install && npm run build

# 3. Upload to S3
cd ..
aws s3 sync ./nextjs-blog/out s3://16-nextjs-terraform-bucket

# 4. Get the live URL
cd terraform-js && terraform output cloudfront_url
Invalidate CloudFront cache on updates:
bashaws cloudfront create-invalidation --distribution-id EN5KM20QD7UJZ --paths "/*"
Teardown:
bashcd terraform-js && terraform destroy

State Config
hclterraform {
  backend "s3" {
    bucket       = "16-my-terraform-state"
    key          = "portfolio/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
Uses Terraform 1.10+ native S3 locking. No DynamoDB table needed.

Progression

CloudFormation — VPC, EC2, ASG, RDS, IAM
Terraform Portfolio — this repo
Terraform VPC — same architecture rebuilt in Terraform
TriageHQ on AWS — AI support platform, RAG, Bedrock, ECS, RDS


Yahye Mohamed — AI Cloud Engineer
https://github.com/yahyemohamedgt/cloudformation