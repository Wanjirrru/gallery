pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d4l1bs2li9vc73e1qmm0?key=4pfh8qK4Br0'
        RENDER_URL         = 'https://gallery-v88k.onrender.com'
    }
    stages {
    stage('Setup Node.js') {
            steps {
                sh 'node --version || echo "Node not found, installing..."'
                sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -'
                sh 'sudo apt-get install -y nodejs || echo "Node already available"'
                sh 'node --version && npm --version'
            }
        }    
    stage('Install') { 
            steps { sh 'npm install' 
            } 
        }
    stage('Test') {
            steps { sh 'npm test' 
            }
            post {
                failure {
                    emailext to: 'melissa.ndirangu@student.moringaschool.com',
                             subject: 'Gallery Tests FAILED – Build ${BUILD_NUMBER}',
                             body: 'Check Jenlkins: ${env.BUILD_URL}'
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