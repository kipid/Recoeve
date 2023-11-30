@REM encoding must be EUC-KR with Korean folder name.
@ECHO OFF

:: destination of class to be created
SET DC=C:\Recoeve\classes

:: The whole CLASSPATH list splited by ";"
@REM SET CLASSPATH=.;%JAVA_HOME%\lib;%RECOEVE_CLASS%\classes;%RECOEVE_CLASS%\classes\javax.mail.jar;%RECOEVE_CLASS%\classes\mysql-connector-j-8.0.33.jar;%RECOEVE_CLASS%\classes\activation-1.1.1.jar;%VERTX_HOME%\conf;%VERTX_HOME%\lib\*;%RECOEVE_CLASS%\classes\jsoup-1.16.1.jar

:: %~nx1 expands %1 [arg 1] to "file name + extension". e.g. "HelloWorld.java"
ECHO Compiling %~nx1
:: Compile %~nx1 with {filename:%~nx1, encoding:UTF-8, destination:%DC%, classpath:%CLASSPATH%}
javac %~nx1 -Xlint:deprecation -encoding UTF-8 -d "%DC%" -classpath "%CLASSPATH%"

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
java -Dfile.encoding=UTF-8 -classpath "%CLASSPATH%" %CN% %2 %3 %4 %5 %6 %7 %8 %9

:: Back to source directory
CD %SD%