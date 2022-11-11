- # add local domains to hosts file
- sudo cli/bin/dev setupDomains    
you can remove them with sudo cli/bin/dev removeDomains    

  # KeyCloak
- per far funzionare keycloak occorre aggiungere un database 'keycloak' a postgres, la configurazione di docker compose dovrebbe crearlo in automatico
- admin login:pass is admin:admin
- Per far funzionare l'ambiente di demo, dalla root del repo eseguire
-  ./cli/bin/dev keycloak importConfig
-  a quel punto esisterà un real addictive e uno user user@addictive.dev pass:addictive

# Keystone


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
