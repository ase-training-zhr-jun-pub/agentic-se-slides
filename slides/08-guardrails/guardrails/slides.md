---
layout: intro
background: apricot
---

### _Detour —_

# Verifying Guardrails & Quality Requirements

---

# Making Architecture Reliable

- ADRs gather dust, reviews only catch what the reviewer remembers
- An agent in a fresh session is like a new trainee: everything forgotten 🙃
- SonarQube/linters check internal quality (craftsmanship), not your concrete architecture decisions
- Goal: architecture rules that run without an LLM — versioned and anchored in CI. Like Checkstyle, but for concrete rules tied to quality goals
- Conceptually like Architectural Fitness Functions (from _Building Evolutionary Architectures_, O'Reilly 2017), but executable
- Unlike rules/prompts: testable, reproducible, blocking — not just a recommendation
- https://evolutionaryarchitecture.com/ffkatas/

---

# What can be tested at all?

- Layering & dependency directions (Domain ↛ Infrastructure)
- Consistent error handling (null vs. exception, handling on the same layers)
- State localization (minimize side effects)
- Migration discipline (no DDL outside Flyway/Liquibase/Alembic, no seed data in code, ...)
- External interfaces: versioning (`/v{n}/...`), explicit DTOs, never expose domain entities at the API
- Annotations as contracts (`@PublicApi` ⇒ requires `@since`, OpenAPI entry, test)
- Naming, package cuts, "no `System.out`", "no `java.util.Date`"

---

# Tooling for Java: ArchUnit

- DSL-style tests, run as JUnit
- Common architecture patterns like Layered or Onion as ready-made templates
- Custom `ArchCondition` for your own rules (e.g. "controller method with `@PostMapping` must return a DTO")
- Example test: "are the mocks still in sync with the API spec?"
- https://www.codecentric.de/en/knowledge-hub/blog/archunit-in-practice-keep-your-architecture-clean

```java
noClasses().that().resideInAPackage("..domain..")
    .should().dependOnClassesThat().resideInAPackage("..infra..")
```

---

# ArchUnit Example

- Controllers themselves only throw ApiException

```java
@ArchTest
static final ArchRule controllers_only_declare_api_exceptions =
    methods()
        .that().areDeclaredInClassesThat().resideInAPackage("..controller..")
        .and().arePublic()
        .should(new ArchCondition<JavaMethod>("only throw ApiException or subtypes") {
            @Override
            public void check(JavaMethod method, ConditionEvents events) {
                method.getThrowsClause().forEach(t -> {
                    JavaClass type = t.getRawType();
                    if (!type.isAssignableTo(ApiException.class)) {
                        events.add(SimpleConditionEvent.violated(method,
                            "%s declares forbidden exception %s"
                                .formatted(method.getFullName(), type.getName())));
                    }
                });
            }
        });
```

---

# Other Stacks

- TypeScript: dependency-cruiser (rules in JSON/YAML, runs in CI), ts-arch (ArchUnit-style API)
- Python: import-linter
- Cross-language: Semgrep (commercial, security-leaning; AST pattern matching, custom rules in YAML) — ideal for "forbidden API calls", annotation constraints
- API contracts: Spectral (OpenAPI linting with custom rulesets), Pact (consumer-driven contracts)
- Config/IaC: Conftest/OPA (Rego policies against YAML/JSON)
- Mind shift: every architecture decision picks its own tool — testing remains the principle
