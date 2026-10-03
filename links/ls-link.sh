#!/usr/bin/env bash

main() {
  shopt -s globstar nullglob

  local link
  for link in *; do
    [[ -d "$link" ]] || continue
    [[ -f "$link/raw.txt" ]] || continue
    printf '\e[1;34m%s\e[0m       \t-> \e[1;32m%s\e[0m\n' "$link" "$(cat "$link/raw.txt")"
  done
}

main "$@"
