Buoc 1: Import db techabse tu thu muc dump
Buoc 2: Su dung Postman, etc... de test API
Buoc 3: Login vao API
- truy cap link localhost:8080/api/v1/auth/login
- su dung method POST
- set param email: john.doe1@gmail.com\password: 12345678 de login vao API
- sau khi login thanh cong, copy token tu response
- them x-access-token vao header va set value la token o tren
Buoc 4: Test API
- truy cap link localhost:8080/api/v1/users/index?status=active
- su dung method GET de lay danh sach user
- truy cap link localhost:8080/api/v1/organizations/index?status=active
- su dung method GET de lay danh sach bo phan cua cong ty