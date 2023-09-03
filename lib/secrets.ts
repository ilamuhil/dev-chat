const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

let secrets: string | null = null

async function getSecret() {
  const secret_name = process.env.AWS_SECRET_NAME
  if (!secret_name) {
    console.log('Could not find AWS Secret Name from env file')
    return undefined
  }
  const client = new SecretsManagerClient({
    region: process.env.AWS_SECRETS_MANAGER_REGION,
  })

  let response

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      })
    )
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    console.log('Could not fetch secret from the AWS_SECRETS_MANAGER:', error)
    throw error
  }

  return response.SecretString
}
