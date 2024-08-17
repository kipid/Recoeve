# sudo vim ~/.bashrc
# cp ~/Recoeve/gitconfig.sh ~/.config/

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

sudo git pull origin main

cd ~/RecoeveNet/
sudo git pull origin main

cd ~/Recoeve/