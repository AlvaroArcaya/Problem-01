# Problem-01
smartbox-test

#Dependencias
```bash
npm install
```

#Ejecución
```bash
node app.js
```
# Detalles
- Para poblar la base de datos, se debe ingresar a /misc/populate
- El resto de las rutas son las mencionadas en las instrucciones:
	- /api/teams	* No habia mención sobre mostrar o no los players al momento de mostrar los teams, asi que lo deje en bruto.
	- /api/teams/:idTeam/players * idTeam representa el _externalId
	- /api/teams/players/:position * Case sensitive

# Instrucciones
```javascript
{
  "GET": {
    "description": "Saludo de bienvenida y enlaces importantes"
  },
  "OPTIONS": {
    "description": "Problemas a solucionar",
    "models": {
      "Team": {
        "_id": "{type: ObjectId}",
        "_externalId": "{type: String}",
        "name": "{type: String}",
        "active": "{type: Boolean}",
        "players": "{type: [ObjectId], ref: Player}"
      },
      "Player": {
        "_id": "{type: ObjectId}",
        "_externalId": "{type: String}",
        "name": "{type: String}",
        "position": "{type: String}",
        "team": "{type: ObjectId, ref: Player}"
      }
    },
    "first": "Genera la semilla de información a partir del xml de la siguiente ruta “https://s3.amazonaws.com/nunchee-fxassets-local/dump.xml”. Para esto debes descargar el xml procesarlo he insertar la información en la base de datos mongodb (Nosotros utilizamos mongoosejs y con el atributo \"_externalId\" mantenemos la relación con los elementos que nos proveen)",
    "second": "Crear Api-REST que consulte las tablas con las caracteristicas de los modelos anteriores, obteniendo todos los equipos en la ruta “/api/teams” y todos los jugadores de un equipo, en la ruta “/api/teams/:idTeam/players” (formato json)",
    "third": "A traves de promesas (Nativas de JavaScript) generar la siguiente secuencia en la ruta “/api/teams/players/:position” (“equipos activos” -> “jugadores de los equipos obtenidos” -> “jugadores en la posicion pasada por la ruta con la información del equipo al que pertenece en el atributo team” en formato json)."
  },
  "POST": {
    "description": "Entregar resultado final prueba",
    "parameters": {
      "link": {
        "type": "string",
        "description": "Enlace del repo (github/bitbucket) donde podamos ver el resultado de la prueba",
        "required": true
      }
    },
    "Content-Type": "aplication/json",
    "example": {
      "link": "https://github.com/jofierro/wrapper-path"
    }
  }
}
```