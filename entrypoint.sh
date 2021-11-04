#!/bin/bash

# terminate on errors
set -euo pipefail

# Check if volume is empty
if [ ! "$(ls -A "/usr/src/wordpress" 2>/dev/null)" ]; then
  echo "Moving files to web root"
  cp -r /usr/src/wordpress/wp-content/* /var/www/html/wp-content
  echo "Completed moving files"

  echo "Adding wordpress permissions"
  chown -R www-data:www-data /var/www/html &
  find /var/www/html -type d -exec chmod 2775 {} \; &
  find /var/www/html -type f -exec chmod 0664 {} \; &
  echo "Completed adding permissions"
fi

exec docker-entrypoint.sh "$@"