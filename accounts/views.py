from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Production-grade secure user registration endpoint.
    Includes built-in core database hashing and standard validator check sequences.
    """
    username = request.data.get('username')
    email = request.data.get('email', '')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {"error": "Username and password fields are strictly required."}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # 🔒 PRODUCTION SECURITY LOCK: Re-enabling explicit user password validation check
        # This protects real users from using weak or compromised passwords online.
        validate_password(password)
        
        # Secures profile record inside centralized production node tables flawlessly
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.save()
        return Response(
            {"message": "User profile registered securely!", "username": user.username}, 
            status=status.HTTP_201_CREATED
        )
        
    except ValidationError as ve:
        # Catches strict password failure array texts and throws plain user feedback strings
        return Response(
            {"error": f"Password Policy Violation: {', '.join(ve.messages)}"},
            status=status.HTTP_400_BAD_REQUEST
        )
    except IntegrityError:
        return Response(
            {"username": "This username is already registered inside our system database logs."}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Production-safe secure token login dispatcher engine routing.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = User.objects.get(username=username)
        
        # Validates secure encryption signature hashes safely
        if user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid credentials! Password entry mismatch."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid credentials! Username not found inside core logs."}, 
            status=status.HTTP_400_BAD_REQUEST
        )