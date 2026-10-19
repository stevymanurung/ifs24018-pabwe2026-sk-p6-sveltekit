pipeline {
  agent {
    docker {
      image 'node:24-bookworm'
      args '-u root:root'
    }
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    skipDefaultCheckout(false)
  }

  stages {
    stage('Check Runtime and Install Dependencies') {
      steps {
        sh '''set -eu
          echo '=== Node.js runtime inside Node 24 container ==='
          node --version
          npm --version
          if [ -f package-lock.json ]; then npm ci; else npm install; fi
        '''
      }
    }

    stage('Tests with Coverage') {
      steps {
        sh 'npm run test:coverage'
      }
      post {
        always {
          archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
        }
      }
    }

    stage('Svelte Check') {
      steps {
        sh 'npm run check'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          withSonarQubeEnv('SonarQube') {
            sh 'npx --yes @sonar/scan'
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed. Review the stage results above.'
    }
  }
}
