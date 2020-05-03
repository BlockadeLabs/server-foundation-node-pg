FROM node:14

WORKDIR /var/www/app

# The following code is necessary if `npm install`-ing private git repos, and
# the Docker container needs access to the user's Github credentials

# ARG GITUSER=defaultuser
# ARG GITEMAIL=defaultemail
# ARG GITHUBPAT=defaultpat

# RUN git config --global user.name "${GITUSER}"
# RUN git config --global user.email "${GITEMAIL}"
# RUN git config --global url."https://api:$GITHUBPAT@github.com/".insteadOf "https://github.com/"
# RUN git config --global url."https://ssh:$GITHUBPAT@github.com/".insteadOf "ssh://git@github.com/"
# RUN git config --global url."https://git:$GITHUBPAT@github.com/".insteadOf "git@github.com:"
