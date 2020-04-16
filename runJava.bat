@REM encoding must be EUC-KR with Korean folder name.
@ECHO OFF

:: destination of class to be created
SET DC=C:\Recoeve\classes

:: The whole CLASSPATH list splited by ";"
SET CLASSPATH=.;C:\Program Files\Java\jdk-13\lib;C:\Recoeve\classes;C:\Recoeve\classes\javax.mail.jar;C:\Recoeve\classes\mysql-connector-java-8.0.19.jar;C:\Recoeve\classes\activation-1.1.1.jar
:: ;C:\Program Files (x86)\MySQL\Connector.J 5.1\mysql-connector-java-5.1.33-bin.jar
@REM mysql-connector.jar;javax.mail.jar

:: %~nx1 expands %1 [arg 1] to "file name + extension". e.g. "HelloWorld.java"
ECHO Compiling %~nx1
:: Compile %~nx1 with {filename:%~nx1, encoding:utf8, destination:%DC%, classpath:%CLASSPATH%}
javac %~nx1 -encoding utf8 -d "%DC%" -classpath "%CLASSPATH%"

IF NOT %ERRORLEVEL%==0 GOTO :EOF

:: source directory
SET SD=%CD%
@REM or SET SD=%~dp1

:: %SD%\%~n1 gives [source directory]\file_name. e.g. "C:\Recoeve\sources\kipid\hello\HelloWorld".
SET packSD=%SD%\%~n1
@REM or SET packSD=%~dpn1

:: Replace "C:\Recoeve\sources\" to "" [empty] of %packSD%. e.g. "kipid\hello\HelloWorld".
SET CN=%packSD:C:\Recoeve\sources\=%

:: Replace "\" to "." of %cn%. e.g. "kipid.hello.HelloWorld"
:: This is a class name with JAVA package included.
SET CN=%CN:\=.%

ECHO --- OUTPUT: %CN% %2 %3 %4 %5 %6 %7 %8 %9 ---
:: Change directory to the %DC% [destination of class to be created].
CD %DC%

:: Run/Execute the class created.
java -Dfile.encoding=UTF8 -classpath "%CLASSPATH%" %CN% %2 %3 %4 %5 %6 %7 %8 %9

:: Back to source directory
CD %SD%