from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Expense
from .serializers import ExpenseSerializer

# 1. Expense-ah paarkurathukum (GET), pudhusa add panrathukum (POST)
class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated] # Secure Route

    def get_queryset(self):
        # Log-in panni irukra user-oda expenses matum dhaan veliya thariyanum
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Expense-ah create pannum bodhu, automatic-ah indha user account-ah link pannidum
        serializer.save(user=self.request.user)


# 2. Oru specific expense-ah mattedum paarkurathuku, update (PUT) or delete (DELETE) panrathuku
class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)