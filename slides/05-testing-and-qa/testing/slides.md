---
layout: intro
background: petrol
---

### *Let's talk about*
# Testing


---
layout: default
---

# Automated Testing

- Manual testing is error prone & time consuming
- You can never be safe to push a new feature
- We want to be safe not to break something
- If the team changes, the system becomes unmaintainable without tests

**We want automated tests to enable continuous deployment.**


---
layout: two-cols
leftBackground: white
rightBackground: white
---

::left::

# Test Pyramid


By Mike Cohn in *Succeeding with Agile*
Tests with different granularity.
The higher the level, the fewer the tests.

But: oversimplified with just 3 layers.

::right::

<div class="flex h-[28rem] items-center justify-center">
  <img src="./assets/test-pyramid.svg" class="max-h-[96%] max-w-full w-auto object-contain" />
</div>


---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Unit Tests


---
layout: default
---

# Unit Tests

- Testing individual components or functions in isolation
- External dependencies are "mocked"
- Tests are repeatable
- Tests started with test framework (e.g. JUnit, Jest, NUnit, ...)
- Lightweight tests
- Ideal to test domain specific logic in isolation


---
layout: default
---

# Unit Tests: <small>Example</small>

- **Arrange:** Setup test environment & test data
- **Act:** Call the unit of code
- **Assert:** Compare expected with actual results


---
layout: default
---

# Unit Tests: <small>Agentic Use Cases</small>

- Use test-driven development and generate unit tests before writing code
- Generate tests for existing code
- Identify edge cases that are not tested already


---
layout: exercise
chapter: 5
exercise: 1
task: Write unit tests
command: git merge uebung-4-1
---


---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Integration Tests


---
layout: default
---

# Integration Tests

- Testing integration with other parts like
  - Databases
  - Filesystems
  - Network calls
- Run application + other needed parts
- Verify integration is working


---
layout: default
---

# Integration Tests <small>Example</small>

<ol class="list-decimal pl-5 text-left marker:text-apricot">
  <li>Start a database</li>
  <li>Connect to the database</li>
  <li>Trigger a function that writes to the database</li>
  <li>Verify the data has been written to the database</li>
</ol>


---
layout: content-with-image
image: /logos/testcontainers.svg
imageFit: contain
---

# Testcontainers

- Starting a database in tests can be challenging
- Use Testcontainers to run databases
- Use Agents to create test data for integration tests


---
layout: exercise
chapter: 5
exercise: 2
task: Write integration tests
command: git merge uebung-4-2
---


---
layout: intro
background: apricot
---

### *Use Agents to generate*
# End-to-End Tests


---
layout: default
---

# End-to-End Tests

- Testing deployed applications via its user interface
- Performed through a headless browser
- Automatically "click" through the application frontend
- Services behind the scenes are real
- Usually take long to execute
- Sometimes fail unexpectedly: false positives
- But ensure critical paths in the system are working


---
layout: exercise
chapter: 5
exercise: 3
task: Write end-to-end tests
command: git merge uebung-4-3
---

