# coffeebot

https://github.com/google/clasp

`npm install -g @google/clasp`

`clasp login`

https://script.google.com/home/usersettings

## Get latest code from the scripts site?

This can be used incase development has happened on script.google.com

`clasp pull`

## Push code from repo to scirpt site

This can be used in case you have merged a PR in the git repo

`clasp push`

## Deploy the latest code that has been pushed to the site

The <id> needs to be retrieved from script.google.com

`clasp deploy -i <id>`