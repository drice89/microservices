# Principles of microservices
- One microservices should do one task
- develop and deploy a microservice independently of the other parts of the application
- Microsercices should communicate using standard HTTP methods

# Benefits of microservices
- new devs dont need to understand who app
- services can be deved and deployed by independent teams
-services can be deved with the lang that does the task best
- If a service fails, the whole app does not fail

# drawbacks 
- redundancies in code
- harder to roll out new versions
- harder to test
- complexity is moved to network layer

# communication
- When we have distirbuted services we dont always know where the endpoint of the requested service is so we need to build a
  service registry
- when designing a services you should always start with the actions that you are expected to perform.
- those actions are accessed by rest routes
- need route to register - name, version, port, ip -> create a Services registry class and save the relevant information about the services (see service-registry/lib/ServiceRegistry.js)
- 
