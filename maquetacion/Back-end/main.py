from flask import Flask, jsonify, request
import bcrypt
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)


def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="tunebytes_db"
    )

@app.route('/')
def index():
    return "Conexión exitosa!"

@app.route("/users", methods=['GET'])
def get_users():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM usuario"
        cursor.execute(query)
        users = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(users), 200

@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM usuario WHERE Correo = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    if user:
        query_param = request.args.get('query')
        if query_param:
            user['query'] = query_param
        return jsonify(user), 200
    else:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
@app.route('/verify_user', methods=['POST'])
def verify_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Se requiere un email y una contraseña'}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Buscar el usuario por correo
        query = "SELECT * FROM usuario WHERE correo = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['Contraseña'].encode('utf-8')):
            return jsonify({'valid': True, 'id': user['idUsuario']}), 200
        else:
            return jsonify({'valid': False}), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    encrypt_pass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        
        # Verificar si el correo ya existe
        query = "SELECT * FROM usuario WHERE correo = %s"
        cursor.execute(query, (data['email'],))
        existing_user = cursor.fetchone()
        
        if existing_user:
            return jsonify({'error': 'Un usuario con este correo ya existe'}), 409
        
        # Insertar el nuevo usuario
        query = "INSERT INTO usuario (nombre, rut, correo, contraseña, url) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (data['username'], data['rut'], data['email'], encrypt_pass, "https://www.w3schools.com/howto/img_avatar.png"))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    data["status"] = "user_created"
    data["password"] = encrypt_pass.decode('utf-8')
    return jsonify(data), 201

@app.route('/users/<email>', methods=['PUT'])
def update_user(email):
    data = request.get_json()
    key = data.get('key')
    value = data.get('value')
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        
        # Verificar si el usuario existe
        query = "SELECT * FROM usuario WHERE Correo = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        
        # Preparar la actualización de campos
        update_fields = []
        update_values = []
        
        if key == "password":
            hashed_password = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            update_fields.append("Contraseña = %s")
            update_values.append(hashed_password)
        else:
            update_fields.append(f"{key} = %s")
            update_values.append(value)
        
        update_fields = ", ".join(update_fields)
        update_values.append(email)
        
        # Construir y ejecutar la consulta de actualización
        query = f"UPDATE usuario SET {update_fields} WHERE Correo = %s"
        cursor.execute(query, tuple(update_values))
        db.commit()
        
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify({'status': 'user_updated'}), 200


@app.route('/users/<email>', methods=['DELETE'])
def delete_user(email):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        query = "DELETE FROM usuario WHERE correo = %s"
        cursor.execute(query, (email,))
        db.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Usuario no encontrado'}), 404
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify({'status': 'user_deleted'}), 200

@app.route('/games', methods=['GET'])
def get_games():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM juego"
        cursor.execute(query)
        games = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(games), 200

@app.route('/games/<name>', methods=['GET'])
def get_game(name):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM juego WHERE nombre = %s"
        cursor.execute(query, (name,))
        game = cursor.fetchone()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    if game:
        query_param = request.args.get('query')
        if query_param:
            game['query'] = query_param
        return jsonify(game), 200
    else:
        return jsonify({'error': 'Juego no encontrado'}), 404

@app.route('/games', methods=['POST'])
def create_game():
    data = request.get_json()
    user_id = data.get('user_id')
    game_name = data.get('name')
    description = data.get('description')
    url = data.get('url')

    if not user_id or not game_name:
        return jsonify({'error': 'Se requiere el ID del usuario y el nombre de juego'}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Verificar si el usuario existe
        query = "SELECT * FROM usuario WHERE idUsuario = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Insertar el nuevo juego
        query = "INSERT INTO juego (Usuario_idUsuario, nombre, descripcion, url) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (user_id, game_name, description, url))
        db.commit()

        # Obtener el ID del juego recién creado
        game_id = cursor.lastrowid
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify({'status': 'game_created', 'game_id': game_id}), 201

@app.route('/songs', methods=['GET'])
def get_songs():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM cancion"
        cursor.execute(query)
        songs = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(songs), 200

@app.route('/songs/<name>', methods=['GET'])
def get_song(name):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM cancion WHERE nombre = %s"
        cursor.execute(query, (name,))
        song = cursor.fetchone()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    if song:
        query_param = request.args.get('query')
        if query_param:
            song['query'] = query_param
        return jsonify(song), 200
    else:
        return jsonify({'error': 'Cancion no encontrada'}), 404

@app.route('/songs', methods=['POST'])
def create_song():
    data = request.get_json()
    user_id = data.get('user_id')
    song_name = data.get('name')
    artist = data.get('artist')
    album = data.get('album')
    genre = data.get('genre')
    release_date = data.get('release_date')

    if not user_id or not song_name:
        return jsonify({'error': 'Se requiere el id de usuario y nombre de canción'}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Verificar si el usuario existe
        query = "SELECT * FROM usuario WHERE idUsuario = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Insertar la nueva canción
        query = "INSERT INTO cancion (Usuario_idUsuario, nombre, artista, album, genero, fecha_lanzamiento) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (user_id, song_name, artist, album, genre, release_date))
        db.commit()

        # Obtener el ID de la canción recién creada
        song_id = cursor.lastrowid
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify({'status': 'song_created', 'song_id': song_id}), 201

@app.route('/playlists', methods=['GET'])
def get_playlists():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM playlist"
        cursor.execute(query)
        playlists = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(playlists), 200

@app.route('/users/<string:email>/playlists', methods=['GET'])
def get_user_playlists(email):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Verificar si el usuario existe
        query = "SELECT * FROM usuario WHERE correo = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Obtener las playlists del usuario
        query = "SELECT * FROM playlist WHERE Usuario_idUsuario1 = %s"
        cursor.execute(query, (user['idUsuario'],))
        playlists = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(playlists), 200


@app.route('/playlists', methods=['POST'])
def create_playlist():
    data = request.get_json()
    user_id = data.get('user_id')
    playlist_name = data.get('name')
    url = data.get('url')

    if not user_id or not playlist_name:
        return jsonify({'error': 'Se requiere el id del usuario y el nombre de la playlist'}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Verificar si el usuario existe
        query = "SELECT * FROM usuario WHERE idUsuario = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        
        query = "SELECT * FROM playlist WHERE Usuario_idUsuario1 = %s AND Nombre = %s"
        cursor.execute(query, (user_id, playlist_name))
        existing_playlist = cursor.fetchone()

        if existing_playlist:
            return jsonify({'error': 'Una playlist del mismo nombre ya existe para este usuario'}), 409

        # Insertar la nueva playlist
        query = "INSERT INTO playlist (Usuario_idUsuario1, Nombre, Url) VALUES (%s, %s, %s)"
        cursor.execute(query, (user_id, playlist_name, url))
        db.commit()

        # Obtener el ID de la playlist recién creada
        playlist_id = cursor.lastrowid
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify({'status': 'playlist_created', 'playlist_id': playlist_id}), 201

@app.route('/playlists/<string:playlist_name>', methods=['PUT'])
def update_playlist(playlist_name):
    data = request.get_json()

    key = data.get('key')
    value = data.get('value')

    if not key or not value:
        return jsonify({'error': 'Se requiere una clave y un valor para actualizar'}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Verificar si la playlist existe
        query = "SELECT * FROM playlist WHERE nombre = %s"
        cursor.execute(query, (playlist_name,))
        playlist = cursor.fetchone()

        if not playlist:
            return jsonify({'error': 'Playlist no encontrada'}), 404

        # Actualizar el campo especificado
        query = f"UPDATE playlist SET {key} = %s WHERE nombre = %s"
        
        cursor.execute(query, (value, playlist_name))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'status': 'playlist_updated'}), 200

@app.route('/playlists/<string:playlist_name>', methods=['DELETE'])
def delete_playlist(playlist_name):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Verificar si la playlist existe
        query = "SELECT * FROM playlist WHERE nombre = %s"
        cursor.execute(query, (playlist_name,))
        playlist = cursor.fetchone()

        if not playlist:
            return jsonify({'error': 'Playlist no encontrada'}), 404

        # Eliminar la playlist
        query = "DELETE FROM playlist WHERE nombre = %s"
        cursor.execute(query, (playlist_name,))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'status': 'playlist_deleted'}), 200

@app.route('/playlists/<string:playlist_name>/songs', methods=['POST'])
def add_song_to_playlist(playlist_name):
    data = request.get_json()
    song_id = data.get('song_id')
    
    if not song_id:
        return jsonify({'error': 'Se requiere la ID de la canción'}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        
        # Verificar si la canción existe
        query = "SELECT * FROM cancion WHERE song_id = %s"
        cursor.execute(query, (song_id,))
        song = cursor.fetchone()
        
        if not song:
            return jsonify({'error': 'Canción no encontrada'}), 404
        
        # Verificar si la playlist existe
        query = "SELECT * FROM playlist WHERE nombre = %s"
        cursor.execute(query, (playlist_name,))
        playlist = cursor.fetchone()
        
        if not playlist:
            return jsonify({'error': 'Playlist no encontrada'}), 404
        
        print(song['idCancion'])
        # Insertar la relación en la tabla PlaylistCancion
        query = "INSERT INTO playlistcancion (Playlist_idPlaylist, Cancion_idCancion, song_id) VALUES (%s, %s, %s)"
        cursor.execute(query, (playlist['idPlaylist'], song['idCancion'] , song_id))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify({'status': 'song_added_to_playlist'}), 201

@app.route('/playlists/<string:playlist_name>/songs/<string:song_id>', methods=['DELETE'])
def delete_song_from_playlist(playlist_name, song_id):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)  # Usar dictionary=True para obtener resultados como diccionarios

        # Verificar si la playlist existe
        query = "SELECT * FROM playlist WHERE Nombre = %s"
        cursor.execute(query, (playlist_name,))
        playlist = cursor.fetchone()

        if not playlist:
            return jsonify({'error': 'Playlist no encontrada'}), 404

        # Verificar si la canción existe
        query = "SELECT * FROM cancion WHERE song_id = %s"
        cursor.execute(query, (song_id,))
        song = cursor.fetchone()

        if not song:
            return jsonify({'error': 'Canción no encontrada'}), 404

        # Verificar si la canción está en la playlist
        query = "SELECT * FROM playlistcancion WHERE Playlist_idPlaylist = %s AND Cancion_idCancion = %s"
        cursor.execute(query, (playlist['idPlaylist'], song['idCancion']))
        playlist_song = cursor.fetchone()

        if not playlist_song:
            return jsonify({'error': 'La canción no está en esta playlist'}), 404

        # Eliminar la canción de la playlist
        query = "DELETE FROM playlistcancion WHERE Playlist_idPlaylist = %s AND Cancion_idCancion = %s"
        cursor.execute(query, (playlist['idPlaylist'], song['idCancion']))
        db.commit()
        
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'status': 'song_deleted_from_playlist'}), 200


@app.route('/users/<string:email>/playlists/<string:playlist_name>/songs', methods=['GET'])
def get_user_playlist_songs(email, playlist_name):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Verificar si el usuario existe
        query = "SELECT * FROM usuario WHERE correo = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Verificar si la playlist existe para ese usuario
        query = "SELECT * FROM playlist WHERE Usuario_idUsuario1 = %s AND nombre = %s"
        cursor.execute(query, (user['idUsuario'], playlist_name))
        playlist = cursor.fetchone()

        if not playlist:
            return jsonify({'error': 'Playlist no encontrada para este usuario'}), 404

        # Obtener las canciones de la playlist
        query = """
        SELECT c.* FROM cancion c
        JOIN playlistcancion pc ON c.idCancion = pc.Cancion_idCancion
        WHERE pc.Playlist_idPlaylist = %s
        """
        cursor.execute(query, (playlist['idPlaylist'],))
        songs = cursor.fetchall()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify(songs), 200

@app.route('/playlists/<int:playlist_id>', methods=['GET'])
def get_playlist(playlist_id):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        query = "SELECT * FROM playlist WHERE idPlaylist = %s"
        cursor.execute(query, (playlist_id,))
        playlist = cursor.fetchone()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    if playlist:
        query_param = request.args.get('query')
        if query_param:
            playlist['query'] = query_param
        return jsonify(playlist), 200
    else:
        return jsonify({'error': 'Playlist not found'}), 404

if __name__ == "__main__":
    app.run(debug=True)
