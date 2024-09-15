rem copy to C:/kipid/PortableGit/bin

:: Current directory
SET BASEDIR=%CD%

cd C:/Recoeve/
set GIT_EDITOR=vim
set VISUAL=vim
set EDITOR=%VISUAL%

git config --global core.editor "vim"
git config --global alias.history "log --pretty=oneline"
git config --global user.name "kipid"
git config --global user.email "kipacti@gmail.com"
git config --global --replace-all init.defaultBranch main
git config --global pull.rebase true



rem call ssh-agent
rem ssh-add C:/RecoeveNet/.ssh/github-recoeve-rsa
rem git config --global credential.helper cache

rem git remote set-url origin git@github.com:kipid/Recoeve.git
rem git pull

rem cd C:/RecoeveNet/
rem git remote set-url origin git@github.com:kipid/RecoeveNet.git
rem git pull



git config --global credential.helper C:/RecoeveNet/.ssh/github-pwd
git remote set-url origin https://kipid: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@github.com/kipid/Recoeve.git
git pull

cd C:/RecoeveNet/
git remote set-url origin https://kipid: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@github.com/kipid/RecoeveNet.git
git pull

:: Back to current directory
cd %BASEDIR%
