On terminal type and enter "redis-cli"
        Goal            |             Command
------------------------|-----------------------------------
List all rate limits    |  KEYS "rate_limit:*"
See hit count           |  GET <key_name>
Check if it will expire |  TTL <key_name>
Manually unblock IP,    |  DEL <key_name>
Clear all rate limits   |  "`redis-cli --scan --pattern ""rate_limit:*"""

