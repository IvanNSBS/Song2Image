from dotenv import load_dotenv
load_dotenv()

from http_server.server import MusicalBackendServer


def main():
    """
    Application entry point
    """
    server = MusicalBackendServer()
    server.start(9000)


if __name__ == "__main__":
    main()
