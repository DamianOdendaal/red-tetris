'''
    The following shell script will be used as an assist for 
    the dockerfile to install all of the needed things for atom
''' 

sudo rpm --import https://packagecloud.io/AtomEditor/atom/gpgkey
sudo sh -c 'echo -e "[Atom]\nname=Atom Editor\nbaseurl=https://packagecloud.io/AtomEditor/atom/el/7/\$basearch\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://packagecloud.io/AtomEditor/atom/gpgkey" > /etc/yum.repos.d/atom.repo'
sudo yum install atom

apm install auto-indent atom-ternjs file-icons language-ejs language-babel linter linter-erb linter-csslint linter-eslint linter-js-yaml linter-js-standard
