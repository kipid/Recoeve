#!/bin/bash

# destination of class to be created
DC="/home/kipid/Recoeve/bin/main"

# The whole CLASSPATH list split by ":"
# The whole classes are integrated into /Recoeve/gradle/wrapper/gradle-wrapper.jar
# CLASSPATH=/home/kipid/Recoeve/bin/main:$CLASSPATH

# $1 expands to the first argument (filename with extension). e.g. "HelloWorld.java"
echo "Compiling $(basename $1)"
# Compile $1 with {filename:$(basename $1), encoding:UTF-8, destination:$DC, classpath:$CLASSPATH}
javac "$(basename $1)" -Xlint:deprecation -encoding UTF-8 -d "$DC" -classpath "$CLASSPATH"

if [ $? -ne 0 ]; then
  exit 1
fi

# source directory
SD=$(dirname "$1")

# $SD/$(basename $1 .java) gives [source directory]/file_name without extension. e.g. "/home/kipid/Recoeve/src/main/java/recoeve/db/html/HelloWorld".
packSD="$SD/$(basename $1 .java)"

# Replace "/home/kipid/Recoeve/src/main/java/" with "" [empty] in $packSD. e.g. "recoeve/db/html/HelloWorld".
CN="${packSD#/home/kipid/Recoeve/src/main/java/}"

# Replace "/" with "." in $CN. e.g. "recoeve.db.html.HelloWorld"
# This is a class name with JAVA package included.
CN="${CN//\//.}"

echo "--- OUTPUT: $CN $2 $3 $4 $5 $6 $7 $8 $9 ---"
# Change directory to the $DC [destination of class to be created].
cd "$DC"

# Run/Execute the class created.
java -Dfile.encoding=UTF-8 -classpath "$CLASSPATH" "$CN" "$2" "$3" "$4" "$5" "$6" "$7" "$8" "$9"

# Back to source directory
cd "$SD"
