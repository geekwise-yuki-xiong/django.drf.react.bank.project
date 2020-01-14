from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from bank import views as bank_views
from accounts import views as account_views

router = routers.DefaultRouter()

router.register(r'users', account_views.UserViewSet)
router.register(r'groups', account_views.GroupViewSet)
router.register(r'bank/branches', bank_views.BranchViewSet)
router.register(r'bank/customers', bank_views.CustomerViewSet)
router.register(r'bank/products', bank_views.ProductViewSet)
router.register(r'bank/accounts', bank_views.AccountViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('users/', include('accounts.urls'))

    # path('api', include(endpoints)),
    # path('api/auth', include('knox.urls')),
]