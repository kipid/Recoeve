@rem copy to java\bin directory.
@REM encoding must be EUC-KR with Korean folder name.
@ECHO OFF

:: destination of class to be created
SET DC=C:\Recoeve\bin\main

:: The whole CLASSPATH list splited by ";"
:: The whole classes are integrated into C:\Recoeve\gradle\wrapper\gradle-wrapper.jar
SET CLASSPATH=.;%CLASSPATH%;%RECOEVE_HOME%\build\classes\java\main;%RECOEVE_HOME%\build\libs\recoeve-1.0.0-SNAPSHOT-fat.jar;%RECOEVE_HOME%\gradle\wrapper\gradle-wrapper.jar;%JAVA_HOME%\lib

:: %~nx1 expands %1 [arg 1] to "file name + extension". e.g. "HelloWorld.java"
ECHO Compiling %~nx1
:: Compile %~nx1 with {filename:%~nx1, encoding:UTF-8, destination:%DC%, classpath:%CLASSPATH%}
javac %~nx1 -Xlint:deprecation -encoding UTF-8 -d "%DC%" -classpath "%CLASSPATH%"

IF NOT %ERRORLEVEL%==0 GOTO :EOF

:: source directory
@REM SET SD=%CD%
SET SD=%~dp1

:: %SD%\%~n1 gives [source directory]\file_name. e.g. "C:\Recoeve\src\main\java\recoeve\db\html\HelloWorld".
SET packSD=%SD%%~n1
@REM or SET packSD=%~dpn1

:: Replace "C:\Recoeve\src\main\java\" to "" [empty] of %packSD%. e.g. "recoeve\db\html\HelloWorld".
SET CN=%packSD:C:\Recoeve\src\main\java\=%

:: Replace "\" to "." of %cn%. e.g. "recoeve.db.html.HelloWorld"
:: This is a class name with JAVA package included.
SET CN=%CN:\=.%

ECHO --- OUTPUT: %CN% %2 %3 %4 %5 %6 %7 %8 %9 ---
:: Change directory to the %DC% [destination of class to be created].
CD %DC%

:: Run\Execute the class created.
java -Dfile.encoding=UTF-8 -classpath "%CLASSPATH%" %CN% %2 %3 %4 %5 %6 %7 %8 %9

:: Back to source directory
CD %SD%
