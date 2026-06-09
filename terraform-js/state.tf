terraform {
  backend "s3" {
    bucket       = "16-my-terraform-state"
    key          = "portfolio/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}