# Contact-form Lambda

Source for the `portfolio-contact-form-handler` function that the site's contact form invokes. It verifies the reCAPTCHA token and sends the message by email through Amazon SES.

**Status:** Live (verified 2026-09-27). `index.js` is byte-for-byte the code deployed on the function.
**Managed by:** AWS CLI (`deploy.sh`), not CDK. See Known limitations.

## How it is invoked

The Next.js server action in `utils/actions.ts` calls `lambda:InvokeFunction` directly with the form fields as the payload:

```json
{ "name": "…", "email": "…", "message": "…", "recaptchaToken": "…" }
```

There is no API Gateway. Amplify's SSR compute runs under the `portfolio-amplify-compute-role`, whose only permission is to invoke this function.

## Deployed configuration

| Setting | Value |
|---|---|
| Runtime | `nodejs18.x`, x86_64 |
| Handler | `index.handler` |
| Timeout / memory | 10 s / 256 MB |
| Execution role | `portfolio-lambda-execution-role` (`AmazonSESFullAccess`, `AWSLambdaBasicExecutionRole`) |
| Environment variables | `AWS_SES_EMAIL_FROM`, `AWS_SES_EMAIL_TO`, `RECAPTCHA_SECRET_KEY` (values set in AWS, not in this repo) |
| Last code update | 2025-03-01 |

## Files

| File | Purpose |
|---|---|
| `index.js` | The handler. ES module; depends only on `@aws-sdk/client-ses`. |
| `package.json`, `package-lock.json` | Dependency manifest for the deployment package. |
| `deploy.sh` | The script that first created the role and function on 2025-03-01. Kept as a record; see the header before running it. |
| `trust-policy.json` | Trust policy used by `deploy.sh` for the execution role. |
| `test-event.json`, `test-lambda.sh` | Invoke the live function from the CLI with a sample payload and print the latest log stream. Sends a real email. |
| `view-logs.sh` | Print the latest CloudWatch log stream for the function. |

## Update the code

```bash
cd infrastructure/lambda
npm ci --omit=dev
zip -r lambda.zip index.js package.json node_modules
aws lambda update-function-code --function-name portfolio-contact-form-handler --zip-file fileb://lambda.zip
rm -rf lambda.zip node_modules
```

Then submit the site's contact form and check `./view-logs.sh` for `Email sent successfully`.

## Known limitations

- **Not infrastructure as code.** The function, its role, and the SES permission were created by `deploy.sh` with the AWS CLI. The only CDK-managed resource is one `Lambda::Permission` in `PortfolioInfrastructureStack`, from the archived `infrastructure` branch.
- **Deprecated runtime.** `nodejs18.x` reached end of support in September 2025. AWS still runs it but will block configuration updates on it.
- **Over-broad execution role.** `AmazonSESFullAccess` where `ses:SendEmail` on one identity would do.
- **No deployment pipeline.** Code updates are manual (see above).
- **Resource policy carries leftovers.** Two `amplify.amazonaws.com` invoke statements and one for `ses.amazonaws.com` predate the compute role and are no longer needed.

## Next steps

- Move the function, role, and permissions into a CDK stack under `infrastructure/`, importing the existing function so nothing is recreated.
- Upgrade the runtime to `nodejs22.x` as part of that move.
- Replace `AmazonSESFullAccess` with a scoped `ses:SendEmail` policy.
