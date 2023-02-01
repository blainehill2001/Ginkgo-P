import sys
#insert demo stringified Nibble data
print("{\n\t\"status\": \"Consistent\",\n\t\"highlighted_path\": [{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 2\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"happenedIn\",\n\t\t\t\"target\": 3\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 4\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 5\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 6\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"hasCapital\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 8\n\t\t},\n\t\t{\n\t\t\t\"source\": 2,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 3,\n\t\t\t\"type\": \"happenedIn\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 4,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 5\n\t\t},\n\t\t{\n\t\t\t\"source\": 4,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 6\n\t\t},\n\t\t{\n\t\t\t\"source\": 4,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 7,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 8\n\t\t}\n\t],\n\t\"links\": [{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 2\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"happenedIn\",\n\t\t\t\"target\": 3\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 4\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 5\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 6\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"hasCapital\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 1,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 8\n\t\t},\n\t\t{\n\t\t\t\"source\": 2,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 3,\n\t\t\t\"type\": \"happenedIn\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 4,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 5\n\t\t},\n\t\t{\n\t\t\t\"source\": 4,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 6\n\t\t},\n\t\t{\n\t\t\t\"source\": 4,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 7\n\t\t},\n\t\t{\n\t\t\t\"source\": 7,\n\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\"target\": 8\n\t\t}\n\t],\n\t\"result1\": {\n\t\t\"nodes\": [{\n\t\t\t\t\"id\": 6,\n\t\t\t\t\"name\": \"Aiea,_Hawaii\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 3,\n\t\t\t\t\"name\": \"Black_Week_(Hawaii)\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 7,\n\t\t\t\t\"name\": \"Honolulu\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 4,\n\t\t\t\t\"name\": \"Aloha_Stadium\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 1,\n\t\t\t\t\"name\": \"Hawaii\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 8,\n\t\t\t\t\"name\": \"Hawaii_Convention_Center\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 5,\n\t\t\t\t\"name\": \"Halawa,_Hawaii\",\n\t\t\t\t\"label\": \"\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"id\": 2,\n\t\t\t\t\"name\": \"Hawaii_State_Capitol\",\n\t\t\t\t\"label\": \"\"\n\t\t\t}\n\t\t],\n\t\t\"links\": [{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 2\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"happenedIn\",\n\t\t\t\t\"target\": 3\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 4\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 5\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 6\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"hasCapital\",\n\t\t\t\t\"target\": 7\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 1,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 8\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 2,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 7\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 3,\n\t\t\t\t\"type\": \"happenedIn\",\n\t\t\t\t\"target\": 7\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 4,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 5\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 4,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 6\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 4,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 7\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"source\": 7,\n\t\t\t\t\"type\": \"isLocatedIn\",\n\t\t\t\t\"target\": 8\n\t\t\t}\n\t\t]\n\t}\n}")
sys.stdout.flush()