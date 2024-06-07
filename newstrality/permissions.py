from rest_framework.permissions import BasePermission, SAFE_METHODS

class CorrectPassword(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.password == request.data.get('password')
