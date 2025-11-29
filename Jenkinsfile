pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d4l1bs2li9vc73e1qmm0?key=4pfh8qK4Br0'
        RENDER_URL         = 'https://gallery-v88k.onrender.com'
    }

    stages {
        stage('Install Node.js via nvm') {
            steps {
                sh '''
                    # Install nvm if not already there
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                    
                    # Load nvm
                    . "$NVM_DIR/nvm.sh"
                    
                    # Install and use Node 18
                    nvm install 18 || true
                    nvm use 18
                    
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install') {
            steps {
                sh '''
                    . "$HOME/.nvm/nvm.sh"
                    nvm use 18
                    npm ci --legacy-peer-deps
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    . "$HOME/.nvm/nvm.sh"
                    nvm use 18
                    npm test
                '''
            }
            post {
                failure {
                    emailext (
                        to: 'melissa.ndirangu@student.moringaschool.com',
                        subject: 'Gallery Tests FAILED – Build ${BUILD_NUMBER}',
                        body: 'Check Jenkins: ${env.BUILD_URL}'
                    )
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'curl "$RENDER_DEPLOY_HOOK"'
            }
        }
    }

    post {
        success {
            slackSend(
                channel: '#melissa_ip1',
                color: 'good',
                message: "*Gallery deployed successfully!*\nBuild #${env.BUILD_NUMBER}\n${env.RENDER_URL}"
            )
        }
    }
}