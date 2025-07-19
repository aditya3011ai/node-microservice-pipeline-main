pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonartoken')
    DOCKER_CREDENTIALS = credentials('dockerhub')
  }

  stages {

    stage('Install & Test Services') {
      steps {
        script {
          sh 'node -v && npm -v && which npm'
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            dir(service) {
              sh 'npm install'
              sh 'npm test'
            }
          }
        }
      }
    }

    stage('SonarCloud Scan') {
      steps {
        script {
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            dir(service) {
              sh 'npm run test -- --coverage'
              sh """
                sonar-scanner \
                -Dsonar.projectBaseDir=. \
                -Dsonar.login=$SONAR_TOKEN
              """
            }
          }
        }
      }
    }

    stage('Trivy Scan & Build Docker Images') {
      steps {
        script {
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            def image = "aditya3011/${service}:latest"
            sh "docker build -t ${image} ${service}"
            sh "trivy image --severity HIGH,CRITICAL ${image}"
          }
        }
      }
    }

    stage('Push Docker Images') {
      steps {
        script {
          sh "echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin"
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            def image = "aditya3011/${service}:latest"
            sh "docker push ${image}"
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/'
      }
    }
  }
}
