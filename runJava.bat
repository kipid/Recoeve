@rem encoding must be EUC-KR with Korean folder name.
@ECHO OFF

set sp=C:\Recoeve\sources
set cp=C:\Recoeve\classes
set CLASSPATH=.;C:\Program Files\Java\jdk1.8.0_25\lib;C:\Recoeve\classes;C:\Recoeve\classes\javax.mail.jar;C:\Program Files (x86)\MySQL\Connector.J 5.1\mysql-connector-java-5.1.33-bin.jar
@rem mysql-connector.jar;javax.mail.jar

ECHO Compiling %~nx1.......
javac -encoding utf8 -sourcepath "%sp%" %~nx1 -d "%cp%" -classpath "%CLASSPATH%"

IF NOT %ERRORLEVEL%==0 GOTO :EOF
cd %cp%
set packSD=%~dpn1
set cn=%packSD:C:\Recoeve\sources\=%
set cn=%cn:\=.%
echo --- OUTPUT: %cn% %2 %3 %4 %5 %6 %7 %8 %9 ---
java -Dfile.encoding=UTF8 -classpath "%CLASSPATH%" %cn% %2 %3 %4 %5 %6 %7 %8 %9
