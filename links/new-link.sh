#!/usr/bin/env bash

usage() {
  echo 'usage: new-link.sh [NAME] [HREF]'
  exit 1
}

main() {
  [[ -z "$*" ]] && usage >&2

  local name="$1"
  local href="$2"

  mkdir "$name" || exit 1

  cd "$name" || exit 1
  echo "$href" > raw.txt
  printf \
'<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0; url=%s" />
  </head>
  <body>
    redirecting to <a href="%s">%s</a>...
  </body>
</html>
' \
  "$href" "$href" "$href" > index.html
}

main "$@"
