#!/usr/bin/env python3

import sys
import subprocess
gittools = __import__("git-tools")
gittools.cdIntoScriptDir()

startWcaCommand = 'java -jar wca/dist/TNoodle.jar -n -p 8080'
if sys.argv[1:]:
   startWcaCommand += ' ' + subprocess.list2cmdline(sys.argv[1:])
projects = [
   gittools.GitSensitiveProject(name='wca',
      compileCommand='./tmt make dist -p wca',
      runCommand=startWcaCommand),
   gittools.GitSensitiveProject(name='noderacer',
      compileCommand='./tmt make -p noderacer',
      runCommand='./tmt make run -p noderacer')
]
gittools.startGitSensitiveScreen("tnoodle", projects, cleanCommand="./tmt make clean")
