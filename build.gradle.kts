import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar
import org.gradle.api.tasks.testing.logging.TestLogEvent.*

plugins {
	java
	application
	id("com.github.johnrengelman.shadow") version "8.1.1"
}

group = "net.recoeve"
version = "1.0.0-SNAPSHOT"

repositories {
	mavenCentral()
}

val vertxVersion = "4.5.9"
val junitJupiterVersion = "5.9.1"

val mainVerticleName = "recoeve.http.MainVerticle"
val launcherClassName = "io.vertx.core.Launcher"

val watchForChange = "src/**/*"
val doOnChange = "${projectDir}/gradlew classes"

application {
	mainClass.set(launcherClassName)
}

dependencies {
	implementation("io.netty:netty-all:4.1.104.Final")
	implementation("mysql:mysql-connector-java:8.0.33") // https://mavenlibs.com/maven/dependency/mysql/mysql-connector-java
	implementation("com.mysql:mysql-connector-j:8.1.0") // https://mavenlibs.com/maven/dependency/com.mysql/mysql-connector-j
	implementation("com.sun.mail:jakarta.mail:2.0.1") // https://mvnrepository.com/artifact/jakarta.mail/jakarta.mail-api
	implementation("org.jsoup:jsoup:1.18.1")
	implementation("io.vertx:vertx-core:$vertxVersion") // https://mvnrepository.com/artifact/io.vertx/vertx-core
	// implementation('org.slf4j:slf4j-api:1.7.36')
	// implementation('ch.qos.logback:logback-classic:1.2.11')
	implementation("io.micrometer:micrometer-registry-prometheus:1.12.1") // Thanks for using https://jar-download.com
	implementation("io.vertx:vertx-micrometer-metrics:$vertxVersion") // https://mvnrepository.com/artifact/io.vertx/vertx-micrometer-metrics
	implementation(platform("io.vertx:vertx-stack-depchain:$vertxVersion"))
	implementation("io.vertx:vertx-web-client")
	implementation("io.vertx:vertx-web")
	implementation("io.vertx:vertx-web-openapi")
	implementation("io.vertx:vertx-mysql-client")
	implementation("io.vertx:vertx-http-service-factory")
	implementation("io.vertx:vertx-json-schema")
	implementation("io.vertx:vertx-web-api-contract")
	implementation("io.vertx:vertx-rx-java3")
	implementation("io.vertx:vertx-auth-oauth2:$vertxVersion")
	implementation("io.vertx:vertx-jdbc-client")
	implementation("io.vertx:vertx-config")
	implementation("io.vertx:vertx-rx-java2")
	implementation("io.vertx:vertx-rx-java")
	implementation("io.vertx:vertx-mail-client")
	implementation("io.vertx:vertx-auth-jdbc")
	testImplementation("io.vertx:vertx-junit5")
	testImplementation("org.junit.jupiter:junit-jupiter:$junitJupiterVersion")
	implementation("org.seleniumhq.selenium:selenium-java:4.24.0") // https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java
}

java {
	sourceCompatibility = JavaVersion.VERSION_17
	targetCompatibility = JavaVersion.VERSION_17
}

tasks.withType<ShadowJar> {
	archiveClassifier.set("fat")
	manifest {
		attributes(mapOf("Main-Verticle" to mainVerticleName))
	}
	mergeServiceFiles()
}

tasks.withType<Test> {
	useJUnitPlatform()
	testLogging {
		events = setOf(PASSED, SKIPPED, FAILED)
	}
}

tasks.register("cleanRun") {
    dependsOn("clean")
    doLast {
        tasks.withType<JavaExec> {
            args = listOf("run", mainVerticleName, "--redeploy=$watchForChange", "--launcher-class=$launcherClassName", "--on-redeploy=$doOnChange")
            exec()
        }
    }
}
