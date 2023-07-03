#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE mapkids_data;
    CREATE USER mapkids_admin WITH PASSWORD 'password';
    GRANT ALL PRIVILEGES ON DATABASE mapkids_data TO mapkids_admin;
    GRANT ALL PRIVILEGES ON DATABASE mapkids_data TO postgres;
EOSQL