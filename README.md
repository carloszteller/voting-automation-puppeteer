# voting-automation-puppeteer
This script was created for fun to gain a slight advantage in a casual t-shirt design contest.

It reads a CSV file containing a list of voters, then creates an array of voter objects with their first name, last name, and email address.

The script iterates through the array of voters, and for each voter, it performs the following steps:

1. Opens a browser window.
2. Selects the intended t-shirt design - `data-id` attribute in button.
3. Fills out the voting form with the voter's information.
4. Submits the form.
5. Closes the browser window.

This process is repeated for each voter in the array, with a 5-second interval between each iteration. Once all votes have been cast, the script exits.