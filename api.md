#DevTinder API

##Auth Router
-POST/ signup
-POST/ Login
-POST/ LogOut

**Profile Router
-GET/Profile/View
-GET/Profile/Edit
-PATCH/Profile/password

**request Router
-Post/request/send/interested/:userId
-Post/request/send/ignored/:userId
-POST/request/review/accepted/:userId
-POST/request/review/ignored/:userId

**userRouter
-GET/user/connections
-GET/user/requests/received
-Get/user/feed - Gets you the profile of other users on platform
