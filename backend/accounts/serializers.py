from rest_framework import serializers
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth import authenticate


# Password Serializer
class PasswordSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
        # instance.username = validated_data.get('username', instance.username)
        # instance.password = validated_data.get('hashedNewPassword', instance.password)
        # instance.save()
        # return instance

    def validate(self, data):
        """ check that username and new password are different """
        if data["username"] == data["password"]:
            raise serializers.ValidationError("Username and new password should be different")
        return data

# Permission Serializer
class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('name',)

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    # user_permissions = PermissionSerializer(many=True)
    groups = PermissionSerializer(many=True)

    class Meta:
        model = User
        # fields = '__all__'
        fields = ('id', 'username', 'email', 'groups')

        def create(self, validated_data):
            # permissions_data = validated_data.pop('user_permissions')
            permissions_data = validated_data.pop('groups')
            user = User.objects.create(**validated_data)
            for permission_data in permissions_data:
                Permission.objects.create(user=user, **permission_data)
            return user

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'groups')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        user.groups.set(validated_data['groups'])
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")