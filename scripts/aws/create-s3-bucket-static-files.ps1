aws s3api create-bucket --bucket homemenuplanner-frontend --region us-east-1
aws s3api put-bucket-encryption --bucket homemenuplanner-frontend --server-side-encryption-configuration file://encryption-config.json
aws s3api put-bucket-policy --bucket homemenuplanner-frontend --policy file://bucket-policy.json
aws s3api put-public-access-block --bucket homemenuplanner-frontend --public-access-block-configuration file://public-access-block-config.json




