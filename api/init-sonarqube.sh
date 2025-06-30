#!/bin/bash

sleep 15
HASH=$(cat /proc/sys/kernel/random/uuid)
TOKEN=$(curl -s -u $SONARQUBE_LOGIN:$SONARQUBE_PASS -X POST http://sonarqube:9000/api/user_tokens/generate \
  -d name=laravel-token-HASH -d login=admin | grep -o '"token":"[^"]*"' | cut -d':' -f2 | tr -d '"')

sonar-scanner -Dsonar.token=$TOKEN
