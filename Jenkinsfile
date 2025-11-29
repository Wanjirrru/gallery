pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d4l1bs2li9vc73e1qmm0?key=4pfh8qK4Br0'
        RENDER_URL         = 'https://gallery-v88k.onrender.com'
    }

    stages {
        stage('Verify Node & NPM') {
            steps {
                sh 'node --version'   
                sh 'npm --version'    
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    emailext (
                        to: 'melissa.ndirangu@student.moringaschool.com',
                        subject: "Gallery Tests FAILED – Build #${env.BUILD_NUMBER}",
                        body: "Check console output at ${env.BUILD_URL}"
                    )
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'curl "$RENDER_DEPLOY_HOOK"'
            }
        }
    }

    post {
        success {
            slackSend (
                channel: '#melissa_ip1',
                color: 'good',
                message: "*Gallery deployed successfully!* \nBuild: #${env.BUILD_NUMBER}\nLink: ${RENDER_URL}"
            )
        }
        failure {
            slackSend (
                channel: '#melissa_ip1',
                color: 'danger',
                message: "*Gallery deployment FAILED* \nBuild: #${env.BUILD_NUMBER}\nCheck: ${env.BUILD_URL}"
            )
        }
    }
}