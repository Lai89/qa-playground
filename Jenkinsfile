pipeline {
    agent any

    tools {
        // Usa el nombre que le dimos a NodeJS en Global Tool Configuration
        nodejs 'NodeJS-Latest'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '=== Descargando el código del repositorio ==='
                checkout scm
            }
        }

        stage('Test Backend (Java / Maven)') {
            steps {
                echo '=== Ejecutando pruebas unitarias y de API Backend ==='
                // Ejecuta las pruebas de JUnit/Maven
                sh 'mvn test'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo '=== Instalando dependencias de Node.js y Playwright ==='
                sh 'npm ci || npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Test Frontend (Playwright)') {
            steps {
                echo '=== Ejecutando pruebas E2E con Playwright ==='
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            echo '=== Publicando reporte HTML de Playwright ==='
            // Publica el reporte de Playwright en la interfaz de Jenkins
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
