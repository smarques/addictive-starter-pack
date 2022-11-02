- # add local domains to hosts file
- sudo cli/bin/dev setupDomains    
you can remove them with sudo cli/bin/dev removeDomains    

- # CASDOOR
- per far funzionare casdoor occorre aggiungere un database 'casdoor' a postgress
- admin login:pass is admin:123
  # KeyCloak
- per far funzionare keycloak occorre aggiungere un database 'keycloak' a postgres
- admin login:pass is admin:admin


** Alternatives **
*Authentication*
(all support openIDConnect)
- https://zitadel.com/
- https://www.ory.sh/
- https://gluu.org/

*Authorization*
keycloak
Supporting https://zanzibar.academy/:
- https://openfga.dev/
- https://www.ory.sh/
