#!/bin/bash

# diff of the last commit
diff_last_commit=$(git diff HEAD~1)
# diff of the current staging
diff_staged=$(git diff --cached)

# review_prompt="Revue professionnelle du diff ci-dessous, en soulignant les points importants, les risques potentiels, et en suggérant des améliorations :"
review_prompt="Liste moi de manière exhaustive les bugs assurés que tu as trouvé (avec une localisation même approximative lorsque cela est possible) :"
# review_prompt="a partir du diff git fournit, propose  moi de manière concise les changements à apporter pour avoir 2 tests"
# to_fix="REPLACE_ME_BY_YOUR_ISSUE"
# review_prompt="a partir du diff git fournit, corrige moi le point suivant en énonçant UNIQUEMENT et de manière concise les changements à apporter :  $to_fix"

# Vérifier si aichat est installé
if ! command -v aichat &> /dev/null; then
    echo "aichat n'est pas installé. Veuillez l'installer pour continuer."
    exit 1
fi

# Envoyer le diff à aichat pour relecture
echo "${review_prompt}"
if [ -z "$diff_staged" ] && [ "$diff_last_commit" ]; then
    echo "Voici le diff type last commit à relire :"
    echo "$diff_last_commit" | aichat --prompt $review_prompt
else
    echo "Voici le diff type staging à relire :"
    echo "$diff_staged" | aichat --prompt $review_prompt
fi