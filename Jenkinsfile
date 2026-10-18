pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    skipDefaultCheckout(false)
  }

  tools {
    nodejs 'NodeJS 24'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh '''set -eu
          if [ -f package-lock.json ]; then npm ci; else npm install; fi
        '''
      }
    }

    stage('Tests with Coverage') {
      steps {
        sh '''set -eu
          npm run test:coverage
        '''
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
            sh 'sonar-scanner'
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
