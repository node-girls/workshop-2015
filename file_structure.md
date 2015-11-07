# File Structure examples


# Very Simple File Structure


```
public/
    |– css/
    |– js/
    |– img/

test/                    # Should copy the structure of the rest of the project
    |– api/
        |- handlers/     # Contains all the handlers for the project
            |- home.js
            |- login.js
            ...          # Etc…
    |– frontend/         # Carousel styling, mixins and variables
    |– runner.js         # requires in all the files for quick test running

handlers.js
routes.js                # containing all the routes of the application.
package.json
README.md
server.js                # Also called index.js. The starting point for your program
util.js                  # Custom helper functions
```


# Recommended File Structure

```
api/                     # Another common name is server
    |– handlers/         # Contains all the handlers for the project
        |- home.js
        |- login.js
     ...                 # Etc…
    |– lib/              # Custom functions or modules. Also called util
        |- helper1.js
        |- helper2.js
        ...              # Etc…
    |– routes.js         # containing all the routes of the application.

public/
    |– css/
    |– js/
    |– img/

test/                    # Should copy the structure of the rest of the project
    |– api/
        |- handlers/
            |- home.js
            |- login.js
            ...          # Etc…
    |– frontend/         # Carousel styling, mixins and variables
    |– runner.js         # requires in all the files for quick test running

package.json
README.md
server.js                # Also called index.js. The starting point for your program
```
