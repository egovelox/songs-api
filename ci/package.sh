#!/bin/bash

# Exit immediately if any command exits with a non-zero status.
# set -e

cd "$(dirname "$0")/.." || exit 2
echo "Working directory: $(pwd)"

die() { echo "$2" >&2; exit "$1"; }
run() { ( set -x; "$@"; ); ret="$?"; (( "$ret" == 0 )) || die 3 "Error while calling '$*' ($ret)"; }
ssm() { run aws ssm get-parameter --name "$1" --output text --query "Parameter.Value"; }

SONGS_API_REGION=$(ssm "songs_api_region")
export SONGS_API_REGION

envsubst < ci/test.txt > ci/destination.txt
echo "Envsubst finished"

cat ci/destination.txt
