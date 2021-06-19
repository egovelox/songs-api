#!/bin/bash

# Exit immediately if any command exits with a non-zero status.
# set -e

cd "$(dirname "$0")/.." || exit 2


die() { echo "$2" >&2; exit "$1"; }
run() { ( "$@"; ); ret="$?"; echo This is $ret; (( "$ret" == 0 )) || die 3 "Error while calling '$*' ($ret)"; }
ssm() { run aws ssm get-parameter --name "$1" --output text --query "Parameter.Value"; }

echo "Working directory: $(pwd)";


SONGS_API_REGION=$(ssm "songs_api_region");
export SONGS_API_REGION

envsubst < ci/test.txt > ci/destination.txt;
echo "envsubst $?"
echo "Envsubst finished";
cat ci/destination.txt;
echo $?