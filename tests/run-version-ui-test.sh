#!/bin/bash
# run-version-ui-test.sh: Start server, run Playwright version UI test, then clean up
PORT=8769
python3 -m http.server $PORT --directory . &
SERVER_PID=$!
# Wait for server to start
sleep 2
npx playwright test playwright-version-ui.test.js
RESULT=$?
kill $SERVER_PID
exit $RESULT
