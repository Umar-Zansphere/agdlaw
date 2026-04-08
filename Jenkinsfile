pipeline {
  agent any

  triggers {
    cron('0 10 * * *')
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '14'))
  }

  environment {
    CI = 'true'
    PLAYWRIGHT_HTML_EMAIL_REPORT = 'test-results/e2e-email-report.html'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        dir('frontend') {
          script {
              bat 'call pnpm install --frozen-lockfile'
              bat 'call pnpm exec playwright install chromium'
            
          }
        }
      }
    }

    stage('Run E2E Tests') {
      steps {
        dir('frontend') {
          script {
              bat 'call pnpm test:e2e'
            
          }
        }
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'frontend/test-results/e2e-junit.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'frontend/test-results/**,frontend/playwright-report/**'
      script {
        def reportPath = "frontend/${env.PLAYWRIGHT_HTML_EMAIL_REPORT}"
        def reportBody = fileExists(reportPath)
          ? readFile(reportPath)
          : """
            <html>
              <body style="font-family: Arial, sans-serif;">
                <h2>AGD Law E2E Test Report</h2>
                <p>The Playwright run completed with status: <strong>${currentBuild.currentResult}</strong></p>
                <p>No HTML email report was generated. Check archived artifacts and the Jenkins console log for details.</p>
                <p>Build URL: ${env.BUILD_URL ?: 'N/A'}</p>
              </body>
            </html>
          """.stripIndent()

        emailext(
          to: env.E2E_REPORT_RECIPIENTS ?: '$DEFAULT_RECIPIENTS',
          subject: "[${currentBuild.currentResult}] ${env.JOB_NAME} #${env.BUILD_NUMBER} - AGD Law E2E Report",
          mimeType: 'text/html',
          attachLog: currentBuild.currentResult != 'SUCCESS',
          body: reportBody
        )
      }
    }
  }
}
