# Cross-Browser Testing Summary
Date: 5/5/2025, 11:44:01 AM

# Browser Compatibility Test Results

## Running tests on Google Chrome
❌ Error running tests on Google Chrome:
```
Command failed: npx cypress run --browser chrome

DevTools listening on ws://127.0.0.1:59572/devtools/browser/592fa833-53bb-44ea-b48e-fc60b6aaa34a

```

## Running tests on Mozilla Firefox
❌ Error running tests on Mozilla Firefox:
```
Command failed: npx cypress run --browser firefox

DevTools listening on ws://127.0.0.1:59573/devtools/browser/0e9600ca-4b79-4b8b-af44-46ab0b5f98f9

```

## Running tests on Microsoft Edge
❌ Error running tests on Microsoft Edge:
```
Command failed: npx cypress run --browser edge

DevTools listening on ws://127.0.0.1:59574/devtools/browser/c6d44d98-964f-4a4f-9a4a-cd15cd836e66

```

## Running tests on Electron
❌ Error running tests on Electron:
```
Command failed: npx cypress run --browser electron

DevTools listening on ws://127.0.0.1:59576/devtools/browser/7a3edefe-12ce-4967-81fe-06662a194b08

```
⚠️ Skipping tests on Safari: Browser not available on this platform

# Mobile Viewport Testing (Chrome)

## Running tests on Google Chrome (iPhone SE)
❌ Error running tests on Google Chrome (iPhone SE):
```
Command failed: npx cypress run --browser chrome --config viewportWidth=375,viewportHeight=667

DevTools listening on ws://127.0.0.1:59577/devtools/browser/4f4dcc64-1841-4e7f-8c81-aca293231014

```

## Running tests on Google Chrome (iPhone 12/13/14)
❌ Error running tests on Google Chrome (iPhone 12/13/14):
```
Command failed: npx cypress run --browser chrome --config viewportWidth=390,viewportHeight=844

DevTools listening on ws://127.0.0.1:59578/devtools/browser/66048ea5-6cb9-4507-835b-6a2f88094c4d

```

## Running tests on Google Chrome (iPhone 12/13/14 Pro Max)
❌ Error running tests on Google Chrome (iPhone 12/13/14 Pro Max):
```
Command failed: npx cypress run --browser chrome --config viewportWidth=428,viewportHeight=926

DevTools listening on ws://127.0.0.1:59579/devtools/browser/da516067-3fa0-42b0-808c-1803187db1a2

```

## Running tests on Google Chrome (Android (Small))
❌ Error running tests on Google Chrome (Android (Small)):
```
Command failed: npx cypress run --browser chrome --config viewportWidth=360,viewportHeight=800

DevTools listening on ws://127.0.0.1:59583/devtools/browser/68b1d4d9-7c2e-4348-af71-9a32ac95dee8

```

## Running tests on Google Chrome (Android (Medium))
❌ Error running tests on Google Chrome (Android (Medium)):
```
Command failed: npx cypress run --browser chrome --config viewportWidth=412,viewportHeight=915

DevTools listening on ws://127.0.0.1:59584/devtools/browser/f81c449c-fc70-48c5-9aa9-0bee4298e5bb

```

## Running tests on Google Chrome (Android (Large))
❌ Error running tests on Google Chrome (Android (Large)):
```
Command failed: npx cypress run --browser chrome --config viewportWidth=480,viewportHeight=1024

DevTools listening on ws://127.0.0.1:59585/devtools/browser/c1dd9c3a-541d-48ad-98ee-5bc946e0d623

```

# Summary

Tests completed: 0/10 successful
Tests skipped: 1 (browser not available on this platform)

⚠️ Some tests failed. Review the logs above for details.

## Failed Tests:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Electron
- Google Chrome (iPhone SE)
- Google Chrome (iPhone 12/13/14)
- Google Chrome (iPhone 12/13/14 Pro Max)
- Google Chrome (Android (Small))
- Google Chrome (Android (Medium))
- Google Chrome (Android (Large))
