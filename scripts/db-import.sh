#!/bin/sh

set -e

# shellcheck source=/dev/null
test -f .env && . .env

psql "$DATABASE_URL" -f database/schema.sql -f database/data.sql
