In case of running errors, for instance, either the terminal hangs or
exits with error code 1, there may be issues with regards to the version
of nodejs or npm.

To get around this, especially when running pretty much everything in
the terminal, there are a few commands to run in order for smooth running.

You will need to check Nodejs and npm versions are up to date. After multiple
attempts to get this running, I found the following worked for me:

In case you already have Nodejs running on your system:
1. 'sudo apt-get remove nodejs'
2. 'sudo apt-get install nodejs'
3. Exit Terminal, re-enter a new one
4. 'npm install -g npm'

If you do not have Nodejs, then simply skip step 1 above.
