from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from bank import views as bank_views

router = routers.DefaultRouter()
router.register(r'users', bank_views.UserViewSet)
router.register(r'groups', bank_views.GroupViewSet)

router.register(r'bank/branches', bank_views.BranchViewSet)
router.register(r'bank/customers', bank_views.CustomerViewSet)
router.register(r'bank/products', bank_views.ProductViewSet)
router.register(r'bank/accounts', bank_views.AccountViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]