# sudo vim ~/.bashrc
# cp ~/Recoeve/gitconfig.sh ~/.config/

BASEDIR=${PWD}

cd ~/Recoeve/

sudo git config --global core.editor "vim"
export GIT_EDITOR=vim
export VISUAL=vim
export EDITOR="$VISUAL"

sudo git config --global alias.history "log --pretty=oneline"
sudo git config --global user.name "kipid"
sudo git config --global user.email "kipacti@gmail.com"
sudo git config --global --replace-all init.defaultBranch main
sudo git config --global pull.rebase true

eval "$(ssh-agent -s)"
sudo ssh-add ~/RecoeveNet/.ssh/github-recoeve-rsa
sudo git config --global credential.helper cache

sudo git remote set-url origin git@github.com:kipid/Recoeve.git
sudo git pull origin main

cd ~/RecoeveNet/
sudo git remote set-url origin git@github.com:kipid/RecoeveNet.git
sudo git pull origin main

cd ${BASEDIR}
