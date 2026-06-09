Next.js Portfolio — AWS Infrastructure as Code

A production-style static site deployment: Next.js exported to S3, served globally through CloudFront, with every AWS resource defined, versioned, and reproducible in Terraform.

🌐 Live: https://d10ohi5marhqs6.cloudfront.net

What This Is
Most portfolio sites are deployed by dragging files into a UI or clicking "Deploy" on Vercel.
This one is different.
Every AWS resource — the S3 bucket, the bucket policy, the Origin Access Identity, the CloudFront distribution — is declared as Terraform code. The entire infrastructure can be destroyed and rebuilt from scratch with two commands. The state is stored remotely in S3 with native locking. Nothing was clicked into existence.
That's the point.

Architecture
┌─────────────────────────────────────┐
│         AWS CloudFront CDN          │
│   400+ Edge Locations Worldwide     │
│   HTTPS · IPv6 · 24hr Cache TTL     │
└──────────────────┬──────────────────┘
                   │  Origin Access Identity
                   │  (private S3 access)
┌──────────────────▼──────────────────┐
│           AWS S3 Bucket             │
│      Static File Hosting            │
│   HTML · CSS · JS · Assets          │
└──────────────────┬──────────────────┘
                   │
┌──────────────────▼──────────────────┐
│       Next.js Static Export         │
│     npm run build → /out            │
└─────────────────────────────────────┘

Infrastructure Resources
All defined in terraform-js/main.tf:
ResourcePurposeaws_s3_bucketHosts the static Next.js buildaws_s3_bucket_ownership_controlsEnsures bucket owner controls all objectsaws_s3_bucket_public_access_blockConfigured to allow public static hostingaws_s3_bucket_aclSets public-read accessaws_s3_bucket_policyIAM policy allowing s3:GetObject to *aws_cloudfront_origin_access_identitySecure identity for CloudFront → S3 accessaws_cloudfront_distributionGlobal CDN with HTTPS, caching, geo-unrestricted

State Management
Remote state stored in S3 — no local state files, no lost state, no corruption risk.
hclterraform {
  backend "s3" {
    bucket       = "16-my-terraform-state"
    key          = "portfolio/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
Uses Terraform 1.10+ native S3 locking — no DynamoDB table needed.

Project Structure
terraform-portfolio-project/
├── nextjs-blog/
│   ├── pages/
│   │   └── index.js          # Portfolio page
│   ├── styles/
│   │   └── Home.module.css   # Dark gradient design system
│   ├── public/
│   └── next.config.js        # output: 'export' for static generation
│
└── terraform-js/
    ├── main.tf                # All AWS resources
    ├── state.tf               # Remote backend config
    └── outputs.tf             # CloudFront URL + bucket name

Deploy From Scratch
Prerequisites: AWS CLI · Terraform >= 1.10 · Node.js >= 18
bash# 1. Clone the repo
git clone https://github.com/yahyemohamedgt/terraform-portfolio-project.git
cd terraform-portfolio-project

# 2. Provision infrastructure
cd terraform-js
terraform init
terraform plan
terraform apply

# 3. Build the Next.js app
cd ../nextjs-blog
npm install && npm run build

# 4. Upload to S3
cd ..
aws s3 sync ./nextjs-blog/out s3://16-nextjs-terraform-bucket

# 5. Get the live URL
cd terraform-js && terraform output cloudfront_url
On updates — invalidate the CloudFront cache:
bashaws cloudfront create-invalidation --distribution-id EN5KM20QD7UJZ --paths "/*"

Teardown
bashcd terraform-js && terraform destroy
Every resource created. Every resource gone. Zero orphaned infrastructure.

Design Decisions
S3 + CloudFront over Vercel — Full infrastructure ownership, version-controlled as code, no vendor lock-in. Same global performance at a fraction of the cost for static sites.
use_lockfile over DynamoDB — Terraform 1.10 introduced native S3 locking. One service instead of two, no table schema to manage, no LockID key mismatches.
Static export over SSR — No server-side requirements. Pure HTML/CSS/JS, cached aggressively at the edge, zero compute costs, zero cold starts.
OAI for S3 access — CloudFront accesses S3 through a private Origin Access Identity. S3 is never exposed directly to the public internet.

Part of a Larger Build
✅ CloudFormation  →  VPC · EC2 · ASG · RDS · IAM
✅ Terraform Portfolio  →  this repo
⬜ Terraform VPC Rebuild  →  same architecture, rewritten in Terraform
⬜ TriageHQ on AWS  →  multi-tenant AI platform · RAG · Bedrock · ECS · RDS
The goal: a single terraform apply that deploys an entire AI product.
→ CloudFormation repo

Yahye Mohamed — AI Cloud Engineer 