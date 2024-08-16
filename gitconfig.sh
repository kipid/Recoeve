# sudo vim ~/.bashrc
# cp ~/Recoeve/gitconfig.sh ~/.config/

cd ~/Recoeve/

sudo git config --global core.editor "vim"
export GIT_EDITOR=vim
export VISUAL=vim
export EDITOR="$VISUAL"

sudo git config alias.history "log --pretty=oneline" --global
sudo git config user.name "kipid" --global
sudo git config user.email "kipacti@gmail.com" --global
sudo git config --global init.defaultBranch main --global
sudo git config pull.rebase true --global

eval "$(ssh-agent -s)"
ssh-add ~/RecoeveNet/.ssh/github-recoeve-rsa





sudo git pull origin main
