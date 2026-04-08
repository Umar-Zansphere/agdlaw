pipeline {
  agent any

  tools {
      nodejs 'NodeJS'
  }

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
          bat '''
          npm install -g pnpm
          pnpm install --frozen-lockfile
          '''
        }
      }
    }

    stage('Run E2E Tests') {
      steps {
        dir('frontend') {
          bat '''
          npx playwright install chromium
          pnpm test:e2e
          '''
        }
      }
    }
  }

  post {
    always {
      script {
        def junitPath = 'frontend/test-results/e2e-junit.xml'
        def emailReportPath = "frontend/${env.PLAYWRIGHT_HTML_EMAIL_REPORT}"
        def hasJunit = fileExists(junitPath)
        def hasEmailReport = fileExists(emailReportPath)
        def hasPlaywrightReport = fileExists('frontend/playwright-report/index.html')

        if (hasJunit) {
          junit testResults: junitPath
        } else {
          echo "JUnit report not found at ${junitPath}. Skipping test result publishing."
        }

        def artifactPatterns = []
        if (hasJunit || hasEmailReport) {
          artifactPatterns << 'frontend/test-results/**'
        }
        if (hasPlaywrightReport) {
          artifactPatterns << 'frontend/playwright-report/**'
        }

        if (artifactPatterns) {
          archiveArtifacts artifacts: artifactPatterns.join(',')
        } else {
          echo 'No Playwright artifacts were generated. Skipping artifact archiving.'
        }

        def reportBody = hasEmailReport
          ? readFile(emailReportPath)
          : """
            <html>
              <body style="font-family: Arial, sans-serif;">
                <h2>AGD Law E2E Test Report</h2>
                <p>The Playwright run completed with status: <strong>${currentBuild.currentResult}</strong></p>
                <p>No HTML email report was generated. This usually means Playwright did not start cleanly or no report files were written.</p>
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
