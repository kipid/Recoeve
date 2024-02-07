@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  http startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and HTTP_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\http-1.0.0-SNAPSHOT.jar;%APP_HOME%\lib\netty-all-4.1.104.Final.jar;%APP_HOME%\lib\mysql-connector-j-8.1.0.jar;%APP_HOME%\lib\mail-1.4.7.jar;%APP_HOME%\lib\jsoup-1.17.1.jar;%APP_HOME%\lib\vertx-micrometer-metrics-4.5.1.jar;%APP_HOME%\lib\vertx-auth-oauth2-4.5.1.jar;%APP_HOME%\lib\vertx-auth-jdbc-4.5.1.jar;%APP_HOME%\lib\vertx-jdbc-client-4.5.1.jar;%APP_HOME%\lib\vertx-http-service-factory-4.5.1.jar;%APP_HOME%\lib\vertx-rx-java-4.5.1.jar;%APP_HOME%\lib\vertx-rx-java2-4.5.1.jar;%APP_HOME%\lib\vertx-rx-java3-4.5.1.jar;%APP_HOME%\lib\vertx-web-api-contract-4.5.1.jar;%APP_HOME%\lib\vertx-web-openapi-4.5.1.jar;%APP_HOME%\lib\vertx-web-validation-4.5.1.jar;%APP_HOME%\lib\vertx-web-4.5.1.jar;%APP_HOME%\lib\vertx-web-client-4.5.1.jar;%APP_HOME%\lib\vertx-mail-client-4.5.1.jar;%APP_HOME%\lib\vertx-mysql-client-4.5.1.jar;%APP_HOME%\lib\vertx-config-4.5.1.jar;%APP_HOME%\lib\vertx-json-schema-4.5.1.jar;%APP_HOME%\lib\vertx-auth-common-4.5.1.jar;%APP_HOME%\lib\vertx-sql-client-4.5.1.jar;%APP_HOME%\lib\vertx-service-factory-4.5.1.jar;%APP_HOME%\lib\vertx-rx-java-gen-4.5.1.jar;%APP_HOME%\lib\vertx-rx-java2-gen-4.5.1.jar;%APP_HOME%\lib\vertx-rx-java3-gen-4.5.1.jar;%APP_HOME%\lib\vertx-rx-gen-4.5.1.jar;%APP_HOME%\lib\vertx-web-common-4.5.1.jar;%APP_HOME%\lib\vertx-bridge-common-4.5.1.jar;%APP_HOME%\lib\vertx-uri-template-4.5.1.jar;%APP_HOME%\lib\vertx-core-4.5.1.jar;%APP_HOME%\lib\micrometer-registry-prometheus-1.12.1.jar;%APP_HOME%\lib\selenium-java-4.17.0.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.104.Final-linux-x86_64.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.104.Final-linux-aarch_64.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.104.Final-linux-riscv64.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.104.Final-osx-x86_64.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.104.Final-osx-aarch_64.jar;%APP_HOME%\lib\netty-codec-http2-4.1.104.Final.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-http-4.1.104.Final.jar;%APP_HOME%\lib\netty-resolver-dns-native-macos-4.1.104.Final-osx-x86_64.jar;%APP_HOME%\lib\netty-resolver-dns-native-macos-4.1.104.Final-osx-aarch_64.jar;%APP_HOME%\lib\netty-resolver-dns-classes-macos-4.1.104.Final.jar;%APP_HOME%\lib\netty-resolver-dns-4.1.104.Final.jar;%APP_HOME%\lib\netty-handler-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-classes-epoll-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-classes-kqueue-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-native-unix-common-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-socks-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-dns-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-4.1.104.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-haproxy-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-memcache-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-mqtt-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-redis-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-smtp-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-stomp-4.1.104.Final.jar;%APP_HOME%\lib\netty-codec-xml-4.1.104.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.104.Final.jar;%APP_HOME%\lib\netty-common-4.1.104.Final.jar;%APP_HOME%\lib\netty-handler-ssl-ocsp-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-rxtx-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-sctp-4.1.104.Final.jar;%APP_HOME%\lib\netty-transport-udt-4.1.104.Final.jar;%APP_HOME%\lib\json-schema-validator-1.0.43.jar;%APP_HOME%\lib\vertx-codegen-4.5.1.jar;%APP_HOME%\lib\jackson-core-2.15.3.jar;%APP_HOME%\lib\jackson-databind-2.15.3.jar;%APP_HOME%\lib\jackson-annotations-2.15.3.jar;%APP_HOME%\lib\selenium-chrome-driver-4.17.0.jar;%APP_HOME%\lib\selenium-devtools-v119-4.17.0.jar;%APP_HOME%\lib\selenium-devtools-v120-4.17.0.jar;%APP_HOME%\lib\selenium-devtools-v121-4.17.0.jar;%APP_HOME%\lib\selenium-firefox-driver-4.17.0.jar;%APP_HOME%\lib\selenium-devtools-v85-4.17.0.jar;%APP_HOME%\lib\selenium-edge-driver-4.17.0.jar;%APP_HOME%\lib\selenium-ie-driver-4.17.0.jar;%APP_HOME%\lib\selenium-safari-driver-4.17.0.jar;%APP_HOME%\lib\selenium-support-4.17.0.jar;%APP_HOME%\lib\selenium-chromium-driver-4.17.0.jar;%APP_HOME%\lib\selenium-remote-driver-4.17.0.jar;%APP_HOME%\lib\selenium-http-4.17.0.jar;%APP_HOME%\lib\guava-33.0.0-jre.jar;%APP_HOME%\lib\snakeyaml-2.0.jar;%APP_HOME%\lib\slf4j-api-2.0.7.jar;%APP_HOME%\lib\protobuf-java-3.21.9.jar;%APP_HOME%\lib\activation-1.1.jar;%APP_HOME%\lib\micrometer-core-1.12.1.jar;%APP_HOME%\lib\simpleclient_common-0.16.0.jar;%APP_HOME%\lib\HdrHistogram-2.1.12.jar;%APP_HOME%\lib\selenium-manager-4.17.0.jar;%APP_HOME%\lib\selenium-json-4.17.0.jar;%APP_HOME%\lib\selenium-os-4.17.0.jar;%APP_HOME%\lib\selenium-api-4.17.0.jar;%APP_HOME%\lib\c3p0-0.9.5.5.jar;%APP_HOME%\lib\bcpg-jdk15on-1.54.jar;%APP_HOME%\lib\jakarta.xml.bind-api-2.3.3.jar;%APP_HOME%\lib\micrometer-observation-1.12.1.jar;%APP_HOME%\lib\micrometer-commons-1.12.1.jar;%APP_HOME%\lib\LatencyUtils-2.0.3.jar;%APP_HOME%\lib\simpleclient-0.16.0.jar;%APP_HOME%\lib\auto-service-annotations-1.1.1.jar;%APP_HOME%\lib\opentelemetry-semconv-1.23.1-alpha.jar;%APP_HOME%\lib\opentelemetry-exporter-logging-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-extension-autoconfigure-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-extension-autoconfigure-spi-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-trace-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-metrics-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-logs-1.34.1.jar;%APP_HOME%\lib\opentelemetry-sdk-common-1.34.1.jar;%APP_HOME%\lib\opentelemetry-api-events-1.34.1-alpha.jar;%APP_HOME%\lib\opentelemetry-extension-incubator-1.34.1-alpha.jar;%APP_HOME%\lib\opentelemetry-api-1.34.1.jar;%APP_HOME%\lib\opentelemetry-context-1.34.1.jar;%APP_HOME%\lib\byte-buddy-1.14.11.jar;%APP_HOME%\lib\mchange-commons-java-0.2.19.jar;%APP_HOME%\lib\bcprov-jdk15on-1.54.jar;%APP_HOME%\lib\rxjava-1.3.8.jar;%APP_HOME%\lib\rxjava-2.2.21.jar;%APP_HOME%\lib\rxjava-3.0.13.jar;%APP_HOME%\lib\reactive-streams-1.0.3.jar;%APP_HOME%\lib\commons-lang3-3.5.jar;%APP_HOME%\lib\joni-2.1.31.jar;%APP_HOME%\lib\jakarta.activation-api-1.2.2.jar;%APP_HOME%\lib\simpleclient_tracer_otel-0.16.0.jar;%APP_HOME%\lib\simpleclient_tracer_otel_agent-0.16.0.jar;%APP_HOME%\lib\failsafe-3.3.2.jar;%APP_HOME%\lib\commons-exec-1.3.jar;%APP_HOME%\lib\failureaccess-1.0.2.jar;%APP_HOME%\lib\listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar;%APP_HOME%\lib\jsr305-3.0.2.jar;%APP_HOME%\lib\checker-qual-3.41.0.jar;%APP_HOME%\lib\error_prone_annotations-2.23.0.jar;%APP_HOME%\lib\jcodings-1.0.46.jar;%APP_HOME%\lib\simpleclient_tracer_common-0.16.0.jar


@rem Execute http
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %HTTP_OPTS%  -classpath "%CLASSPATH%" io.vertx.core.Launcher %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable HTTP_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%HTTP_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
