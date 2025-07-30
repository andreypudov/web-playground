from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

# openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
# https://localhost:4433

httpd = HTTPServer(('localhost', 4433), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket(
    httpd.socket,
    keyfile = "key.pem", 
    certfile = 'cert.pem',
    server_side = True)

httpd.serve_forever()
