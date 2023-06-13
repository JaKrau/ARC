#!/bin/bash

echo "Welcome to the Bootcamp Git Setup Debug Script!"
echo "This script will check your computer for a number of common problems."
read -p "Press enter to continue!"
echo ""
echo ""
echo "Checking to see if you have ssh keys..."
echo ""

keys=($(ls ~/.ssh -tr | grep .pub))
key_count=$(ls ~/.ssh -tr | grep .pub | wc -l)

if [ $key_count -eq 0 ]; then
    echo "You have no ssh keys! Please run the following command to generate one:"
    echo "ssh-keygen -t ed25519"
    exit 1
fi
valid_key=${keys[0]}
if [ $key_count -gt 1 ]; then
    echo "You have more than one ssh key. This can cause problems. It is recommended that you remove your extra ssh keys."
    echo "You can use the following command to do so:"
    unset 'keys[0]'
    for key in "${keys[@]}"
    do
        private_key=$(echo $key | sed 's/.pub//')
        keys+=($private_key)
    done
    # add directory to keys
    keys_with_directory=()
    for key in "${keys[@]}"
    do
        temp_key=$(echo "~/.ssh/$key")
        keys_with_directory+=($temp_key)
    done
    keys_joined=$(IFS=" "  ; echo "${keys_with_directory[*]}")
    echo "rm $keys_joined"
    echo ""
    echo "Your primary key is ~/.ssh/$valid_key. Make sure you use this key moving forward!"
fi
if [ $key_count -eq 1 ]; then
    echo "You have one ssh key! Your key will be ~/.ssh/$valid_key"
fi
key_data=$(cat ~/.ssh/$valid_key)
read -p "Press enter to continue!"
echo ""
echo ""
echo "Checking if you can connect to GitHub, you may be asked to enter your key password..."
result=$(ssh -T git@github.com 2>&1)
if [[ "$result" == *"You've successfully authenticated"* ]]; then
    echo "You are setup correctly with GitHub!"
else
    echo "You are not setup correctly with GitHub. The error was:"
    echo ""
    echo $result
    echo ""

    if [[ "$result" == *"Permission denied"* ]]; then
        echo "It is likely you do not have your ssh key setup in GitLab. To set it up, follow these steps:"
        echo "1. Navigate to https://github.com/ in your web browser"
        echo "2. Click your profile image in the top right corner of the browser window"
        echo "3. Select 'Settings'"
        echo "4. Select 'SSH and GPG keys' on the left side-bar"
        echo "5. Click 'New SSH key'"
        echo "6. Copy the following value:"
        echo ""
        echo $key_data
        echo ""
        echo "7. Paste the data into the 'Key' field"
        echo "8. Click 'Add SSH key'"
    fi
    exit 1
fi
read -p "Press enter to continue!"
echo ""
echo ""
echo "Checking if you can connect to the EdX GitLab instance, you may be asked to enter your key password..."
result=$(ssh -T git@git.bootcampcontent.com 2>&1)
if [[ "$result" == *"Welcome to GitLab"* ]]; then
    echo "You are setup correctly with GitLab!"
else
    echo "You are not setup correctly with GitLab. The error was:"
    echo ""
    echo $result
    echo ""

    if [[ "$result" == *"Permission denied"* ]]; then
        echo "It is likely you do not have your ssh key setup in GitLab. To set it up, follow these steps:"
        echo "1. Navigate to https://git.bootcampcontent.com/ in your web browser"
        echo "2. Click your profile image in the top right corner of the browser window"
        echo "3. Select 'Preferences'"
        echo "4. Select 'SSH Keys' on the left side-bar"
        echo "5. Copy the following value:"
        echo ""
        echo $key_data
        echo ""
        echo "6. Paste the data into the 'Key' field"
        echo "7. Click 'Add key'"
    fi
    exit 1
fi