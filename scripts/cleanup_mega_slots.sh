#!/bin/bash
# Script to delete the obsolete src/game-themes/mega-slots.theme.ts file

FILE_TO_DELETE="src/game-themes/mega-slots.theme.ts"
# Assuming this script is run from the project root directory.
# If your project root is elsewhere, adjust the path above or cd to project root first.

echo "This script will attempt to delete the following obsolete theme file:"
echo "$FILE_TO_DELETE"
echo ""

if [ -f "$FILE_TO_DELETE" ]; then
  read -p "Are you sure you want to permanently delete this file? (y/N): " confirmation
  if [[ "$confirmation" == "y" || "$confirmation" == "Y" ]]; then
    rm "$FILE_TO_DELETE"
    if [ $? -eq 0 ]; then
      echo "Successfully deleted $FILE_TO_DELETE."
    else
      echo "Error: Failed to delete $FILE_TO_DELETE. Check permissions or if the file is in use."
    fi
  else
    echo "Deletion cancelled by user."
  fi
else
  echo "File $FILE_TO_DELETE does not exist. No action needed."
fi

exit 0
