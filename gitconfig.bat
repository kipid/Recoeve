rem copy to C:\kipid\PortableGit\bin

:: Current directory
SET SD=%CD%

cd C:/Recoeve/

git config --global core.editor "vim"
git config --global alias.history "log --pretty=oneline"
git config --global user.name "kipid"
git config --global user.email "kipacti@gmail.com"
git config --global --replace-all init.defaultBranch main
git config --global pull.rebase true
git pull

:: Back to current directory
CD %SD%
