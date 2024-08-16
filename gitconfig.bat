rem copy to C:\kipid\PortableGit\bin

git config --global core.editor "vim"
export GIT_EDITOR=vim
export VISUAL=vim
export EDITOR="$VISUAL"

git config --global alias.history "log --pretty=oneline"
git config --global user.name "kipid"
git config --global user.email "kipacti@gmail.com"
git config --global init.defaultBranch main
git config --global pull.rebase true
