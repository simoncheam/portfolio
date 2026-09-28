# To-do: move the contact-form backend to AWS CDK

**Status:** Not started. Recorded 2026-09-27.
**Goal:** every backend resource for the contact form is defined in a CDK stack under `infrastructure/`, deployed through the existing GitHub OIDC role, so the README can say "managed as code" and mean it.

## Current state

| Resource | Exists today | Defined in code? |
|---|---|---|
| Lambda `portfolio-contact-form-handler` (nodejs18.x, 256 MB, 10 s) | Yes | Source only (`lambda/index.js`). Created by `lambda/deploy.sh`. |
| IAM role `portfolio-lambda-execution-role` | Yes | No. `AmazonSESFullAccess` + `AWSLambdaBasicExecutionRole`. |
| IAM role `portfolio-amplify-compute-role` | Yes | No. Created by CLI 2026-09-27. Invoke the Lambda only. |
| IAM role `portfolio-github-deploy-role` + OIDC provider | Yes | No. Created by CLI 2026-09-27. Update the Lambda's code only. |
| Lambda resource policy | Yes | No. Two stale statements (`ses.amazonaws.com`, `amplify.amazonaws.com`) that nothing uses. |
| Lambda env vars (`AWS_SES_EMAIL_FROM`, `AWS_SES_EMAIL_TO`, `RECAPTCHA_SECRET_KEY`) | Yes | No. Set by hand on the function. |
| Amplify app, compute-role binding, build env vars | Yes | No. Console. |
| Deploy pipeline | Code-only (`update-function-code` via OIDC) | Yes: `.github/workflows/deploy-contact-form-lambda.yml`. |

Earlier CDK attempt: tag `archive/infrastructure-2025-03`. It imported the function and app by ID and could manage neither; its stack was deleted 2026-09-27. Don't revive it.

## Gaps to close

1. **Not infrastructure as code.** Rebuilding the backend means re-running a shell script and this session's notes.
2. **Deprecated runtime.** `nodejs18.x` ended support September 2025. AWS will block config updates on it.
3. **Over-broad execution role.** `AmazonSESFullAccess` where `ses:SendEmail` and `ses:SendRawEmail` on the one verified identity would do.
4. **Stale resource-policy statements.** Harmless but misleading to a reviewer.
5. **Old SSR logging role** still carries `AWSLambdaRole` (invoke any function) and `AmplifyLambdaInvokePolicy`. It's no longer the compute role.
6. **Secret in function config.** `RECAPTCHA_SECRET_KEY` is a plain env var. Consider SSM Parameter Store (SecureString) read at cold start.
7. **Config changes are manual.** The pipeline updates code only; runtime, memory, env vars are console/CLI edits with no history.
8. **Amplify variable `ADMIN_USER_ID`** is set but unused by the app. Delete it in the console.

## Plan

**S1. Decide import vs. replace.** Two options:
- *Import:* `cdk import` adopts the live function and role into a new stack. Zero new resources, but the runtime bump and role rewrite still happen as in-place updates on a deprecated runtime.
- *Replace (recommended):* the stack creates `portfolio-contact-form-handler-v2` on `nodejs22.x` with a new scoped role, bundled from `lambda/index.js` (`NodejsFunction`). Cut over by changing `LAMBDA_FUNCTION_ARN` in Amplify and the compute role's policy. Rollback is switching the ARN back. Delete the old function and role after a week of clean logs.

**S2. Stack contents** (`infrastructure/cdk/`, one stack, `us-east-1`):
- `NodejsFunction` from `../lambda/index.js`, Node 22, 256 MB, 10 s, env vars from stack props, `RECAPTCHA_SECRET_KEY` from an SSM SecureString parameter.
- Execution role: logs + `ses:SendEmail`/`SendRawEmail` on the verified identity ARN.
- Compute role (import the existing one by name, or recreate) with `lambda:InvokeFunction` on the new function only. Amplify's compute-role binding stays a console/CLI setting; record the command in the README.
- OIDC deploy role: extend to what `cdk deploy` needs (CloudFormation on this stack, `iam:PassRole` on the two roles, S3 for the CDK assets bucket), or use the CDK bootstrap roles with the OIDC role allowed to assume them.
- Outputs: function ARN, role ARNs.

**S3. Pipeline.** Replace the code-only workflow with `cdk diff` on pull requests and `cdk deploy --require-approval never` on push to `main`, same OIDC role. Keep the path filter on `infrastructure/**`.

**S4. Cutover and verification.** Deploy the stack, point `LAMBDA_FUNCTION_ARN` at the new function, redeploy the site, submit the form, confirm `Email sent successfully` in the new function's logs and no invocations on the old one.

**S5. Cleanup.** Delete the old function and `portfolio-lambda-execution-role`; remove the two stale resource-policy statements (moot once the old function is gone); detach the invoke policies from the SSR logging role; delete `ADMIN_USER_ID` from Amplify; update both READMEs and the resume's portfolio entry.

## Acceptance

- `cdk synth` from a clean clone produces the stack; `cdk deploy` from CI succeeds through OIDC with no static keys.
- The README's Known limitations list for the backend is empty except the Amplify console binding.
- The IAM simulator shows: compute role can invoke the new function only; execution role can send SES from the one identity only; deploy role cannot touch anything outside the stack.

## Out of scope

- Moving Amplify Hosting itself into CDK. The `@aws-cdk/aws-amplify-alpha` construct still can't set the compute role or manage an app created in the console; leave hosting where it is.
- API Gateway. Direct invocation from the server action is simpler and cheaper for one form.
