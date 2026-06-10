---
layout: intro
background: apricot
---

### _Detour —_

# Guardrails & Qualitätsanforderungen prüfen

---

# Architektur verlässlich machen

- ADRs können verstauben, Reviews fangen nur was der Reviewer erinnert
- Agent mit neuer Session manchmal wie neuer Trainee: alles vergessen 🙃
- SonarQube/Linter prüfen innere Qualität (also handwerkliche Aspekte), nicht deine konkreten Architekturentscheide
- Ziel: ohne LLM ausführbare, versionierte, im CI verankerte Architekturvorgaben. Ähnlich Checkstyle, aber für konkrete Vorgaben mit Verbindung zu Qualitätszielen
- Konzeptionell wie: Architectural Fitness Functions (aus _Building Evolutionary Architectures_, O'Reilly 2017), aber ausführbar
- Unterschied zu Rules/Prompts: testbar, reproduzierbar, blockierend — nicht nur Empfehlung
- https://evolutionaryarchitecture.com/ffkatas/

---

# Was lässt sich überhaupt testen?

- Layering & Abhängigkeitsrichtungen (Domain ↛ Infrastructure)
- homogenes Fehlerhandling (null vs. Exception, Handling auf gleichen Ebenen)
- State-Lokalisierung (Side-Effects minimieren, )
- Migrationsdisziplin (kein DDL ausser über Flyway/Liquibase/Alembic, keine Initialdaten im Code, ..)
- Externe Schnittstellen: Versionierung (`/v{n}/...`), explizite DTOs, nie Domain-Entities an der API
- Annotations als Contracts (`@PublicApi` ⇒ muss `@since` haben, OpenAPI-Eintrag, Test)
- Naming, Package-Cuts, "kein `System.out`", "kein `java.util.Date`"

---

# Werkzeug Java: ArchUnit

- DSL-artige Tests, laufen als JUnit
- Bestimmte Architekturmuster wie Layered oder Onion als fertige Templates
- Custom `ArchCondition` für eigene Regeln (z. B. "Controller-Methode mit `@PostMapping` muss DTO zurückgeben")
- Beispiel-Test: "Mocks noch aktuell zur API Spec?"
- https://www.codecentric.de/en/knowledge-hub/blog/archunit-in-practice-keep-your-architecture-clean

```java
noClasses().that().resideInAPackage("..domain..")
    .should().dependOnClassesThat().resideInAPackage("..infra..")
```

---

# ArchUnit Beispiel

- Controller werfen selbst nur ApiException

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

# Andere Stacks

- TypeScript: dependency-cruiser (Regeln in JSON/YAML, im CI), ts-arch (ArchUnit-Stil-API)
- python: import-linter
- Sprachübergreifend: Semgrep (Kommerziell, eher Security-orientiert. Pattern-Matching mit AST, eigene Regeln in YAML) — ideal für "verbotene API-Aufrufe", Annotation-Constraints
- API-Verträge: Spectral (OpenAPI-Lint mit eigenen Rulesets), Pact (Consumer-driven Contracts)
- Config/IaC: Conftest/OPA (Rego-Policies gegen YAML/JSON)
- Mind-Shift: jede Architekturentscheidung sucht sich das passende Werkzeug — Test bleibt das Prinzip
