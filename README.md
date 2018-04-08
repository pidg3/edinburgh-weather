# Edinburgh Weather

## Instructions

`npm run-script` can be used in place of yarn for all commands below.

* To run in dev mode: `yarn start`
* To run tests: `yarn test`
* To build: `yarn build`

### Deploying to S3 bucket

* Make sure your AWS CLI account is set up properly, including credentials.
* Set up S3 bucket.
* Go to Static Website Hosting in Properties page. Enable.
* Add Bucket Policy to make public [as per AWS docs](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteAccessPermissionsReqd.html). _(Note - must be Bucket Policy, not ACL)._
* Run `yarn build`.
* Run `aws s3 sync build/ s3://[BUCKET_NAME]`

## Technical Debt

In rough priority order:

* We have hard coded APP_ID credential for openweathermap. This is a red flag, even though in this case it is a free API and will taken down after a few days. Given more time I would probably spin up a little AWS Lambda/API Gateway backend to obscure the API key; I would then have the front end talk to this instead of the openweathermap API directly. We would also need to remove the key from the Github repo, including old commits.
* There is a nasty hack for handling the UK time zone in Utils.js. This needs replacing with something more sophisticated.
* Test coverage is low: more tests needed for components/rendering.
* CSS classes could use tidying up.
* Add error handling, particularly if API request fails. The [new error handling functionality](https://reactjs.org/blog/2017/09/26/react-v16.0.html#better-error-handling) in React 16 would work well for this.
* I am sure there must be an easier way to `reduce` the next 5 days forecasts than I've done in Utils.js. It feels overcomplicated.

## What could be done with more time

Aside from technical debt listed above:

* Are my UI assumptions correct? Do people want to see summarised results for each day, or each three-hourly forecast?
* Better loading screen - currently user sometimes sees a basic white page for a split second.
* Nicer styling. It's not my finest work at the moment but does the job.
* Do something more sophisticated to get the 'icon' for a given day. Currently it just uses whatever is at 12 noon. Ideally we would take a weighted average of weather conditions throughout the day, prioritising those closer to midday.
* Because of the above, if no forecast is available at 12 noon for the fifth day, only 4 days are shown. The UI therefore fluctuates between 4 and 5 days shown, depending on the time of day! This is a little odd.
* Add wind speed.
* Add precipitation %.
* Add automated deployments using Jenkins, CircleCI etc.
* Add 'Select City', using a search bar.
