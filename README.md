Next.js Portfolio — AWS Infrastructure as Code
A production-style static site deployment. Next.js exported to S3, served globally through CloudFront, every AWS resource defined in Terraform.
🌐 Live: https://d10ohi5marhqs6.cloudfront.net

Architecture
#mermaid-r2r2-r8{font-family:"Anthropic Sans",system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-size:16px;fill:#E5E5E5;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-r2r2-r8 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-r2r2-r8 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-r2r2-r8 .error-icon{fill:#CC785C;}#mermaid-r2r2-r8 .error-text{fill:#3387a3;stroke:#3387a3;}#mermaid-r2r2-r8 .edge-thickness-normal{stroke-width:1px;}#mermaid-r2r2-r8 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-r2r2-r8 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-r2r2-r8 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-r2r2-r8 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-r2r2-r8 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-r2r2-r8 .marker{fill:#A1A1A1;stroke:#A1A1A1;}#mermaid-r2r2-r8 .marker.cross{stroke:#A1A1A1;}#mermaid-r2r2-r8 svg{font-family:"Anthropic Sans",system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-size:16px;}#mermaid-r2r2-r8 p{margin:0;}#mermaid-r2r2-r8 .label{font-family:"Anthropic Sans",system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#E5E5E5;}#mermaid-r2r2-r8 .cluster-label text{fill:#3387a3;}#mermaid-r2r2-r8 .cluster-label span{color:#3387a3;}#mermaid-r2r2-r8 .cluster-label span p{background-color:transparent;}#mermaid-r2r2-r8 .label text,#mermaid-r2r2-r8 span{fill:#E5E5E5;color:#E5E5E5;}#mermaid-r2r2-r8 .node rect,#mermaid-r2r2-r8 .node circle,#mermaid-r2r2-r8 .node ellipse,#mermaid-r2r2-r8 .node polygon,#mermaid-r2r2-r8 .node path{fill:transparent;stroke:#A1A1A1;stroke-width:1px;}#mermaid-r2r2-r8 .rough-node .label text,#mermaid-r2r2-r8 .node .label text,#mermaid-r2r2-r8 .image-shape .label,#mermaid-r2r2-r8 .icon-shape .label{text-anchor:middle;}#mermaid-r2r2-r8 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-r2r2-r8 .rough-node .label,#mermaid-r2r2-r8 .node .label,#mermaid-r2r2-r8 .image-shape .label,#mermaid-r2r2-r8 .icon-shape .label{text-align:center;}#mermaid-r2r2-r8 .node.clickable{cursor:pointer;}#mermaid-r2r2-r8 .root .anchor path{fill:#A1A1A1!important;stroke-width:0;stroke:#A1A1A1;}#mermaid-r2r2-r8 .arrowheadPath{fill:#0b0b0b;}#mermaid-r2r2-r8 .edgePath .path{stroke:#A1A1A1;stroke-width:1px;}#mermaid-r2r2-r8 .flowchart-link{stroke:#A1A1A1;fill:none;}#mermaid-r2r2-r8 .edgeLabel{background-color:transparent;text-align:center;}#mermaid-r2r2-r8 .edgeLabel p{background-color:transparent;}#mermaid-r2r2-r8 .edgeLabel rect{opacity:0.5;background-color:transparent;fill:transparent;}#mermaid-r2r2-r8 .labelBkg{background-color:rgba(0, 0, 0, 0.5);}#mermaid-r2r2-r8 .cluster rect{fill:#CC785C;stroke:hsl(15, 12.3364485981%, 48.0392156863%);stroke-width:1px;}#mermaid-r2r2-r8 .cluster text{fill:#3387a3;}#mermaid-r2r2-r8 .cluster span{color:#3387a3;}#mermaid-r2r2-r8 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"Anthropic Sans",system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-size:12px;background:#CC785C;border:1px solid hsl(15, 12.3364485981%, 48.0392156863%);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-r2r2-r8 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#E5E5E5;}#mermaid-r2r2-r8 rect.text{fill:none;stroke-width:0;}#mermaid-r2r2-r8 .icon-shape,#mermaid-r2r2-r8 .image-shape{background-color:transparent;text-align:center;}#mermaid-r2r2-r8 .icon-shape p,#mermaid-r2r2-r8 .image-shape p{background-color:transparent;padding:2px;}#mermaid-r2r2-r8 .icon-shape .label rect,#mermaid-r2r2-r8 .image-shape .label rect{opacity:0.5;background-color:transparent;fill:transparent;}#mermaid-r2r2-r8 .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#mermaid-r2r2-r8 .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#mermaid-r2r2-r8 .node .neo-node{stroke:#A1A1A1;}#mermaid-r2r2-r8 [data-look="neo"].node rect,#mermaid-r2r2-r8 [data-look="neo"].cluster rect,#mermaid-r2r2-r8 [data-look="neo"].node polygon{stroke:url(#mermaid-r2r2-r8-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r2r2-r8 [data-look="neo"].node path{stroke:url(#mermaid-r2r2-r8-gradient);stroke-width:1px;}#mermaid-r2r2-r8 [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r2r2-r8 [data-look="neo"].node .neo-line path{stroke:#A1A1A1;filter:none;}#mermaid-r2r2-r8 [data-look="neo"].node circle{stroke:url(#mermaid-r2r2-r8-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r2r2-r8 [data-look="neo"].node circle .state-start{fill:#000000;}#mermaid-r2r2-r8 [data-look="neo"].icon-shape .icon{fill:url(#mermaid-r2r2-r8-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r2r2-r8 [data-look="neo"].icon-shape .icon-neo path{stroke:url(#mermaid-r2r2-r8-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#mermaid-r2r2-r8 :root{--mermaid-font-family:"Anthropic Sans",system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}Origin Access IdentityUserCloudFront CDN400+ Edge LocationsS3 BucketStatic File HostNext.js Static Exportnpm run build

Stack
LayerTechnologyFrameworkNext.js 16 — static exportInfrastructureTerraformHostingAWS S3CDNAWS CloudFrontRemote StateS3 + native locking

Infrastructure
All resources in terraform-js/main.tf:

aws_s3_bucket — static file hosting
aws_s3_bucket_policy — public read access
aws_s3_bucket_public_access_block — configured for static hosting
aws_s3_bucket_ownership_controls — bucket owner controls all objects
aws_s3_bucket_acl — public-read
aws_cloudfront_origin_access_identity — private CloudFront → S3 access
aws_cloudfront_distribution — HTTPS, IPv6, global CDN


Deploy
Prerequisites: AWS CLI · Terraform >= 1.10 · Node.js >= 18
bash# Provision infrastructure
cd terraform-js
terraform init && terraform apply

# Build and upload
cd ../nextjs-blog && npm install && npm run build
cd .. && aws s3 sync ./nextjs-blog/out s3://16-nextjs-terraform-bucket

# Get live URL
cd terraform-js && terraform output cloudfront_url
Invalidate cache on updates:
bashaws cloudfront create-invalidation --distribution-id EN5KM20QD7UJZ --paths "/*"
Teardown:
bashcd terraform-js && terraform destroy

State
hclterraform {
  backend "s3" {
    bucket       = "16-my-terraform-state"
    key          = "portfolio/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true  # Terraform 1.10+ — no DynamoDB needed
  }
}

Why
S3 + CloudFront over Vercel — full infrastructure ownership, no vendor lock-in, version-controlled as code.
use_lockfile over DynamoDB — one service instead of two, simpler, cheaper, no key schema to manage.
Static export over SSR — no server requirements, cached at the edge, zero compute costs.

Progression
✅ CloudFormation  —  VPC · EC2 · ASG · RDS · IAM
✅ Terraform Portfolio  —  this repo
⬜ Terraform VPC  —  CloudFormation architecture rebuilt in Terraform
⬜ TriageHQ on AWS  —  AI support platform · RAG · Bedrock · ECS · RDS
→ CloudFormation repo

Yahye Mohamed — AI Cloud Engineer ·