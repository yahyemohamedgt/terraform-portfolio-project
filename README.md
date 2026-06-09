Next.js Portfolio — AWS Infrastructure as Code

A production-style static site deployment: Next.js exported to S3, served globally through CloudFront, with every AWS resource defined, versioned, and reproducible in Terraform.

🌐 Live: d10ohi5marhqs6.cloudfront.net

What This Is
Most portfolio sites are deployed by dragging files into a UI or clicking "Deploy" on Vercel.
This one is different.
Every AWS resource — the S3 bucket, the bucket policy, the Origin Access Identity, the CloudFront distribution — is declared as Terraform code. The entire infrastructure can be destroyed and rebuilt from scratch with two commands. The state is stored remotely in S3 with native locking. Nothing was clicked into existence.
That's the point.

Architecture
                        ┌─────────────────────────────────────┐
                        │         AWS CloudFront CDN           │
                        │    400+ Edge Locations Worldwide     │
                        │    HTTPS · IPv6 · 24hr Cache TTL     │
                        └──────────────────┬──────────────────┘
                                           │ Origin Access Identity
                                           │ (private S3 access)
                        ┌──────────────────▼──────────────────┐
                        │            AWS S3 Bucket             │
                        │       Static File Hosting            │
                        │   HTML · CSS · JS · Assets           │
                        └──────────────────┬──────────────────┘
                                           │
                        ┌──────────────────▼──────────────────┐
                        │         Next.js Static Export        │
                        │      npm run build → /out            │
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
    use_lockfile = true    # Terraform 1.10+ native locking — no DynamoDB needed
  }
}
State locking uses Terraform's native S3 locking (use_lockfile) introduced in 1.10 — replacing the older DynamoDB approach with a simpler, cheaper single-service solution.

Project Structure
terraform-portfolio-project/
│
├── nextjs-blog/                  # Next.js application
│   ├── pages/
│   │   └── index.js              # Portfolio page
│   ├── styles/
│   │   └── Home.module.css       # Dark gradient design system
│   ├── public/
│   └── next.config.js            # output: 'export' for static generation
│
└── terraform-js/                 # Infrastructure as Code
    ├── main.tf                   # All AWS resources
    ├── state.tf                  # Remote backend configuration
    └── outputs.tf                # CloudFront URL + bucket name

Deploy From Scratch
Prerequisites

AWS CLI configured with appropriate IAM permissions
Terraform >= 1.10
Node.js >= 18

1. Clone and provision infrastructure
bashgit clone https://github.com/yahyemohamedgt/terraform-portfolio-project.git
cd terraform-portfolio-project/terraform-js

terraform init
terraform plan
terraform apply
2. Build the Next.js app
bashcd ../nextjs-blog
npm install
npm run build
3. Deploy to S3
bashcd ..
aws s3 sync ./nextjs-blog/out s3://16-nextjs-terraform-bucket
4. Get the live URL
bashcd terraform-js && terraform output cloudfront_url
5. Push updates (invalidate CloudFront cache)
bashaws cloudfront create-invalidation --distribution-id EN5KM20QD7UJZ --paths "/*"

Teardown
bashcd terraform-js
terraform destroy
Every resource created. Every resource gone. Zero orphaned infrastructure.

Design Decisions
S3 + CloudFront over Vercel
Full infrastructure ownership, lower cost at scale, and everything version-controlled as code. CloudFront's 400+ edge locations match Vercel's performance for static sites — without vendor lock-in.
use_lockfile over DynamoDB
Terraform 1.10 introduced native S3 locking. One service instead of two, no table schema to manage, no LockID key mismatches. Simpler and cheaper.
Static export over SSR
A portfolio site has no server-side requirements. Static export produces pure HTML/CSS/JS — cacheable at the edge indefinitely, zero compute costs, zero cold starts.
OAI for S3 access
The S3 bucket is accessed through a CloudFront Origin Access Identity rather than a public endpoint. CloudFront handles all public traffic; S3 remains private.

Part of a Larger Build
This project sits in the middle of a deliberate infrastructure progression:
CloudFormation (VPC · EC2 · ASG · RDS · IAM)
        ↓
Terraform Portfolio (this repo)
        ↓
Terraform VPC Rebuild (same CF architecture, rewritten in Terraform)
        ↓
TriageHQ on AWS (multi-tenant AI support platform · RAG · Bedrock · ECS · RDS)
Each project builds on the last. The goal is a single terraform apply that deploys an entire AI product.
→ CloudFormation repo

Author
Yahye Mohamed — AI Cloud Engineer
Building AI infrastructure at the intersection of operational reliability and cloud systems.
