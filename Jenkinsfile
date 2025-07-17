pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token')
    DOCKERHUB = credentials('dockerhub')
  }

  stages {

    stage('Test Services') {
      steps {
        script {
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
                -Dsonar.login=$SONAR_TOKEN
              """
            }
          }
        }
      }
    }

    stage('Trivy Scan') {
      steps {
        script {
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            def image = "mydockerhub/${service}:latest"
            sh "docker build -t ${image} ${service}"
            sh "trivy image --severity HIGH,CRITICAL ${image}"
          }
        }
      }
    }

    stage('Build & Push Docker Images') {
      steps {
        script {
          echo "DOCKERHUB_USR: $DOCKERHUB_USR"
          sh "echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin"
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            def image = "mydockerhub/${service}:latest"
            sh "docker build -t ${image} ${service}"
            sh "docker push ${image}"
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          def services = ['user-service', 'order-service', 'product-service']
          services.each { service ->
            sh "kubectl apply -f k8s/${service}-deployment.yaml"
            sh "kubectl apply -f k8s/${service}-service.yaml"
          }
        }
      }
    }
  }
}
