#!/usr/bin/bash

'''
    Simple shell script that adds all my work to 
    github and takes in an argument which is the 
    commit message
'''

git add -A
git commit -m "$@"
git push 
