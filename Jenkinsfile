pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }

    tools {
        nodejs 'NodeJS-Latest'
    }

    stages {
        stage('Test Backend (Java / Maven)') {
            steps {
                echo '=== Ejecutando pruebas unitarias y de API Backend ==='
                dir('java-rest-assured') {
                    sh 'export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH" && mvn test'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo '=== Instalando dependencias de Node / Playwright ==='
                dir('typescript-playwright') {
                    sh 'npm install'
                }
            }
        }

        stage('Test Frontend (Playwright)') {
            steps {
                echo '=== Ejecutando pruebas E2E con Playwright ==='
                dir('typescript-playwright') {
                    sh 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            echo '=== Publicando reporte HTML de Playwright ==='
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'typescript-playwright/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}