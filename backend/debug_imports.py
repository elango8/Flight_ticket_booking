import sys
import traceback

print("=== Testing imports ===")

try:
    import bcrypt
    print("bcrypt: OK")
except Exception as e:
    print(f"bcrypt: FAIL - {e}")

try:
    import jwt
    print("jwt: OK")
except Exception as e:
    print(f"jwt: FAIL - {e}")

try:
    from pydantic import EmailStr
    print("EmailStr: OK")
except Exception as e:
    print(f"EmailStr: FAIL - {e}")

try:
    from schemas.users import SignupRequest
    print("schemas.users: OK")
except Exception as e:
    print(f"schemas.users: FAIL - {e}")
    traceback.print_exc()

try:
    from core.security import hash_password, verify_password, create_access_token, get_current_user
    print("core.security: OK")
except Exception as e:
    print(f"core.security: FAIL - {e}")
    traceback.print_exc()

try:
    from routers.auth import router as auth_router
    print(f"routers.auth: OK - routes: {[r.path for r in auth_router.routes]}")
except Exception as e:
    print(f"routers.auth: FAIL - {e}")
    traceback.print_exc()

try:
    from main import app
    routes = [r.path for r in app.routes if hasattr(r, 'path')]
    print(f"main.app routes: {routes}")
    auth_routes = [r for r in routes if '/auth' in r]
    print(f"Auth routes in app: {auth_routes}")
except Exception as e:
    print(f"main.app: FAIL - {e}")
    traceback.print_exc()
