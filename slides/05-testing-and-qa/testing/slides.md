---
layout: intro
background: petrol
---

### *Let's talk about*
# Testing

<!-- Master reference: Chapter 5 / Slide 230 -->

---
layout: default
---

# Automated Testing

- Manual testing is error prone & time consuming
- You can never be safe to push a new feature
- We want to be safe not to break something
- If the team changes, the system becomes unmaintainable without tests

**We want automated tests to enable continuous deployment.**

<!-- Master reference: Chapter 5 / Slide 231 -->

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

<!-- Master reference: Chapter 5 / Slide 232 -->

---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Unit Tests

<!-- Master reference: Chapter 5 / Slide 233 -->

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

<!-- Master reference: Chapter 5 / Slide 234 -->

---
layout: default
---

# Unit Test

- **Arrange:** Setup test environment & test data
- **Act:** Call the unit of code
- **Assert:** Compare expected with actual results

<!-- Master reference: Chapter 5 / Slide 235 -->

---
layout: default
---

# Agentic Use Cases for Unit Tests

- Use test-driven development and generate unit tests before writing code
- Generate tests for existing code
- Identify edge cases that are not tested already

<!-- Master reference: Chapter 5 / Slide 236 -->

---
layout: exercise
chapter: 5
exercise: 1
task: Write unit tests
command: git merge uebung-4-1
---

<!-- Master reference: Chapter 5 / Slide 237 -->

---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Integration Tests

<!-- Master reference: Chapter 5 / Slide 238 -->

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

<!-- Master reference: Chapter 5 / Slide 239 -->

---
layout: default
---

# Integration Test Example

<ol class="list-decimal pl-5 text-left marker:text-apricot">
  <li>Start a database</li>
  <li>Connect to the database</li>
  <li>Trigger a function that writes to the database</li>
  <li>Verify the data has been written to the database</li>
</ol>

<!-- Master reference: Chapter 5 / Slide 240 -->

---
layout: content-with-image
image: /logos/testcontainers.svg
imageFit: contain
---

# Testcontainers

- Starting a database in tests can be challenging
- Use Testcontainers to run databases
- Use Agents to create test data for integration tests

<!-- Master reference: Chapter 5 / Slide 241 -->

---
layout: exercise
chapter: 5
exercise: 2
task: Write integration tests
command: git merge uebung-4-2
---

<!-- Master reference: Chapter 5 / Slide 242 -->

---
layout: intro
background: apricot
---

### *Use Agents to generate*
# End-to-End Tests

<!-- Master reference: Chapter 5 / Slide 243 -->

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

<!-- Master reference: Chapter 5 / Slide 244 -->

---
layout: exercise
chapter: 5
exercise: 3
task: Write end-to-end tests
command: git merge uebung-4-3
---

<!-- Master reference: Chapter 5 / Slide 245 -->
