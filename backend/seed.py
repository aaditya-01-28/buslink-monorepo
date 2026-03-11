from app.database import SessionLocal, engine
from app import models
from passlib.context import CryptContext

# Setup password hashing (just for the user)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_data():
    db = SessionLocal()

    print("🌱 Seeding Database...")

    # 1. Create a Test Route
    if not db.query(models.Route).filter_by(id=1).first():
        route = models.Route(id=1, name="Route 1: Airport to City")
        db.add(route)
        print("✅ Added Route: Airport to City")

    # 2. Create a Test Bus
    if not db.query(models.Bus).filter_by(id=1).first():
        bus = models.Bus(id=1, bus_number="OD-05-TEST", capacity=30)
        db.add(bus)
        print("✅ Added Bus: OD-05-TEST")

    # 3. Create a Test Driver (User)
    if not db.query(models.User).filter_by(id=1).first():
        driver = models.User(
            id=1, 
            name="Raju Driver", 
            role="driver"
        )
        db.add(driver)
        print("✅ Added Driver: Raju")

    try:
        db.commit()
        print("🎉 Database Seeded Successfully!")
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()