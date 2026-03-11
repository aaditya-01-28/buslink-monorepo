import firebase_admin
from firebase_admin import credentials, db
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

def initialize_firebase():
    if not firebase_admin._apps:
        # Get sensitive data from Environment Variables
        cred_path = os.getenv("FIREBASE_CRED_PATH", "firebase_credentials.json")
        db_url = os.getenv("FIREBASE_DB_URL")

        # Basic error checking
        if not db_url:
            print("❌ Error: FIREBASE_DB_URL is missing in .env")
            return

        # Handle path for Docker vs Local
        if not os.path.exists(cred_path):
            cred_path = f"/app/{cred_path}" # Docker fallback

        if os.path.exists(cred_path):
            try:
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred, {
                    'databaseURL': db_url
                })
                print("✅ Firebase Connected Successfully")
            except Exception as e:
                print(f"❌ Firebase Init Error: {e}")
        else:
            print(f"❌ Error: Credential file not found at {cred_path}")

def create_live_trip_node(trip_id, bus_id, driver_id, route_id):
    """
    Creates a 'Live' node in Firebase Realtime DB.
    """
    try:
        # Check if Firebase is ready before trying to write
        if not firebase_admin._apps:
            initialize_firebase()

        root_ref = db.reference('active_trips')
        trip_ref = root_ref.child(f'trip_{trip_id}')
        
        trip_ref.set({
            'bus_id': bus_id,
            'driver_id': driver_id,
            'route_id': route_id,
            'status': 'LIVE',
            'current_location': {
                'lat': 0.0,
                'lng': 0.0,
                'speed': 0,
                'heading': 0
            },
            'last_updated': 0
        })
        print(f"✅ Firebase Node Created: trip_{trip_id}")
        return True
    except Exception as e:
        print(f"❌ Firebase Write Error: {e}")
        return False