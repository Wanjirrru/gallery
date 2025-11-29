pipeline {
    agent any
    tools { nodejs 'Node18' }
    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d4l1bs2li9vc73e1qmm0?key=4pfh8qK4Br0'
        RENDER_URL         = 'https://gallery-v88k.onrender.com'
    }
    stages {
        stage('Install') { steps { sh 'npm install' } }
        stage('Test') {
            steps { sh 'npm test' }
            post {
                failure {
                    emailext to: 'melissa.ndirangu@student.moringaschool.com',
                             subject: 'Gallery Tests FAILED – Build ${BUILD_NUMBER}',
                             body: 'Check Jenkins'
                }
            }
        }
        stage('Deploy') { steps { sh 'curl "$RENDER_DEPLOY_HOOK"' } }
    }
    post {
        success {
            slackSend channel: '#melissa_ip1',
                      color: 'good',
                      message: "*Gallery deployed!*\nBuild #${BUILD_NUMBER}\n${RENDER_URL}"
        }
    }
}
