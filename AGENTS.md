Version of this instruction: v1.2(wip)

# Virtual Team Strategy
Use a fleet of agents running in parallel which interact to implement a project
as defined in project.md.  Use distinct agents running in parallel for:
- Definer: Requiremement definition and refinement
    - Use model: Claude opus 4.5
    - INPUT: project.md
    - OUTPUT: requirements.md
- Refiner: Architecture and design definition based on definer's requirements
    - Use model: GPT-4.1
    - INPUT: requirements.md
    - OUTPUT: design.md, architecture.md
- Planner: Break down implementation into a number if milestones with distinct items, based in priority of the Refiner's design.
    - Use model: GPT-4.1 or Claude Opus 4.5
    - INPUT: design.md, architecture.md
    - OUTPUT: milestonse.md
- Verifier: Define tests to verify the requirements are met
    - Use model: Claud Opus 4.5
    - INPUT: requirements.md
    - OUTPUT: testcases.md
- Implementer: Implement the software based on milestones from the Planner.
    - Use model: GPT-4.1
    - Before implementation can begin, the generated plan must be approved by me.
    - Use the tester to test the implementation iteratively until no defects are
     found and requirements are satisfied before finishing each milestone.
    - use a "smoke test" for each milestone, which must be passed before the milestone can be considered complete.
    - Each milestone must be complete and approved by me before the next milestone can be implemented.
    - INPUT: milestones.md
    - OUTPUT: project code, CHANGELOG.md
- Tester:
    - Use model: GPT-4.1
    - Run tests identified by the verifier to check the implementer's output
    - Log issues in a bug list with a unique number, and feed the list back to the implementer.
    - Record test execution history, including issues identified, in a markdown file.
    - Accept issues identified by me to be added to the issue tracker
    - INPUT: testcases.md
    - OUTPUT: testruns.md, bugs.md

# General features
  - agents interact by recording output in .md file, other agents use this as input to their activities.
  - use a git repository for version control of all files
  - use branches to track work
  - tags should be created at each version bump
  - Changes are stored in a file called CHANGELOG.md
  - use docker contanerisation to encapsulate a development environment
  - use docker to containerise the project's implementation, if appropriate
  - use markdown to track each agent's progress, including
     - requirements list, from Definer
     - architecture and design, from Refiner
     - milestones and development items, from Planner
     - test cases, from Verifier
     - test execution history, from Tester
  - application versioning
      - use semantic versiong (semver)
      - version should be generated via "git describe" and automatically update
        for each build
      - use tags to track version with prefix text identifying the project
      - Store application version in a single place in the source
      - include application version on the UI, using --version for command line apps

# For web-based projects:
- Use modern clean user interfaces, favoring single page designs with modal
  transient screen where this is warranted.
- Frontends in a modern framework
- Backends in python
- For single-user simple apps, prefer browser-local design.
- Preferr single-page-app design with judicios use of modal scrreens for
  transient interactions, such as forms, settings, etc.
    
# For standalone general purpose apps:
- Prefer python unless high performance is required, in which case consider C,
  Rust, C or C++ as priorities
- Use docker to containerise the application, if appropriate.
- Python apps:
    - Prefer QT for framework and GUIs
    - use virtual environments to manage dependencies
    - use pip for dependency management, and store dependencies in requirements.txt
    - use pytest for testing, and store tests in a tests/ directory
    - use a run.sh or run.bat script to run the application, which should set
      up the environment and run the app

# For embedded projects (incomplete)
- Use C or Rust as the primary language, depending requirements.

# How To Use This Instruction with GH copilot
- Create your project definition in project.md
- Use GitHub copilot CLI to orchestrate the fleet;
   ``/fleet Implement the project described in project.md
- Interact with the copilot CLI to proceed with implementation, eg:
   ``/fleet Continue implementing according to project.md``
