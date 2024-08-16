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
sudo git config --global init.defaultBranch main
sudo git config --global pull.rebase true

eval "$(ssh-agent -s)"
ssh-add ~/RecoeveNet/.ssh/github-recoeve-rsa





sudo git pull origin main
